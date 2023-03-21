import {
  Activity,
  AlertMessage,
  Drug,
  Food,
  FoodOFFResponse,
  Hydration,
  RequestStatus,
  Sleep,
  Smoke,
} from './API_Interfaces';

export interface AdminState {
  categories: {
    isUpdated: boolean;
    message: AlertMessage;
    categoriesArray: string[];
    categoriesStatus: RequestStatus;
    tries: number;
  };

  postCategories: {
    message: AlertMessage;
    progress: number;
    categoriesPostStatus: RequestStatus;
  };
}

export interface ActivityState {
  id: number | null;
  message: AlertMessage;
  activities: Activity[];
}

export interface DrugState {
  message: AlertMessage;
  drugs: Drug[];
}

export interface FoodState {
  message: AlertMessage;
  displayedFoods: {
    foodsStatus: RequestStatus;
    foodsArray: FoodOFFResponse[];
  };
  categories: {
    categoriesStatus: RequestStatus;
    categoriesArray: string[];
  };
  foods: Food[];
}

export interface HydrationState {
  message: AlertMessage;
  hydrations: Hydration[];
}

export interface SleepState {
  id: number | null;
  message: AlertMessage;
  sleeps: Sleep[];
}

export interface SmokeState {
  message: AlertMessage;
  smokes: Smoke[];
}
