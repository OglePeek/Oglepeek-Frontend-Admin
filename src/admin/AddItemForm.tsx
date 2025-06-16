import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextInput } from "./TextInput";
import { Button } from "@mui/material";

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
    colorName: yup.string().required(),
    inStock: yup.number().positive().integer().required(),
    images: yup.array().required(),
    price: yup.number().positive().integer().required(),
    size: yup.string().required(),
  })
  .required();

export const AddItemForm = () => {
  type FormValues = yup.InferType<typeof schema>;

  const {
    // register: function to register input elements
    register,
    // handleSubmit: function to handle form submission
    handleSubmit,
    // watch: function to watch values of form inputs
    watch,
    // formState: object containing information about form state
    formState: { errors, touchedFields }, // Destructure errors and touchedFields from formState
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      style: "",
      description: "",
      lens: "",
      gender: "",
      material: "",
      colorName: "",
      inStock: 0,
      images: [],
      price: 0,
      size: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data); // call api with submitted data
  };

  return (
    <>
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
            <TextInput
              label={"style"}
              {...register("style")}
              error={!!errors.style}
              helperText={errors.style?.message}
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
            />
          </div>

          <div>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};
