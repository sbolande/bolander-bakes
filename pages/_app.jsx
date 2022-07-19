import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";

const theme = extendTheme({
  config: {
    initialColorMode: "system",
    useSystemColorMode: true,
  },
  styles: {
    global: {
      html: {
        overflowY: "overlay",
      },
      "body, textarea, .recipeModal": {
        "::-webkit-scrollbar": {
          width: "6px",
          height: "6px",
        },
        "::-webkit-scrollbar-track": {
          width: "8px",
          backgroundColor: "#2d3748",
        },
        "::-webkit-scrollbar-thumb": {
          background: "#a0aec0",
          borderRadius: "4px",
        },
      },
    },
  },
});

export default function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Bolander Bakes</title>
        <meta name="description" content="What's cookin' at my house?" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
