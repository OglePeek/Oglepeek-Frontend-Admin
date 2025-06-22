import { Box } from "@mui/material";
import { Nav } from "./Nav";
import { AddItemForm } from "./AddItemForm";
import { GenericDataGrid } from "./GenericDataGrid";
import type { GridColDef } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

// type Props = {
// }

const cols: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "frameColor", headerName: "Frame Color", width: 150 },
  { field: "inStock", headerName: "In Stock", width: 150 },
  { field: "price", headerName: "Price", width: 110 },
  { field: "size", headerName: "Size", width: 110 },
];

export const Admin = () => {
  const variantVals = useSelector(
    (state: RootState) => state?.form?.addVariantForm
  );
  console.log(variantVals);

  const tablerows = variantVals?.map((item, index) => {
    return {
      id: index,
      frameColor: item.frameColor,
      inStock: item.inStock,
      price: item.price,
      size: item.size,
    };
  });

  return (
    <div className="w-full bg-amber-200">
      <Box className="flex flex-col-reverse">
        {/* Sidebar or Nav */}
        <Box className="w-1/4">
          <Nav />
        </Box>

        {/* Full width Form Area */}
        <Box className="w-full bg-neutral-100 p-6">
          <AddItemForm />
        </Box>
      </Box>

      <div className="p-4">
        <GenericDataGrid
          rows={tablerows ? tablerows : []}
          columns={cols}
          pageSize={5}
          checkboxSelection={true}
        />
      </div>
    </div>
  );
};
