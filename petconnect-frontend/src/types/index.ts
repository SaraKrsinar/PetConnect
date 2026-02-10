export type CarePointType = 'Food' | 'Water' | 'Shelter';
export type CarePointStatus = 'Ok' | 'NeedsRefill' | 'Broken';
export type PetReportType = 'Lost' | 'Found' | 'Spotted';
export type PetType = 'Dog' | 'Cat' | 'Other';
export type PetReportStatus = 'Active' | 'Resolved';

export interface CarePoint {
  id: number;
  title: string;
  type: CarePointType;
  latitude: number;
  longitude: number;
  status: CarePointStatus;
  lastUpdatedAt: string;
}

export interface CarePointUpdate {
  id: number;
  carePointId: number;
  note: string;
  statusAfterUpdate: CarePointStatus;
  updatedAt: string;
}

export interface CarePointWithUpdates extends CarePoint {
  updates: CarePointUpdate[];
}

export interface PetReport {
  id: number;
  type: PetReportType;
  petType: PetType;
  description: string;
  photoUrl: string | null;
  latitude: number;
  longitude: number;
  status: PetReportStatus;
  createdAt: string;
}

export interface Shelter {
  id: number;
  name: string;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface CreateCarePointDto {
  title: string;
  type: CarePointType;
  latitude: number;
  longitude: number;
  status: CarePointStatus;
}

export interface CreateCarePointUpdateDto {
  note: string;
  statusAfterUpdate: CarePointStatus;
}

export interface CreatePetReportDto {
  type: PetReportType;
  petType: PetType;
  description: string;
  photoUrl?: string;
  latitude: number;
  longitude: number;
}

export interface CreateShelterDto {
  name: string;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
}
