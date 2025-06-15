import { Box, Container } from "@mui/material";
import { Nav } from "./Nav";

// type Props = {
// }

export const Admin = () => {
  return (
    <div>
      <Container maxWidth="xl">
        <Box sx={{ display: "flex" }}>
          <Nav />
        </Box>
      </Container>
    </div>
  );
};
