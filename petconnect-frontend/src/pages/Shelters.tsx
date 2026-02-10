import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, Button, Modal } from '../components/ui';
import { sheltersApi } from '../services/api';
import type { Shelter } from '../types';

export function Shelters() {
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedShelter, setSelectedShelter] = useState<Shelter | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const data = await sheltersApi.getAll();
        setShelters(data);
      } catch (error) {
        console.error('Error fetching shelters:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShelters();
  }, []);

  const filteredShelters = shelters.filter((shelter) =>
    shelter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shelter.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetails = (shelter: Shelter) => {
    setSelectedShelter(shelter);
    setIsModalOpen(true);
  };

  return (
    <div className="animate-fade-in">
      <section className="bg-white border-b border-neutral-100 py-8">
        <div className="container-app">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="section-title">Shelters & Adoption</h1>
              <p className="section-subtitle">
                Connect with local shelters and find your new best friend
              </p>
            </div>
            <Button variant="primary">
              + Register Shelter
            </Button>
          </div>
        </div>
      </section>

      <div className="container-app py-8">
        <div className="mb-8">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search shelters by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-12"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <p className="text-sm text-neutral-500 mb-6">
          Showing {filteredShelters.length} of {shelters.length} shelters
        </p>

        {loading ? (
          <div className="text-center py-12 text-neutral-500">Loading shelters...</div>
        ) : filteredShelters.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏠</span>
            </div>
            <h3 className="text-lg font-medium text-neutral-700 mb-2">No shelters found</h3>
            <p className="text-neutral-500">Try a different search term</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShelters.map((shelter) => (
              <Card key={shelter.id} className="flex flex-col">
                <CardContent className="flex-1">
                  <div className="w-16 h-16 bg-linear-to-br from-secondary-100 to-secondary-200 rounded-2xl flex items-center justify-center mb-4">
                    <span className="text-3xl">🏠</span>
                  </div>

                  <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                    {shelter.name}
                  </h3>

                  <div className="space-y-2 text-sm text-neutral-600">
                    <p className="flex items-start gap-2">
                      <span className="shrink-0">📍</span>
                      <span className="line-clamp-2">{shelter.address}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span>📞</span>
                      <a
                        href={`tel:${shelter.phone}`}
                        className="text-primary-600 hover:text-primary-700 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {shelter.phone}
                      </a>
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleViewDetails(shelter)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`tel:${shelter.phone}`);
                    }}
                  >
                    Call Now
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
        title="Shelter Details"
        size="md"
      >
        {selectedShelter && (
          <div>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-20 h-20 bg-linear-to-br from-secondary-100 to-secondary-200 rounded-2xl flex items-center justify-center shrink-0">
                <span className="text-4xl">🏠</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-1">
                  {selectedShelter.name}
                </h3>
                <p className="text-neutral-600 text-sm">
                  Animal Shelter & Rescue
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-neutral-50 rounded-xl p-4">
                <p className="text-sm text-neutral-500 mb-1">Address</p>
                <p className="font-medium">{selectedShelter.address}</p>
              </div>
              <div className="bg-neutral-50 rounded-xl p-4">
                <p className="text-sm text-neutral-500 mb-1">Phone</p>
                <a
                  href={`tel:${selectedShelter.phone}`}
                  className="font-medium text-primary-600 hover:text-primary-700"
                >
                  {selectedShelter.phone}
                </a>
              </div>
              <div className="bg-neutral-50 rounded-xl p-4">
                <p className="text-sm text-neutral-500 mb-1">Location</p>
                <p className="font-medium">
                  {selectedShelter.latitude.toFixed(6)}, {selectedShelter.longitude.toFixed(6)}
                </p>
              </div>
            </div>

            <div className="aspect-video bg-neutral-100 rounded-xl flex items-center justify-center mb-6">
              <div className="text-center">
                <span className="text-4xl mb-2 block">🗺️</span>
                <p className="text-sm text-neutral-500">Map view coming soon</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="primary"
                className="flex-1"
                onClick={() => window.open(`tel:${selectedShelter.phone}`)}
              >
                📞 Call Shelter
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  const url = `https://www.google.com/maps/search/?api=1&query=${selectedShelter.latitude},${selectedShelter.longitude}`;
                  window.open(url, '_blank');
                }}
              >
                🗺️ Get Directions
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
