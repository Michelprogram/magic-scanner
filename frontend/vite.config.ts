import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default ({ mode }) => {
  process.env = Object.assign(process.env, loadEnv(mode, process.cwd(), ""));

  // import.meta.env.VITE_NAME available here with: process.env.VITE_NAME
  // import.meta.env.VITE_PORT available here with: process.env.VITE_PORT

  if (process.env.APP_ENV == "DEV") {
    return defineConfig({
      plugins: [react(), basicSsl()],
      server: {
        https: true,
      },
    });
  } else {
    return defineConfig({
      plugins: [react()],
    });
  }
};
