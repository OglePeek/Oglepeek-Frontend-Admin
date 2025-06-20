import { Box } from "@mui/material";
import { Nav } from "./Nav";
import { AddItemForm } from "./AddItemForm";
import { GenericDataGrid } from "./GenericDataGrid";
import type { GridColDef } from "@mui/x-data-grid";

// type Props = {
// }

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 32 },
  { id: 6, lastName: "Melisandre", firstName: "Chiara", age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const cols: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "firstName", headerName: "First name", width: 150 },
  { field: "lastName", headerName: "Last name", width: 150 },
  { field: "age", headerName: "Age", width: 110 },
];

export const Admin = () => {
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
          rows={rows}
          columns={cols}
          pageSize={5}
          checkboxSelection={true}
        />
      </div>
    </div>
  );
};
