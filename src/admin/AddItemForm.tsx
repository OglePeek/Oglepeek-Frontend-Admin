import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextInput } from "./TextInput";
import { Button } from "@mui/material";
import { DropdownInput } from "./DropdownInput";
import type { AppDispatch } from "../redux/store";
import { resetFormData } from "../redux/formslice";
import { useDispatch } from "react-redux";
import { useAddProductMutation } from "../services/api";

// type Props = {

// }

const schema = yup
  .object({
    name: yup.string().required(),
    frameStyle: yup.string().required(),
    description: yup.string().required(),
    lens: yup.string().required(),
    gender: yup.string().required(),
    material: yup.string().required(),
    productType: yup.string().required(),
    frameType: yup.string().required(),
  })
  .required();

export const AddItemForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  type FormValues = yup.InferType<typeof schema>;

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      frameStyle: "",
      description: "",
      lens: "",
      gender: "",
      productType: "",
      frameType: "",
      material: "",
      // images: [],
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
    addProduct(data)
      .then((res) => console.log("Item added:", res))
      .catch((err) => console.error("Error adding item:", err));
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
    </>
  );
};
