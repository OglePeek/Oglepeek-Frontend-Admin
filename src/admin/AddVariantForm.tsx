import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DropdownInput } from "./DropdownInput";
import { TextInput } from "./TextInput";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { saveFormData } from "../redux/formslice";
import type { AppDispatch } from "../redux/store";
import { CheckboxInput } from "./CheckboxInput";

// type Props = {

// }

const schema = yup
  .object({
    frameColor: yup.string().required(),
    inStock: yup.number().positive().integer().required(),
    price: yup.number().positive().integer().required(),
    size: yup.string().required(),
    hidden: yup.boolean().default(false),
  })
  .required();

export const AddVariantForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  type FormValues = yup.InferType<typeof schema>;

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      frameColor: "",
      inStock: 0,
      price: 0,
      size: "",
      hidden: false,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const saveToRedux = (data: FormValues) => {
    // console.log(data);
    dispatch(saveFormData(data));
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(saveToRedux)}>
          <div className="grid grid-cols-3 gap-4 py-4">
            <div>
              <TextInput
                label={"frameColor"}
                defaultValue="frameColor"
                {...register("frameColor")}
                error={!!errors.frameColor}
                helperText={errors.frameColor?.message}
              />
            </div>

            <div>
              <TextInput
                label={"inStock"}
                defaultValue="inStock"
                {...register("inStock")}
                error={!!errors.inStock}
                helperText={errors.inStock?.message}
              />
            </div>

            <div>
              <TextInput
                label={"price"}
                defaultValue="price"
                {...register("price")}
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            </div>

            <div>
              <DropdownInput
                label={"size"}
                name="size"
                error={!!errors.size}
                items={[
                  { value: "Round", label: "Man" },
                  { value: "Square", label: "Woman" },
                  { value: "Oval", label: "Unisex" },
                  { value: "Heart-Shape", label: "Heart-Shape" },
                ]}
                helperText={errors.size?.message}
              />
            </div>

            <div>
              <CheckboxInput name="hidden" label="Hidden" />
            </div>
          </div>
          <div>
            <Button type="submit" variant="contained">
              Add
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
