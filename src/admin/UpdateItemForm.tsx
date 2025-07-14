import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextInput } from "./TextInput";
import { Button, IconButton } from "@mui/material";
import { DropdownInput } from "./DropdownInput";
import { useState } from "react";
import { DialogBox } from "./DialogBox";
import { AddVariantForm } from "./AddVariantForm";
import EditIcon from "@mui/icons-material/Edit";
import { useUpdateProductMutation } from "../services/api";
import { GenericDataGrid } from "./GenericDataGrid";
import type { GridColDef } from "@mui/x-data-grid";
import { EditVariantForm } from "./EditVariantForm";

type VariantRow = {
  id: string | number; // Unique identifier for the row
  variantId: string; // Optional if not used
  inStock: number;
  frameColor: string;
  price: number;
  size: string;
  hidden: boolean;
  images: string[]; // Assuming images are stored as URLs
};

type Variant = {
  variantId?: string; // Optional if not used
  inStock: number;
  frameColor: string;
  price: number;
  size: string;
  hidden: boolean;
  images: string[]; // or string[] if URLs
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
    productType: yup.string().required(),
    frameType: yup.string().required(),
  })
  .required();

export const UpdateItemForm = ({ productData, variants }: Props) => {
  const tablerows = variants?.map((item, index) => {
    return {
      id: index,
      variantId: item?.variantId ?? "",
      images: item.images,
      frameColor: item.frameColor,
      inStock: item.inStock,
      price: item.price,
      size: item.size,
      hidden: item.hidden,
    };
  });

  const [openVariantForm, setOpenVariantForm] = useState(false);
  const [openEditVariantForm, setOpenEditVariantForm] = useState(false);

  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  const handleEdit = (variant: Variant) => {
    setSelectedVariant(variant);
    setOpenEditVariantForm(true);
  };

  const cols: GridColDef[] = [
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.row.images?.[0] || ""}
          alt="product"
          style={{
            width: 60,
            height: 40,
            objectFit: "cover",
            borderRadius: 4,
          }}
        />
      ),
    },
    { field: "variantId", headerName: "Variant ID", width: 300 },
    { field: "frameColor", headerName: "Frame Color", width: 150 },
    { field: "inStock", headerName: "In Stock", width: 150 },
    { field: "price", headerName: "Price", width: 110 },
    { field: "size", headerName: "Size", width: 110 },
    { field: "hidden", headerName: "Hidden", width: 110 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <IconButton onClick={() => handleEdit(params.row)}>
          <EditIcon />
        </IconButton>
      ),
    },
  ];

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
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const [updateProduct] = useUpdateProductMutation();

  const updateExistingProduct = (data: FormValues) => {
    updateProduct({ body: data })
      .unwrap()
      .then((res) => {
        console.log("Product Updated:", res);
        alert(res?.data?.message);
      })
      .catch((err) => {
        console.error("Error adding item:", err);
        alert(err?.data?.message);
      });
  };

  const openDialog = () => {
    setOpenVariantForm(true);
  };

  //   const clearForm = () => {
  //     reset();
  //     dispatch(resetFormData());
  //   };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(updateExistingProduct)}>
          <div className="grid grid-cols-3 gap-4 p-4">
            <>
              <TextInput
                label={"ProductId"}
                {...register("id")}
                error={!!errors.id}
                helperText={errors.id?.message}
                slotProps={{ input: { readOnly: true } }}
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
                {...register("description")}
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

          <div className="grid grid-cols-5 justify-items-start">
            <div className=" py-4">
              <Button variant="contained" type="button" onClick={openDialog}>
                Add Variant
              </Button>
            </div>
            <div className=" py-4">
              <Button variant="contained" type="submit">
                Update Product
              </Button>
            </div>
            {/* <div className=" py-4">
              <Button variant="contained" type="button" onClick={clearForm}>
                Clear
              </Button>
            </div> */}
          </div>
        </form>
      </FormProvider>

      <div>
        {openVariantForm ? (
          <>
            <DialogBox
              title="Add Variant"
              fieldform={<AddVariantForm productId={productData?.productId} />}
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
          checkboxSelection={false}
          getRowId={(row) => row.variantId}
        />
      </div>

      {openEditVariantForm && selectedVariant && (
        <DialogBox
          title="Edit Variant"
          openform={openEditVariantForm}
          closeform={setOpenEditVariantForm}
          fieldform={
            <EditVariantForm
              variant={selectedVariant}
            />
          }
        />
      )}
    </>
  );
};
