export interface DrugResponse {
  id: number;
  date: string;
  name: string;
  unit: string;
  quantity: number;
}

export interface FoodResponse {
  id: number;
  date: string;
  name: string;
  caloricNeed: number;
  caloricIntake: number;
}

export interface HydrationResponse {
  id: number;
  date: string;
  quantity: number;
}

export interface ActivityResponse {
  id: number;
  date: string;
  type: string;
  time: number;
  intensity: number;
}

export interface SleepResponse {
  id: number;
  time: number;
  quality: number;
  date: string;
}

export interface SmokeResponse {
  id: number;
  quantity: number;
  date: string;
}
