import { CircularProgress } from "@mui/material";
import { GenericDataGrid } from "./GenericDataGrid";
import { useGetAllProductsQuery } from "../services/api";
import type { GridColDef } from "@mui/x-data-grid";

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
        style={{ width: 60, height: 40, objectFit: "cover", borderRadius: 4 }}
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
  const { data: allProducts, isLoading } = useGetAllProductsQuery();

  console.log("All Products:", allProducts);
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
        <GenericDataGrid
          rows={productData ? productData : []}
          columns={columns}
          pageSize={5}
          checkboxSelection={true}
        />
      )}
    </div>
  );
};
