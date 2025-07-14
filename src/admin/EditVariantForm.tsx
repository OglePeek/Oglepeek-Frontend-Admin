import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DropdownInput } from "./DropdownInput";
import { TextInput } from "./TextInput";
import { Button } from "@mui/material";
import { CheckboxInput } from "./CheckboxInput";
import FileUploadInput from "./FileUploadInput";
import { useUpdateVariantMutation } from "../services/api";
import type { Variant } from "./ProductGrid";

type Props = {
  variant: Variant;
};

const schema = yup
  .object({
    variantId: yup.string().required(),
    frameColor: yup.string().required(),
    inStock: yup.number().positive().integer().required(),
    price: yup.number().positive().integer().required(),
    size: yup.string().required(),
    hidden: yup.boolean().default(false),
    images: yup.array().required(),
  })
  .required();

export const EditVariantForm = ({ variant }: Props) => {
  type FormValues = yup.InferType<typeof schema>;

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      variantId: variant?.variantId || "",
      frameColor: variant?.frameColor || "",
      inStock: variant?.inStock || 0,
      price: variant?.price || 0,
      size: variant?.size || "",
      hidden: variant?.hidden || false,
      images: [],
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const [updateVariant] = useUpdateVariantMutation();

  const createProductVariant = (data: FormValues) => {
    updateVariant({ body: data, variantId: variant.variantId })
      .unwrap()
      .then((res) => {
        console.log(res);
        alert(res?.data?.message);
      })
      .catch((err) => {
        console.error(err);
        alert(err?.data?.message);
      });
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(createProductVariant)}>
          <div className="grid grid-cols-3 gap-4 py-4">
            <>
              <TextInput
                label={"variantId"}
                defaultValue="variantId"
                {...register("variantId")}
                error={!!errors.variantId}
                helperText={errors.variantId?.message}
              />
            </>

            <>
              <TextInput
                label={"frameColor"}
                defaultValue="frameColor"
                {...register("frameColor")}
                error={!!errors.frameColor}
                helperText={errors.frameColor?.message}
              />
            </>

            <>
              <TextInput
                label={"inStock"}
                defaultValue="inStock"
                {...register("inStock")}
                error={!!errors.inStock}
                helperText={errors.inStock?.message}
              />
            </>

            <>
              <TextInput
                label={"price"}
                defaultValue="price"
                {...register("price")}
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            </>

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
              <FileUploadInput />
            </div>

            <div>
              <CheckboxInput name="hidden" label="Hidden" />
            </div>
          </div>
          <div>
            <Button type="submit" variant="contained">
              Update
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
