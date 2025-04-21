import { createRoot } from "react-dom/client";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./lib/store";
import "./index.css";
import "./lib/i18n";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider attribute="class" defaultTheme="dark">
      <App />
    </ThemeProvider>
  </Provider>
);
