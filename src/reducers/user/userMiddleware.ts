import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store/store";

export const registerLoginUser = createAsyncThunk(
  "ui/registerLoginUser",
  async (_, { getState }) => {
    const { email, password } = (getState() as RootState).ui.user;
    const response = await axios.post("http://localhost:8000/api/login", {
      username: email,
      password: password,
    });
    return response.data.token;
  }
);
