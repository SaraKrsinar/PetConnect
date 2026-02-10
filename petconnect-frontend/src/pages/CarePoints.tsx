import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, Button, StatusBadge, CarePointTypeBadge, Modal } from '../components/ui';
import { carePointsApi } from '../services/api';
import type { CarePoint, CarePointWithUpdates, CarePointType, CarePointStatus } from '../types';

type FilterStatus = 'all' | CarePointStatus;
type FilterType = 'all' | CarePointType;

export function CarePoints() {
  const [carePoints, setCarePoints] = useState<CarePoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [typeFilter, setTypeFilter] = useState<FilterType>('all');
  const [selectedCarePoint, setSelectedCarePoint] = useState<CarePointWithUpdates | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCarePoints = async () => {
      try {
        const data = await carePointsApi.getAll();
        setCarePoints(data);
      } catch (error) {
        console.error('Error fetching care points:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarePoints();
  }, []);

  const handleViewDetails = async (id: number) => {
    try {
      const data = await carePointsApi.getById(id);
      setSelectedCarePoint(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching care point details:', error);
    }
  };

  const filteredCarePoints = carePoints.filter((cp) => {
    if (statusFilter !== 'all' && cp.status !== statusFilter) return false;
    if (typeFilter !== 'all' && cp.type !== typeFilter) return false;
    return true;
  });

  const statusFilters: { value: FilterStatus; label: string }[] = [
    { value: 'all', label: 'All Status' },
    { value: 'Ok', label: 'OK' },
    { value: 'NeedsRefill', label: 'Needs Refill' },
    { value: 'Broken', label: 'Broken' },
  ];

  const typeFilters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All Types' },
    { value: 'Food', label: '🍖 Food' },
    { value: 'Water', label: '💧 Water' },
    { value: 'Shelter', label: '🏠 Shelter' },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="animate-fade-in">
      <section className="bg-white border-b border-neutral-100 py-8">
        <div className="container-app">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="section-title">Care Points</h1>
              <p className="section-subtitle">
                Find and maintain feeding stations, water bowls, and shelters
              </p>
            </div>
            <Button variant="primary">
              + Add Care Point
            </Button>
          </div>
        </div>
      </section>

      <div className="container-app py-8">
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {statusFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setStatusFilter(f.value)}
                className={`
                  px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                  ${statusFilter === f.value
                    ? 'bg-primary-500 text-white shadow-soft'
                    : 'bg-white text-neutral-600 hover:bg-neutral-50 border border-neutral-200'
                  }
                `}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="w-px bg-neutral-200 hidden md:block" />
          <div className="flex flex-wrap gap-2">
            {typeFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setTypeFilter(f.value)}
                className={`
                  px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                  ${typeFilter === f.value
                    ? 'bg-secondary-500 text-white shadow-soft'
                    : 'bg-white text-neutral-600 hover:bg-neutral-50 border border-neutral-200'
                  }
                `}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm text-neutral-500 mb-6">
          Showing {filteredCarePoints.length} of {carePoints.length} care points
        </p>

        {loading ? (
          <div className="text-center py-12 text-neutral-500">Loading care points...</div>
        ) : filteredCarePoints.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📍</span>
            </div>
            <h3 className="text-lg font-medium text-neutral-700 mb-2">No care points found</h3>
            <p className="text-neutral-500">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCarePoints.map((cp) => (
              <Card key={cp.id} className="flex flex-col">
                <CardContent className="flex-1">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex gap-2">
                      <CarePointTypeBadge type={cp.type} />
                      <StatusBadge status={cp.status} />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    {cp.title}
                  </h3>
                  <div className="space-y-2 text-sm text-neutral-600">
                    <p className="flex items-center gap-2">
                      <span>📍</span>
                      <span>{cp.latitude.toFixed(4)}, {cp.longitude.toFixed(4)}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span>🕐</span>
                      <span>Updated {formatDate(cp.lastUpdatedAt)}</span>
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleViewDetails(cp.id)}
                  >
                    View Details
                  </Button>
                  <Button variant="primary" size="sm" className="flex-1">
                    Update Status
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Care Point Details"
        size="lg"
      >
        {selectedCarePoint && (
          <div>
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex gap-2 mb-2">
                  <CarePointTypeBadge type={selectedCarePoint.type} />
                  <StatusBadge status={selectedCarePoint.status} />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900">
                  {selectedCarePoint.title}
                </h3>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-neutral-50 rounded-xl p-4">
                <p className="text-sm text-neutral-500 mb-1">Location</p>
                <p className="font-medium">
                  {selectedCarePoint.latitude.toFixed(6)}, {selectedCarePoint.longitude.toFixed(6)}
                </p>
              </div>
              <div className="bg-neutral-50 rounded-xl p-4">
                <p className="text-sm text-neutral-500 mb-1">Last Updated</p>
                <p className="font-medium">{formatDate(selectedCarePoint.lastUpdatedAt)}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-neutral-900 mb-4">Update History</h4>
              {selectedCarePoint.updates.length === 0 ? (
                <p className="text-neutral-500 text-sm">No updates yet</p>
              ) : (
                <div className="space-y-3">
                  {selectedCarePoint.updates.map((update) => (
                    <div
                      key={update.id}
                      className="bg-neutral-50 rounded-xl p-4 border-l-4 border-primary-500"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <StatusBadge status={update.statusAfterUpdate} />
                        <span className="text-xs text-neutral-500">
                          {formatDate(update.updatedAt)}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-700">{update.note}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
