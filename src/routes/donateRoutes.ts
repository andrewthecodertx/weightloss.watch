import { Router } from "express";
import { DonateController } from "../controllers/DonateController";

const router = Router();
const donateController = new DonateController();

router.get("/donate", donateController.index);
router.get("/donate/thank-you", donateController.thankYou);

export default router;
