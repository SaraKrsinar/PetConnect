import axios from 'axios';
import type {
  CarePoint,
  CarePointWithUpdates,
  CarePointUpdate,
  PetReport,
  Shelter,
  CreateCarePointDto,
  CreateCarePointUpdateDto,
  CreatePetReportDto,
  CreateShelterDto,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5242/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const carePointsApi = {
  getAll: async (): Promise<CarePoint[]> => {
    const response = await api.get<CarePoint[]>('/carepoints');
    return response.data;
  },

  getById: async (id: number): Promise<CarePointWithUpdates> => {
    const response = await api.get<CarePointWithUpdates>(`/carepoints/${id}`);
    return response.data;
  },

  create: async (data: CreateCarePointDto): Promise<CarePoint> => {
    const response = await api.post<CarePoint>('/carepoints', data);
    return response.data;
  },

  update: async (id: number, data: CreateCarePointDto): Promise<CarePoint> => {
    const response = await api.put<CarePoint>(`/carepoints/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/carepoints/${id}`);
  },

  addUpdate: async (id: number, data: CreateCarePointUpdateDto): Promise<CarePointUpdate> => {
    const response = await api.post<CarePointUpdate>(`/carepoints/${id}/updates`, data);
    return response.data;
  },
};

export const petReportsApi = {
  getAll: async (): Promise<PetReport[]> => {
    const response = await api.get<PetReport[]>('/petreports');
    return response.data;
  },

  getById: async (id: number): Promise<PetReport> => {
    const response = await api.get<PetReport>(`/petreports/${id}`);
    return response.data;
  },

  create: async (data: CreatePetReportDto): Promise<PetReport> => {
    const response = await api.post<PetReport>('/petreports', data);
    return response.data;
  },

  update: async (id: number, data: Partial<PetReport>): Promise<PetReport> => {
    const response = await api.put<PetReport>(`/petreports/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/petreports/${id}`);
  },
};

export const sheltersApi = {
  getAll: async (): Promise<Shelter[]> => {
    const response = await api.get<Shelter[]>('/shelters');
    return response.data;
  },

  getById: async (id: number): Promise<Shelter> => {
    const response = await api.get<Shelter>(`/shelters/${id}`);
    return response.data;
  },

  create: async (data: CreateShelterDto): Promise<Shelter> => {
    const response = await api.post<Shelter>('/shelters', data);
    return response.data;
  },

  update: async (id: number, data: CreateShelterDto): Promise<Shelter> => {
    const response = await api.put<Shelter>(`/shelters/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/shelters/${id}`);
  },
};

export default api;
