import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  gender: "Homme" | "Femme";
}

export interface UIState {
  isDark: boolean;
  isRegistered: boolean;
  isDrawerOpen: boolean;
  user: User;
}

const initialState: UIState = {
  isDark: true,
  isRegistered: false,
  isDrawerOpen: true,
  user: {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    gender: "Homme",
  },
};

export const UISlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      return { ...state, isDark: !state.isDark };
    },
    toggleForm: (state, action: PayloadAction<boolean>) => {
      return { ...state, isRegistered: action.payload };
    },
    toggleDrawer: (state) => {
      return { ...state, isDrawerOpen: !state.isDrawerOpen };
    },
    setValue: (
      state,
      action: PayloadAction<{ value: string; name: string }>
    ) => {
      const { value, name } = action.payload;
      return {
        ...state,
        user: {
          ...state.user,
          [name]: value,
        },
      };
    },
    setGender: (state, action: PayloadAction<"Homme" | "Femme">) => {
      return {
        ...state,
        user: {
          ...state.user,
          gender: action.payload,
        },
      };
    },
  },
});

export const { toggleTheme, toggleDrawer, toggleForm, setValue, setGender } =
  UISlice.actions;

export const selectTheme = (state: RootState) => state.ui.isDark;
export const selectDrawerState = (state: RootState) => state.ui.isDrawerOpen;
export const selectForm = (state: RootState) => state.ui.isRegistered;
export const selectUser = (state: RootState) => state.ui.user;

export default UISlice.reducer;
