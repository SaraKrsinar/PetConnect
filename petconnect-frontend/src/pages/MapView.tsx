import { useState, useEffect } from 'react';
import { Card, CardContent, StatusBadge, ReportTypeBadge, CarePointTypeBadge, PetTypeBadge } from '../components/ui';
import { carePointsApi, petReportsApi, sheltersApi } from '../services/api';
import type { CarePoint, PetReport, Shelter } from '../types';

type FilterType = 'all' | 'carepoints' | 'reports' | 'shelters';

export function MapView() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [carePoints, setCarePoints] = useState<CarePoint[]>([]);
  const [reports, setReports] = useState<PetReport[]>([]);
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carePointsData, reportsData, sheltersData] = await Promise.all([
          carePointsApi.getAll(),
          petReportsApi.getAll(),
          sheltersApi.getAll(),
        ]);
        setCarePoints(carePointsData);
        setReports(reportsData);
        setShelters(sheltersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filters: { value: FilterType; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: carePoints.length + reports.length + shelters.length },
    { value: 'carepoints', label: 'Care Points', count: carePoints.length },
    { value: 'reports', label: 'Reports', count: reports.length },
    { value: 'shelters', label: 'Shelters', count: shelters.length },
  ];

  return (
    <div className="animate-fade-in">
      <section className="bg-white border-b border-neutral-100 py-8">
        <div className="container-app">
          <h1 className="section-title">Map View</h1>
          <p className="section-subtitle">
            Explore care points, pet reports, and shelters in your area
          </p>
        </div>
      </section>

      <div className="container-app py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card padding="none" className="overflow-hidden">
              <div className="aspect-4/3 bg-linear-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 bg-neutral-300 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">🗺️</span>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-700 mb-2">
                    Interactive Map
                  </h3>
                  <p className="text-neutral-500 text-sm max-w-sm">
                    Map integration coming soon. For now, browse the list of locations on the right.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <div className="flex flex-wrap gap-2 mb-6">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`
                    px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                    ${filter === f.value
                      ? 'bg-primary-500 text-white shadow-soft'
                      : 'bg-white text-neutral-600 hover:bg-neutral-50 border border-neutral-200'
                    }
                  `}
                >
                  {f.label}
                  <span
                    className={`
                      ml-2 px-1.5 py-0.5 rounded-full text-xs
                      ${filter === f.value ? 'bg-white/20' : 'bg-neutral-100'}
                    `}
                  >
                    {f.count}
                  </span>
                </button>
              ))}
            </div>

            <div className="space-y-4 max-h-150 overflow-y-auto pr-2">
              {loading ? (
                <div className="text-center py-8 text-neutral-500">Loading...</div>
              ) : (
                <>
                  {(filter === 'all' || filter === 'carepoints') &&
                    carePoints.map((cp) => (
                      <Card key={`cp-${cp.id}`} interactive padding="sm">
                        <CardContent>
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <CarePointTypeBadge type={cp.type} />
                                <StatusBadge status={cp.status} />
                              </div>
                              <h4 className="font-medium text-neutral-900 truncate">
                                {cp.title}
                              </h4>
                              <p className="text-xs text-neutral-500 mt-1">
                                📍 {cp.latitude.toFixed(4)}, {cp.longitude.toFixed(4)}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                  {(filter === 'all' || filter === 'reports') &&
                    reports.map((report) => (
                      <Card key={`report-${report.id}`} interactive padding="sm">
                        <CardContent>
                          <div className="flex items-start gap-3">
                            {report.photoUrl && (
                              <img
                                src={report.photoUrl}
                                alt=""
                                className="w-16 h-16 rounded-xl object-cover shrink-0"
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <ReportTypeBadge type={report.type} />
                                <PetTypeBadge type={report.petType} />
                              </div>
                              <p className="text-sm text-neutral-700 line-clamp-2">
                                {report.description}
                              </p>
                              <p className="text-xs text-neutral-500 mt-1">
                                📍 {report.latitude.toFixed(4)}, {report.longitude.toFixed(4)}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                  {(filter === 'all' || filter === 'shelters') &&
                    shelters.map((shelter) => (
                      <Card key={`shelter-${shelter.id}`} interactive padding="sm">
                        <CardContent>
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center shrink-0">
                              <span className="text-xl">🏠</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-neutral-900 truncate">
                                {shelter.name}
                              </h4>
                              <p className="text-xs text-neutral-500 truncate">
                                {shelter.address}
                              </p>
                              <p className="text-xs text-neutral-500">
                                📞 {shelter.phone}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
