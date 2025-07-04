import { CircularProgress } from "@mui/material";
import { GenericDataGrid } from "./GenericDataGrid";
import { useGetAllProductsQuery } from "../services/api";
import type { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { DialogBox } from "./DialogBox";
import { UpdateItemForm } from "./UpdateItemForm";

type ProductRow = {
  id: string;
  image: string;
  productName: string;
  frameStyle: string;
  lens: string;
  gender: string;
  material: string;
  productType: string;
  frameColor: string;
  inStock: number;
  price: number;
  size: string;
  variantId: string;
  productId: string;
};

export type Variant = {
  variantId?: string; // Optional if not used
  inStock: number;
  frameColor: string;
  price: number;
  size: number;
  hidden: boolean;
  images: File[]; // or string[] if URLs
};

type EditableProduct = {
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
    image: string;
  };
  variants: Variant[];
};

const columns: GridColDef[] = [
  {
    field: "image",
    headerName: "Image",
    width: 120,
    sortable: false,
    renderCell: (params) => (
      <img
        src={params.value}
        alt="variant"
        style={{
          width: 60,
          height: 40,
          objectFit: "cover",
          borderRadius: 4,
          marginTop: 5,
        }}
      />
    ),
  },
  { field: "productName", headerName: "Product Name", width: 180 },
  { field: "frameStyle", headerName: "Frame Style", width: 150 },
  { field: "lens", headerName: "Lens", width: 120 },
  { field: "gender", headerName: "Gender", width: 100 },
  { field: "material", headerName: "Material", width: 120 },
  { field: "productType", headerName: "Product Type", width: 150 },
  { field: "frameColor", headerName: "Frame Color", width: 150 },
  { field: "inStock", headerName: "Stock", width: 100 },
  { field: "price", headerName: "Price", width: 100 },
  { field: "size", headerName: "Size", width: 100 },
  { field: "productId", headerName: "ID", width: 250 },
];

export const ProductGrid = () => {
  const [openEditForm, setOpenEditForm] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<{
    productData: EditableProduct["productData"];
    variants: EditableProduct["variants"];
  } | null>(null);

  const { data: allProducts, isLoading } = useGetAllProductsQuery();

  console.log(allProducts);

  console.log(selectedProduct);

  // const editProduct = (SelectedProductData: EditableProduct) => {
  //   setOpenEditForm(true);
  //   setSelectedProduct(SelectedProductData);
  // };

  const productData = allProducts?.flatMap((product) =>
    product.variants.map((variant) => ({
      id: product._id,
      image: variant.images?.[0] ?? "",
      productName: product.name,
      frameStyle: product.frameStyle,
      lens: product.lens,
      gender: product.gender,
      material: product.material,
      productType: product.productType,
      frameColor: variant.frameColor,
      inStock: variant.inStock,
      price: variant.price,
      size: variant.size,
      variantId: variant._id,
      productId: product._id,
    }))
  );

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <GenericDataGrid<ProductRow>
          rows={productData ?? []}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row.variantId} // Ensure the id field is used for row identification
          checkboxSelection={true}
          doubleClickFn={(row) => {
            const editableProduct = {
              productId: row.productId,
              name: row.productName,
              frameStyle: row.frameStyle,
              description: "", // load if available
              lens: row.lens,
              gender: row.gender,
              material: row.material,
              productType: row.productType,
              frameType: "", // load if available
              image: row.image,
            };

            const variants = [
              {
                variantId: row.variantId,
                inStock: row.inStock,
                frameColor: row.frameColor,
                price: row.price,
                size: Number(row.size),
                hidden: false,
                images: [], // load if needed
              },
            ];

            setSelectedProduct({ productData: editableProduct, variants });
            setOpenEditForm(true);
          }}
        />
      )}

      {openEditForm && selectedProduct ? (
        <DialogBox
          title="Add Variant"
          fieldform={
            <UpdateItemForm
              productData={selectedProduct.productData}
              variants={selectedProduct.variants}
            />
          }
          openform={openEditForm}
          closeform={setOpenEditForm}
        />
      ) : null}
    </div>
  );
};
