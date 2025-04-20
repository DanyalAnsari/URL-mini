const { urlencoded, json, static } = require("express");
const ejsLayouts = require("express-ejs-layouts");
const path = require("path");
const cookieParser = require("cookie-parser");
const iconHelper = require("../utils/iconHelper");

const appConfig = (app) => {
  // View engine setup
  app.set("views", path.resolve(__dirname, "../src/views"));
  app.set("view engine", "ejs");

  // Layout setup - Add these lines in this exact order
  app.use(ejsLayouts);
  app.set("layout", path.join("layouts", "main")); // Correct path format

  // Middleware
  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.use(cookieParser());

  // Static files
  app.use(static(path.resolve(__dirname, "../public")));

  // Static assets configuration
  const staticAssets = [
    { route: "/css", dir: "../node_modules/bootstrap/dist/css" },
    { route: "/js", dir: "../node_modules/bootstrap/dist/js" },
    { route: "/icons", dir: "../node_modules/bootstrap-icons/font" },
  ];

  // Serve static assets
  staticAssets.forEach((asset) =>
    app.use(asset.route, static(path.resolve(__dirname, asset.dir)))
  );

  // Add to Express locals
  app.locals.iconHelper = iconHelper;
};

module.exports = appConfig;
