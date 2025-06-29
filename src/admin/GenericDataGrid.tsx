// components/GenericDataGrid.tsx
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

type GenericDataGridProps<T extends { id: number | string }> = {
  rows: T[];
  columns: GridColDef<T>[];
  pageSize?: number;
  checkboxSelection?: boolean;
};

export function GenericDataGrid<T extends { id: number | string }>({
  rows,
  columns,
  pageSize = 5,
  checkboxSelection = true,
}: GenericDataGridProps<T>) {
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize,
            },
          },
        }}
        pageSizeOptions={[pageSize]}
        checkboxSelection={checkboxSelection}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
