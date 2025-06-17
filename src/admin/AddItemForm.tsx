import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextInput } from "./TextInput";
import { Button } from "@mui/material";
import { DropdownInput } from "./DropdownInput";

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
              label={"images"}
              defaultValue="images"
              {...register("images")}
              error={!!errors.images}
              helperText={errors.images?.message}
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
