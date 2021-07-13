import express from "express";
import {
  createNewCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "./controllers/category.js";
import {
  createNewDrug,
  deletedrug,
  getDrugById,
  getDrugs,
  updatedrug,
} from "./controllers/drug.js";
import { authUser, getUsers, registerUser } from "./controllers/user.js";

export default (app) => {
  const apiRoutes = express.Router();
  const authRoutes = express.Router();
  const dataRoutes = express.Router();

  apiRoutes.use("/data", dataRoutes);
  apiRoutes.use("/auth", authRoutes);

  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  //   Home route
  app.get("/", (req, res) =>
    res.json({
      note: "Welcome",
      message: "Home of the drug inventory",
    })
  );

  //   data routes

  //   category
  dataRoutes.route("/category").get(getCategory).post(createNewCategory);
  dataRoutes.route("/category/:id").put(updateCategory).delete(deleteCategory);

  //   drug
  dataRoutes.route("/drugs").get(getDrugs).post(createNewDrug);
  dataRoutes
    .route("/drug/:id")
    .get(getDrugById)
    .delete(deletedrug)
    .put(updatedrug);

  //   auth

  authRoutes.route("/users").get(getUsers).post(registerUser);
  authRoutes.route("/login").post(authUser);

  return app.use("/api", apiRoutes);
};
