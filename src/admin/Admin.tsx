import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { DemoProvider, useDemoRouter } from "@toolpad/core/internal";
import { AddItemForm } from "./AddItemForm";

const NAVIGATION: Navigation = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "product",
    title: "Products",
    icon: <ShoppingCartIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }: { pathname: string }) {
  if (pathname === "/product") {
    return (
      <Box sx={{ py: 4, px: 6 }}>
        <Typography variant="h5" mb={2}>
          Add Product
        </Typography>
        <AddItemForm />
      </Box>
    );
  }
  // Default dashboard content
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h5">Welcome to the Dashboard</Typography>
    </Box>
  );
}

export const Admin = () => {
  const router = useDemoRouter("/dashboard");

  return (
    <DemoProvider>
      <AppProvider
        navigation={NAVIGATION}
        branding={{
          logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
          title: "OglePeek Admin",
          homeUrl: "/toolpad/core/introduction",
        }}
        router={router}
        theme={demoTheme}
        // window={demoWindow}
      >
        <DashboardLayout>
          <DemoPageContent pathname={router.pathname} />
        </DashboardLayout>
      </AppProvider>
    </DemoProvider>
  );
};
