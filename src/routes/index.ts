import { Router } from "express";
import homeRoutes from "./homeRoutes";
import authRoutes from "./authRoutes";
import webAuthRoutes from "./webAuthRoutes";
import dashboardRoutes from "./dashboardRoutes";
import profileRoutes from "./profileRoutes";
import weightRoutes from "./weightRoutes";
import teamRoutes from "./teamRoutes";
import settingsRoutes from "./settingsRoutes";
import { SettingsController } from "../controllers/SettingsController";
import { WeightController } from "../controllers/WeightController";
import { authenticate } from "../middleware/auth";
import { webAuthenticate } from "../middleware/webAuth";

const router = Router();

// Mount routes
router.use("/", homeRoutes);
router.use("/", webAuthRoutes); // Web auth pages (login, register, logout)
router.use("/api/auth", authRoutes); // API auth endpoints (JSON)
router.post("/api/settings/theme", authenticate, SettingsController.updateTheme); // API theme update
router.delete("/photo/:photoId", webAuthenticate, WeightController.deletePhoto); // Delete progress photo
router.use("/dashboard", dashboardRoutes);
router.use("/profile", profileRoutes);
router.use("/progress", weightRoutes);
router.use("/teams", teamRoutes);
router.use("/", settingsRoutes); // Settings routes

// 404 handler
router.use((_req, res) => {
	res.status(404).render("errors/404", {
		title: "Page Not Found",
		message: "The page you are looking for does not exist.",
		user: res.locals.user,
	});
});

export default router;
