import { useState, useEffect } from 'react';
import { Card, CardContent, Button, ReportTypeBadge, PetTypeBadge, Badge, Modal } from '../components/ui';
import { petReportsApi } from '../services/api';
import type { PetReport, PetReportType, PetType } from '../types';

type FilterReportType = 'all' | PetReportType;
type FilterPetType = 'all' | PetType;

export function LostFound() {
  const [reports, setReports] = useState<PetReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [reportTypeFilter, setReportTypeFilter] = useState<FilterReportType>('all');
  const [petTypeFilter, setPetTypeFilter] = useState<FilterPetType>('all');
  const [selectedReport, setSelectedReport] = useState<PetReport | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await petReportsApi.getAll();
        setReports(data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const filteredReports = reports.filter((report) => {
    if (reportTypeFilter !== 'all' && report.type !== reportTypeFilter) return false;
    if (petTypeFilter !== 'all' && report.petType !== petTypeFilter) return false;
    return true;
  });

  const reportTypeFilters: { value: FilterReportType; label: string; color: string }[] = [
    { value: 'all', label: 'All Reports', color: 'neutral' },
    { value: 'Lost', label: '🔴 Lost', color: 'danger' },
    { value: 'Found', label: '🟢 Found', color: 'success' },
    { value: 'Spotted', label: '🔵 Spotted', color: 'info' },
  ];

  const petTypeFilters: { value: FilterPetType; label: string }[] = [
    { value: 'all', label: 'All Pets' },
    { value: 'Dog', label: '🐕 Dogs' },
    { value: 'Cat', label: '🐈 Cats' },
    { value: 'Other', label: '🐾 Other' },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleViewDetails = (report: PetReport) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  return (
    <div className="animate-fade-in">
      <section className="bg-white border-b border-neutral-100 py-8">
        <div className="container-app">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="section-title">Lost & Found</h1>
              <p className="section-subtitle">
                Report lost pets, found animals, or sightings in your area
              </p>
            </div>
            <Button variant="primary">
              + Report a Pet
            </Button>
          </div>
        </div>
      </section>

      <div className="container-app py-8">
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {reportTypeFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setReportTypeFilter(f.value)}
                className={`
                  px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                  ${reportTypeFilter === f.value
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
            {petTypeFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setPetTypeFilter(f.value)}
                className={`
                  px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                  ${petTypeFilter === f.value
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
          Showing {filteredReports.length} of {reports.length} reports
        </p>

        {loading ? (
          <div className="text-center py-12 text-neutral-500">Loading reports...</div>
        ) : filteredReports.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-lg font-medium text-neutral-700 mb-2">No reports found</h3>
            <p className="text-neutral-500">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report) => (
              <Card
                key={report.id}
                interactive
                padding="none"
                className="overflow-hidden"
                onClick={() => handleViewDetails(report)}
              >
                <div className="aspect-4/3 bg-neutral-100 relative">
                  {report.photoUrl ? (
                    <img
                      src={report.photoUrl}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-6xl opacity-30">
                        {report.petType === 'Dog' ? '🐕' : report.petType === 'Cat' ? '🐈' : '🐾'}
                      </span>
                    </div>
                  )}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <ReportTypeBadge type={report.type} />
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <Badge variant="neutral" className="bg-white/90 backdrop-blur-sm">
                      {formatDate(report.createdAt)}
                    </Badge>
                  </div>
                </div>

                <CardContent>
                  <div className="flex items-center gap-2 mb-2">
                    <PetTypeBadge type={report.petType} />
                    {report.status === 'Resolved' && (
                      <Badge variant="success">Resolved</Badge>
                    )}
                  </div>
                  <p className="text-neutral-700 text-sm line-clamp-2">
                    {report.description}
                  </p>
                  <p className="text-xs text-neutral-500 mt-2 flex items-center gap-1">
                    <span>📍</span>
                    <span>{report.latitude.toFixed(4)}, {report.longitude.toFixed(4)}</span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Report Details"
        size="lg"
      >
        {selectedReport && (
          <div>
            {selectedReport.photoUrl && (
              <div className="aspect-video rounded-xl overflow-hidden mb-6">
                <img
                  src={selectedReport.photoUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-4">
              <ReportTypeBadge type={selectedReport.type} />
              <PetTypeBadge type={selectedReport.petType} />
              {selectedReport.status === 'Resolved' && (
                <Badge variant="success">Resolved</Badge>
              )}
            </div>

            <p className="text-neutral-700 mb-6 leading-relaxed">
              {selectedReport.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-neutral-50 rounded-xl p-4">
                <p className="text-sm text-neutral-500 mb-1">Location</p>
                <p className="font-medium">
                  {selectedReport.latitude.toFixed(6)}, {selectedReport.longitude.toFixed(6)}
                </p>
              </div>
              <div className="bg-neutral-50 rounded-xl p-4">
                <p className="text-sm text-neutral-500 mb-1">Reported</p>
                <p className="font-medium">
                  {new Date(selectedReport.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="primary" className="flex-1">
                Contact Reporter
              </Button>
              <Button variant="outline" className="flex-1">
                Share Report
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
