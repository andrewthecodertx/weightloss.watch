import { Request, Response } from "express";

export class HomeController {
	/**
	 * GET /
	 * Home page.
	 * Redirects to dashboard if user is already logged in.
	 */
	public index = (_req: Request, res: Response): void => {
		// If user is already logged in, redirect to dashboard
		if (res.locals.user) {
			res.redirect("/dashboard");
			return;
		}

		res.render("home/index", {
			title: "Welcome",
		});
	};
}
