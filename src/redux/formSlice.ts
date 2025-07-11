// src/redux/formSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Variant {
  id?: string; // Optional if not used
  variantId?: string; // Optional if not used
  inStock: number;
  frameColor: string;
  price: number;
  size: number | string; // Assuming size can be a number or string
  hidden: boolean;
  images: File[] | string[]; // or string[] if URLs
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
    saveFormData: (state, action: PayloadAction<Variant | Variant[]>) => {
      const newVariants = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];

      newVariants.forEach((variant) => {
        const exists = state.addVariantForm.find(
          (v) => v?.variantId === variant?.variantId
        );

        if (!exists) {
          state.addVariantForm.push(variant);
        }
      });
    },
    resetFormData: () => initialState,
  },
});

export const { saveFormData, resetFormData } = formSlice.actions;
export default formSlice.reducer;
