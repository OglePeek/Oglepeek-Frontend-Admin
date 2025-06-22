// src/redux/formSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Variant {
  frameColor: string;
  inStock: number;
  price: number;
  size: string;
}

interface FormState {
  addVariantForm: Variant[]; // now stores an array of variants
}

const initialState: FormState = {
  addVariantForm: [],
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    saveFormData: (state, action: PayloadAction<Variant>) => {
      state.addVariantForm = [...state.addVariantForm, action.payload];
      console.log("Saved:", action.payload);
    },
    resetFormData: () => initialState,
  },
});

export const { saveFormData, resetFormData } = formSlice.actions;
export default formSlice.reducer;
