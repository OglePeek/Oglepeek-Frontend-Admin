import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextInput } from "./TextInput";
import { Button } from "@mui/material";
import { DropdownInput } from "./DropdownInput";
import { useState } from "react";
import { DialogBox } from "./DialogBox";
import { AddVariantForm } from "./AddVariantForm";
import type { AppDispatch } from "../redux/store";
import { resetFormData } from "../redux/formslice";
import { useDispatch, useSelector } from "react-redux";
import FileUploadInput from "./FileUploadInput";
import type { RootState } from "../redux/store";
import { useAddProductMutation } from "../services/api";
import { GenericDataGrid } from "./GenericDataGrid";
import type { GridColDef } from "@mui/x-data-grid";

type VariantRow = {
  id: string | number; // Unique identifier for the row
  variantId: string; // Optional if not used
  inStock: number;
  frameColor: string;
  price: number;
  size: number;
  hidden: boolean;
  images: File[]; // Assuming images are stored as URLs
};

type Variant = {
  variantId?: string; // Optional if not used
  inStock: number;
  frameColor: string;
  price: number;
  size: number;
  hidden: boolean;
  images: File[]; // or string[] if URLs
};

type Props = {
  productData: {
    productId: string;
    name: string;
    frameStyle: string;
    description: string;
    lens: string;
    gender: string;
    material: string;
    productType: string;
    frameType: string;
    image: string;
  };
  variants: Variant[];
};

const schema = yup
  .object({
    id: yup.string().required(),
    name: yup.string().required(),
    frameStyle: yup.string().required(),
    description: yup.string().required(),
    lens: yup.string().required(),
    gender: yup.string().required(),
    material: yup.string().required(),
    images: yup.string().required(),
    productType: yup.string().required(),
    frameType: yup.string().required(),
  })
  .required();

const cols: GridColDef[] = [
  { field: "variantId", headerName: "ID", width: 90 },
  { field: "frameColor", headerName: "Frame Color", width: 150 },
  { field: "inStock", headerName: "In Stock", width: 150 },
  { field: "price", headerName: "Price", width: 110 },
  { field: "size", headerName: "Size", width: 110 },
  { field: "hidden", headerName: "Hidden", width: 110 },
];

export const UpdateItemForm = ({ productData, variants }: Props) => {
  //   const variantVals = useSelector(
  //     (state: RootState) => state?.form?.addVariantForm
  //   );
  const tablerows = variants?.map((item, index) => {
    return {
      id: item?.variantId || index,
      variantId: item?.variantId ?? "",
      images: item.images,
      frameColor: item.frameColor,
      inStock: item.inStock,
      price: item.price,
      size: item.size,
      hidden: item.hidden,
    };
  });

  const dispatch = useDispatch<AppDispatch>();

  const [openVariantForm, setOpenVariantForm] = useState(false);

  type FormValues = yup.InferType<typeof schema>;

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      id: productData?.productId || "",
      name: productData?.name || "",
      frameStyle: productData?.frameStyle || "",
      description: productData?.description || "",
      lens: productData?.lens || "",
      gender: productData?.gender || "",
      productType: productData?.productType || "",
      frameType: productData?.frameType || "",
      material: productData?.material || "",
      images: productData?.image || "",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const [addProduct] = useAddProductMutation();

  const onSubmit = () => {
    // const formData = new FormData();
    // formData.append("name", data.name);
    // formData.append("frameStyle", data.frameStyle);
    // formData.append("description", data.description);
    // formData.append("lens", data.lens);
    // formData.append("gender", data.gender);
    // formData.append("material", data.material);
    // formData.append("productType", data.productType);
    // formData.append("frameType", data.frameType);
    // formData.append("variants", JSON.stringify(variantVals));
    // data.images.forEach((file, index) => {
    //   formData.append(`images${index}`, file);
    // });
    // for (const [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
    // addProduct(formData)
    //   .then((res) => console.log("Item added:", res))
    //   .catch((err) => console.error("Error adding item:", err));
  };

  const openDialog = () => {
    setOpenVariantForm(true);
  };

  const clearForm = () => {
    reset();
    dispatch(resetFormData());
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-4 p-4">
            <>
              <TextInput
                label={"id"}
                {...register("id")}
                error={!!errors.id}
                helperText={errors.id?.message}
              />
            </>
            <>
              <TextInput
                label={"name"}
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </>

            <div>
              <DropdownInput
                label={"frameStyle"}
                name="frameStyle"
                error={!!errors.frameStyle}
                items={[
                  { value: "Round", label: "Round" },
                  { value: "Square", label: "Square" },
                  { value: "cat-eye", label: "cat-eye" },
                  { value: "oversized", label: "oversized" },
                  { value: "clock-master", label: "clock-master" },
                  { value: "shield", label: "shield" },
                  { value: "aviator", label: "aviator" },
                  { value: "waifer", label: "waifer" },
                ]}
                helperText={errors.frameStyle?.message}
              />
            </div>

            <div>
              <DropdownInput
                label={"productType"}
                name="productType"
                error={!!errors.productType}
                items={[
                  { value: "Eyeglasses", label: "Eyeglasses" },
                  { value: "Sunglasses", label: "Sunglasses" },
                ]}
                helperText={errors.productType?.message}
              />
            </div>

            <div>
              <DropdownInput
                label={"frameType"}
                name="frameType"
                error={!!errors.frameType}
                items={[
                  { value: "Full Rim", label: "Full Rim" },
                  { value: "Half Rim", label: "Half Rim" },
                  { value: "Rimless", label: "Rimless" },
                ]}
                helperText={errors.frameType?.message}
              />
            </div>

            <div>
              <DropdownInput
                label={"lens"}
                name="lens"
                error={!!errors.lens}
                items={[
                  { value: "Polarised", label: "Round" },
                  { value: "Photochromic", label: "Photochromic" },
                  { value: "Gradient", label: "Gradient" },
                  { value: "Tinted", label: "Tinted" },
                  { value: "Transparent-Lens", label: "Transparent-Lens" },
                  { value: "UV-400 protection", label: "UV-400 protection" },
                ]}
                helperText={errors.lens?.message}
              />
            </div>

            <div>
              <DropdownInput
                label={"material"}
                name="material"
                error={!!errors.material}
                items={[
                  { value: "Metal", label: "Metal" },
                  { value: "Acetate", label: "Acetate" },
                  { value: "TR90", label: "TR90" },
                  { value: "Wooden", label: "Wooden," },
                  { value: "Mix-Material", label: "Mix-Material" },
                ]}
                helperText={errors.material?.message}
              />
            </div>

            <div>
              <DropdownInput
                label={"gender"}
                name="gender"
                error={!!errors.gender}
                items={[
                  { value: "Man", label: "Man" },
                  { value: "Woman", label: "Woman" },
                  { value: "Unisex", label: "Unisex" },
                ]}
                helperText={errors.gender?.message}
              />
            </div>

            <>
              <TextInput
                label={"description"}
                name="description"
                error={!!errors.description}
                helperText={errors.description?.message}
                multiline
                rows={4}
              />
            </>

            {/* <div>
              <FileUploadInput />
            </div> */}
          </div>

          <div className="grid grid-cols-3 justify-items-start">
            <div className=" py-4">
              <Button variant="contained" type="button" onClick={openDialog}>
                Add Variant
              </Button>
            </div>
            <div className=" py-4">
              <Button variant="contained" type="submit">
                Add Item
              </Button>
            </div>
            <div className=" py-4">
              <Button variant="contained" type="button" onClick={clearForm}>
                Clear
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>

      <div>
        {openVariantForm ? (
          <>
            <DialogBox
              title="Add Variant"
              fieldform={<AddVariantForm />}
              openform={openVariantForm}
              closeform={setOpenVariantForm}
            ></DialogBox>
          </>
        ) : (
          <></>
        )}
      </div>

      <div>
        <GenericDataGrid<VariantRow>
          rows={tablerows ? tablerows : []}
          columns={cols}
          pageSize={5}
          checkboxSelection={true}
          getRowId={(row) => row.variantId}
        />
      </div>
    </>
  );
};
