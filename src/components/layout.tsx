import { FC } from "react";
import BaseProps from "../types/base-props";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Box } from "@chakra-ui/react";

export const Layout: FC<BaseProps> = ({ children }) => {
  return (
    <Box display="grid" gridTemplateRows="auto 1fr auto" minH="100vh">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </Box>
  );
};
