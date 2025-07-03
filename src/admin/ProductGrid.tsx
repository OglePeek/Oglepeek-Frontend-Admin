import { CircularProgress } from "@mui/material";
import { GenericDataGrid } from "./GenericDataGrid";
import { useGetAllProductsQuery } from "../services/api";
import type { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { DialogBox } from "./DialogBox";
import { UpdateItemForm } from "./UpdateItemForm";

type ProductRow = {
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
  id: string;
};

type EditableProduct = {
  productName: string;
  frameStyle: string;
  description: string;
  lens: string;
  gender: string;
  material: string;
  productType: string;
  frameColor: string;
  frameType: string;
  instock: number;
  price: number;
  size: string;
  id: string;
  image: string;
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
  { field: "id", headerName: "ID", width: 100 },
];

export const ProductGrid = () => {
  const [openEditForm, setOpenEditForm] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<EditableProduct | null>(null);

  const { data: allProducts, isLoading } = useGetAllProductsQuery();

  console.log(selectedProduct);

  // const editProduct = (SelectedProductData: EditableProduct) => {
  //   setOpenEditForm(true);
  //   setSelectedProduct(SelectedProductData);
  // };

  const productData = allProducts?.flatMap((product) =>
    product.variants.map((variant) => ({
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
      id: variant._id,
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
          checkboxSelection={true}
          doubleClickFn={(row) => {
            const editable: EditableProduct = {
              productName: row.productName,
              frameStyle: row.frameStyle,
              description: "", // fallback or load from product if needed
              lens: row.lens,
              gender: row.gender,
              material: row.material,
              productType: row.productType,
              frameColor: row.frameColor,
              frameType: "", // fallback or load from product if needed
              instock: row.inStock,
              price: row.price,
              size: row.size,
              id: row.id,
              image: row.image,
            };
            setSelectedProduct(editable);
            setOpenEditForm(true);
          }}
        />
      )}

      {openEditForm && selectedProduct ? (
        <DialogBox
          title="Add Variant"
          fieldform={<UpdateItemForm productData={selectedProduct} />}
          openform={openEditForm}
          closeform={setOpenEditForm}
        />
      ) : null}
    </div>
  );
};
