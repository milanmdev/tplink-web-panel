import "tailwindcss/tailwind.css";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "../components/AlertTemplate/index";
import { ChakraProvider } from "@chakra-ui/react";

import { NavModule } from "../components/nav";
import { HeadModule } from "../components/head";

function TPLinkWebPanel({ Component, pageProps }) {
  const alertOptions = {
    position: positions.BOTTOM_LEFT,
    timeout: 5000,
    offset: "10px",
    transition: transitions.SCALE,
  };

  return (
    <ChakraProvider>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        {/* Head */}
        <HeadModule />

        <div className="flex flex-col min-h-screen py-2 bg-brand">
          {/* Nav */}
          <NavModule />

          {/* Component */}
          <Component {...pageProps} />
        </div>
      </AlertProvider>
    </ChakraProvider>
  );
}

export default TPLinkWebPanel;
