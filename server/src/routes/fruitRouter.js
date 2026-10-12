import express from "express";
import * as FruitController from "../controllers/fruitController.js";
import CheckAuth from "../utils/checkAuth.js";

const router = express.Router();

router.get("/allFruit", CheckAuth, FruitController.getAllFruit);
router.get("/", CheckAuth, FruitController.getFruits);
router.delete("/:id", CheckAuth, FruitController.deleteFruit);
router.post("/", CheckAuth, FruitController.addFruit);
router.put("/:id", CheckAuth, FruitController.updateFruit);

export default router;
