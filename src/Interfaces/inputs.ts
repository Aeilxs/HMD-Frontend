export interface InputPayload {
  path: PropertyPath;
  name: string;
  value: string;
}

export type PropertyPath =
  | 'activityInputs'
  | 'authenticationInputs'
  | 'drugInputs'
  | 'foodInputs'
  | 'hydrationInputs'
  | 'profilInputs'
  | 'sleepInputs'
  | 'smokeInputs';

export interface ActivityInputs {
  id: number | null;
  duration: number | '';
  intensity: 1 | 2 | 3 | '';
  type: 'footing' | 'marche' | 'natation' | 'velo' | 'autre' | '';
  date: string | null;
}

export interface AuthenticationInputs {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  gender: 'homme' | 'femme';
}

export interface DrugInputs {
  id: null;
  name: string;
  unit: string;
  infos: string;
  quantity: number | '';
  date: string | null;
}

export interface FoodInputs {
  name: string;
  search: string;
  categories: string[];
  page: number;
  category: string | null;
  date: string | null;
}

export interface HydrationInputs {
  id: number | null;
  quantity: number | '';
  date: string | null;
}

export interface ProfilInputs {
  dateOfBirth: string | null;
  size: number | '';
  weight: number | '';
}

export interface SleepInputs {
  id: number | null;
  duration: number | '';
  quality: number | '';
  date: string | null;
}

export interface SmokeInputs {
  id: number | null;
  quantity: number | '';
  date: string | null;
}
