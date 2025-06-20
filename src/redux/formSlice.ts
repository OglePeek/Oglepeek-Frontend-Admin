// src/redux/formSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  addVariantForm: {
    colorName: string;
    inStock: number;
    price: number;
    size: string;
  };
}

const initialState: FormState = {
  addVariantForm: {
    colorName: "",
    inStock: 0,
    price: 0,
    size: "",
  },
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    saveFormData: (
      state,
      action: PayloadAction<FormState["addVariantForm"]>
    ) => {
      return { ...state, ...action.payload };
    },
    resetFormData: () => initialState,
  },
});

export const { saveFormData, resetFormData } = formSlice.actions;
export default formSlice.reducer;
