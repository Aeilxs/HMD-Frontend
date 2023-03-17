import { AlertColor } from '@mui/material';

export interface AlertMessage {
  severity: AlertColor;
  message: string;
}

export interface LoginResponse {
  token: string;
}

export interface ActivitiesApiResponse {
  message: AlertMessage;
  activity: Activity;
  activities: Activity[];
}

export interface DrugApiResponse {
  message: AlertMessage;
  drug: Drug;
  drugs: Drug[];
}

export interface HydrationApiResponse {
  message: AlertMessage;
  hydration: Hydration;
  hydrations: Hydration[];
}

export interface SmokeApiResponse {
  message: AlertMessage;
  smoke: Smoke;
  smokes: Smoke[];
}

export interface SleepApiResponse {
  message: AlertMessage;
  sleep: Sleep;
  sleeps: Sleep[];
}

export interface Drug {
  id: number;
  date: string;
  name: string;
  unit: string;
  quantity: number;
}

export interface Food {
  id: number;
  date: string;
  name: string;
  caloricNeed: number;
  caloricIntake: number;
}

export interface Hydration {
  id: number;
  date: string;
  quantity: number;
}

export interface Activity {
  id: number;
  date: string;
  type: string;
  duration: number;
  intensity: number;
}

export interface Sleep {
  id: number;
  duration: number;
  quality: number;
  date: string;
}

export interface Smoke {
  id: number;
  quantity: number;
  date: string;
}
