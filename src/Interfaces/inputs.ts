export interface InputPayload {
  path: PropertyPath;
  name: string; // TODO faire un type
  value: string;
}

export type PropertyPath =
  | 'activityInputs'
  | 'authenticationInputs'
  | 'drugInputs'
  | 'foodInputs'
  | 'hydrationInputs'
  | 'sleepInputs'
  | 'smokeInputs';

export interface ActivityInputs {
  duration: number | '';
  intensity: 1 | 2 | 3 | '';
  type: 'footing' | 'marche' | 'natation' | 'velo' | 'autre' | '';
  date: string;
}

export interface AuthenticationInputs {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  gender: 'homme' | 'femme';
}

export interface DrugInputs {
  name: string;
  unit: string;
  quantity: number | '';
  date: string;
}

export interface FoodInputs {
  name: string;
  date: string;
}

export interface HydrationInputs {
  quantity: number | '';
  date: string;
}

export interface SleepInputs {
  duration: number | '';
  quality: number | '';
  date: string;
}

export interface SmokeInputs {
  quantity: number | '';
  date: string;
}
