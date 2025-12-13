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

	/**
	 * GET /donate/thank-you
	 * Thank you page after PayPal donation.
	 * PayPal passes query parameters: tx (transaction ID), amt (amount), st (status), cc (currency)
	 */
	public thankYou = (req: Request, res: Response): void => {
		// Extract PayPal query parameters
		const transactionId = req.query.tx as string | undefined;
		const amount = req.query.amt as string | undefined;
		const status = req.query.st as string | undefined;
		const currency = req.query.cc as string | undefined;
		const itemName = req.query.item_name as string | undefined;

		// Determine if payment was successful
		const isSuccess = !status || status.toLowerCase() === "completed";

		// Format amount for display
		let formattedAmount: string | undefined;
		if (amount) {
			const currencySymbol = currency === "USD" ? "$" : currency || "$";
			formattedAmount = `${currencySymbol}${parseFloat(amount).toFixed(2)}`;
		}

		res.render("donate/thank-you", {
			title: "Thank You for Your Donation",
			description: "Your donation helps keep Weight Loss Watch free and ad-free.",
			transactionId,
			amount: formattedAmount,
			rawAmount: amount,
			status,
			currency: currency || "USD",
			itemName,
			isSuccess,
		});
	};
}
