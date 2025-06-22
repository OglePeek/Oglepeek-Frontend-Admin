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

// type Props = {

// }

const schema = yup
  .object({
    name: yup.string().required(),
    style: yup.string().required(),
    description: yup.string().required(),
    lens: yup.string().required(),
    gender: yup.string().required(),
    material: yup.string().required(),
    images: yup.array().required(),
  })
  .required();

export const AddItemForm = () => {
  const variantVals = useSelector(
    (state: RootState) => state?.form?.addVariantForm
  );

  const dispatch = useDispatch<AppDispatch>();

  const [openVariantForm, setOpenVariantForm] = useState(false);

  type FormValues = yup.InferType<typeof schema>;

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      style: "",
      description: "",
      lens: "",
      gender: "",
      material: "",
      images: [],
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const [addProduct] = useAddProductMutation();

  const onSubmit = (data: FormValues) => {
    const imageObj: Record<string, File> = {};

    data.images.forEach((file, index) => {
      imageObj[`image${index}`] = file;
    });
    const reqBody = {
      name: data.name,
      style: data.style,
      description: data.description,
      lens: data.lens,
      gender: data.gender,
      material: data.material,
      variants: variantVals,
      ...imageObj,
    };

    console.log("Request Body:", reqBody);
    addProduct(reqBody)
      .then((response) => {
        console.log("Item added:", response);
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
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
          <div className="grid grid-cols-3 gap-4">
            <div>
              <TextInput
                label={"name"}
                defaultValue="name"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </div>

            <div>
              <DropdownInput
                label={"style"}
                {...register("style")}
                error={!!errors.style}
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
                helperText={errors.style?.message}
              />
            </div>

            <div>
              <DropdownInput
                label={"lens"}
                {...register("lens")}
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
                {...register("material")}
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
                {...register("gender")}
                error={!!errors.gender}
                items={[
                  { value: "Man", label: "Man" },
                  { value: "Woman", label: "Woman" },
                  { value: "Unisex", label: "Unisex" },
                ]}
                helperText={errors.gender?.message}
              />
            </div>

            <div>
              <TextInput
                label={"description"}
                defaultValue="description"
                {...register("description")}
                error={!!errors.description}
                helperText={errors.description?.message}
                multiline
                rows={4}
              />
            </div>

            <div>
              <FileUploadInput />
            </div>
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
    </>
  );
};
