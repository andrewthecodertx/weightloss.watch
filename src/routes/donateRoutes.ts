import { Router } from "express";
import { DonateController } from "../controllers/DonateController";

const router = Router();
const donateController = new DonateController();

router.get("/donate", donateController.index);

export default router;
