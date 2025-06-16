import { Box, Container } from "@mui/material";
import { Nav } from "./Nav";
import { AddItemForm } from "./AddItemForm";

// type Props = {
// }

export const Admin = () => {
  return (
    <div>
      <Box className="flex">
        {/* Sidebar or Nav */}
        <Box className="w-1/4">
          <Nav />
        </Box>

        {/* Full width Form Area */}
        <Box className="w-full bg-neutral-100 p-6">
          <AddItemForm />
        </Box>
      </Box>
    </div>
  );
};
