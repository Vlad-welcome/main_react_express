import express from "express";
import * as AuthController from "../controllers/authController.js";
import * as AuthValidation from "../validations/authValidation.js";
import CheckAuth from "../utils/checkAuth.js";
import CheckValidationErr from "../validations/checkValidationErr.js";

import upload from "../utils/multerStorage.js";

const router = express.Router();

router.post(
  "/register",
  AuthValidation.registerValidation,
  CheckValidationErr,
  AuthController.register,
);
router.post("/login", AuthValidation.loginValidation, CheckValidationErr, AuthController.login);
router.get("/me", CheckAuth, AuthController.me);

router.post("/upload", CheckAuth, upload.single("image"), AuthController.uploadImage);
router.get("/check", AuthController.check);

export default router;
