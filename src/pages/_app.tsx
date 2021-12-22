import type { AppProps } from "next/app";
import { createGlobalStyle, ThemeProvider } from "styled-components";

const theme = {
  breakpoints: {
    sm: 600,
  },
  colors: {
    background: "white",
    primary: {
      50: "#f0f9ff",
      100: "#e0f2fe",
      200: "#bae6fd",
      300: "#7dd3fc",
      400: "#38bdf8",
      500: "#0ea5e9",
      600: "#0284c7",
      700: "#0369a1",
      800: "#075985",
      900: "#0c4a6e",
    },
  },
};

const GlobalStyle = createGlobalStyle`
    html,
    body {
      padding: 0;
      margin: 0;
      font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
        Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      background: ${theme.colors.background};
    }
    a {
      color: inherit;
      text-decoration: none;
      margin-left: 1rem;
      color: ${theme.colors.primary[500]};
      &:hover {
        color: ${theme.colors.primary[600]};
        text-decoration: underline;
      }
    }

    * {
      box-sizing: border-box;
    }
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
