import "reflect-metadata";
import { Router } from "express";
import AuthController from "../controller/Auth.controller";
const router = Router();
router.post("/cadastrar", AuthController.cadastrar);
router.post("/entrar", AuthController.login);
export default router;
