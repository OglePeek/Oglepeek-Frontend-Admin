import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DropdownInput } from "./DropdownInput";
import { TextInput } from "./TextInput";
import { useDispatch } from "react-redux";
import { saveFormData } from "../redux/formslice";
import { Button } from "@mui/material";

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
  const dispatch = useDispatch();

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

  const saveToRedux = (data: FormValues) => {
    console.log(data);
    dispatch(saveFormData(data));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(saveToRedux)}>
        <div className="grid grid-cols-3 gap-4 py-4">
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
        </div>
        <div>
          <Button type="submit">Add</Button>
        </div>
      </form>
    </div>
  );
};
