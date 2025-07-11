import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DropdownInput } from "./DropdownInput";
import { TextInput } from "./TextInput";
import { Button } from "@mui/material";
import { CheckboxInput } from "./CheckboxInput";
import FileUploadInput from "./FileUploadInput";
import { useCreateVariantMutation } from "../services/api";

type Props = {
  productId: string;
};

const schema = yup
  .object({
    frameColor: yup.string().required(),
    inStock: yup.number().positive().integer().required(),
    price: yup.number().positive().integer().required(),
    size: yup.string().required(),
    hidden: yup.boolean().default(false),
    images: yup.array().required(),
  })
  .required();

export const AddVariantForm = ({ productId }: Props) => {
  type FormValues = yup.InferType<typeof schema>;

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      frameColor: "",
      inStock: 0,
      price: 0,
      size: "",
      hidden: false,
      images: [],
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const [createVariant] = useCreateVariantMutation();

  const createProductVariant = (data: FormValues) => {
    createVariant({ body: data, productId: productId })
      .then((res) => {
        console.log("Item added:", res);
        alert(res);
      })
      .catch((err) => console.error("Error adding item:", err));
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(createProductVariant)}>
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

            <div>
              <FileUploadInput />
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
