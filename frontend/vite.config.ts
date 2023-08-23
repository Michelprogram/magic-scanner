import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default ({ mode }) => {
  process.env = Object.assign(process.env, loadEnv(mode, process.cwd(), ""));

  const conf = defineConfig({
    plugins: [react()],
  });

  if (process.env.APP_ENV == "MOBILE") {
    conf.plugins.push(basicSsl());
    conf.server = {
      https: true,
      proxy: {
        "/v1": {
          target: "http://192.168.1.20:3333",
        },
      },
    };
  } else if (process.env.APP_ENV == "DEV") {
    conf.server = {
      proxy: {
        "/v1": {
          target: "http://localhost:3333",
        },
      },
    };
  } else {
    conf.server = {
      proxy: {
        "/v1": {
          target: "https://magic-scanner-6f584b30ac80.herokuapp.com",
        },
      },
    };
  }

  return conf;
};
