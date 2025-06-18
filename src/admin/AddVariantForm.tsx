import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DropdownInput } from "./DropdownInput";
import { TextInput } from "./TextInput";

// type Props = {

// }

const schema = yup
  .object({
    colorName: yup.string().required(),
    inStock: yup.number().positive().integer().required(),
    price: yup.number().positive().integer().required(),
    size: yup.string().required(),
  })
  .required();

export const AddVariantForm = () => {
  type FormValues = yup.InferType<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      colorName: "",
      inStock: 0,
      price: 0,
      size: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data); // call api with submitted data
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextInput
            label={"colorName"}
            defaultValue="colorName"
            {...register("colorName")}
            error={!!errors.colorName}
            helperText={errors.colorName?.message}
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
            {...register("size")}
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
      </form>
    </div>
  );
};
