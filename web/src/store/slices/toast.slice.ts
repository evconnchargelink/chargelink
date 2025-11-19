import { createSlice } from "@reduxjs/toolkit";


type SEVERITY = "error" | "info" | "success" | "warning";

export const SEVERITY = {
    ERROR : "error" as SEVERITY,
    INFO : "info" as SEVERITY,
    SUCCESS : "success" as SEVERITY,
    WARNING : "warning" as SEVERITY,
}

interface Toast {
  text: string;
  isOpen: boolean;
  severity: SEVERITY;
}

const initialState: Toast = {
  text: "",
  isOpen: false,
  severity: SEVERITY.SUCCESS,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    openToast: (state, action) => {
      state.text = action.payload.text ?? state.text;
      state.severity = action.payload.severity ?? state.severity;
      state.isOpen = true;
    },

    closeToast: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openToast, closeToast } = toastSlice.actions;

export default toastSlice.reducer;