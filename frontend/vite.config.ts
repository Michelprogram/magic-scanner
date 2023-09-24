import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { VitePWA } from "vite-plugin-pwa";

export default ({ mode }) => {
  process.env = Object.assign(process.env, loadEnv(mode, process.cwd(), ""));

  const conf = defineConfig({
    plugins: [react()],
  });

  const assets = [
    "favicon.ico",
    "apple-touch-icon-180x180.png",
    "maskable-icon-512x512.png",
  ];

  const manifest = {
    name: "Scan magic the gathering",
    short_name: "Scan mgtr",
    description: "Scan magic the gathering",
    theme_color: "#ffffff",
    icons: [
      {
        src: "pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };

  if (process.env.APP_ENV == "MOBILE") {
    conf.plugins.push(basicSsl());
    conf.plugins.push(
      VitePWA({
        registerType: "autoUpdate",
        devOptions: { enabled: true },
        manifest,
        includeAssets: assets,
      })
    );
    conf.server = {
      https: true,
      proxy: {
        "/v1": {
          target: "http://192.168.1.20:3333",
        },
      },
    };
  } else if (process.env.APP_ENV == "DEV") {
    conf.plugins.push(
      VitePWA({
        registerType: "autoUpdate",
        devOptions: { enabled: true },
        manifest,
        includeAssets: assets,
      })
    );
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
