import { Request, Response } from "express";

export class DonateController {
	/**
	 * GET /donate
	 * Donation page for supporting the project.
	 */
	public index = (_req: Request, res: Response): void => {
		res.render("donate/index", {
			title: "Support Weight Loss Watch",
			description: "Help us keep Weight Loss Watch free and ad-free by making a donation.",
		});
	};
}
