import { AlertColor } from '@mui/material';

export type RequestStatus = 'idle' | 'pending' | 'rejected' | 'fulfilled';

export interface AlertMessage {
  severity: AlertColor;
  message: string;
}

export interface LoginResponse {
  token: string;
  id: number;
}

export interface UserDataResponse {
  message: AlertMessage;
  user: {
    firstname: string;
    lastname: string;
    roles: Roles[];
    activities: Activity[];
    drugs: Drug[];
    hydrations: Hydration[];
    sleeps: Sleep[];
    smokes: Smoke[];
    foods: Food[];
  };
}

export type Roles = 'ROLE_ADMIN' | 'ROLE_USER';

export interface ActivityApiResponse {
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

export interface FoodApiResponse {
  message: AlertMessage;
  food: Food;
  foods: Food[];
}
export interface Drug {
  id: number;
  date: string;
  name: string;
  unit: string;
  quantity: number;
}

export interface FoodCategoryApiResponse {
  message: AlertMessage;
  categories: FoodCategory[];
}

export interface Food {
  id: number;
  date: string;
  name: string;
  caloricNeed: number;
  caloricIntake: number;
}

export interface FoodCategory {
  id: number;
  title: string;
}

export interface FoodOFFResponse {
  id: string;
  name: string;
  brands: string;
  infos: FoodOFFResponseInfo;
  kcal: number;
  imgSrc: string;
  url: string;
}

export interface FoodOFFResponseInfo {
  fat: FoodOFFInfoEnum;
  salt: FoodOFFInfoEnum;
  'satured-fat': FoodOFFInfoEnum;
  sugars: FoodOFFInfoEnum;
}

export type FoodOFFInfoEnum = 'high' | 'low' | 'moderate';

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