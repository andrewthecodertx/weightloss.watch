import { NewsArticle, NewsFetchOptions, NewsFetchResult, NewsCategory } from "../types/news";

/**
 * News Service - Fetches fitness and nutrition news
 *
 * This is a stub implementation using mock data.
 * Replace with actual API calls when ready.
 *
 * Recommended APIs:
 * - RapidAPI Live Fitness and Health News: https://rapidapi.com/ri3habh/api/live-fitness-and-health-news
 * - NewsAPI.org (health category): https://newsapi.org/
 * - GNews.io (health topic): https://gnews.io/
 *
 * Environment variables needed for real implementation:
 * - NEWS_API_KEY: API key for your chosen news provider
 * - NEWS_API_URL: Base URL for the API
 */

// Mock data for development - replace with real API calls
const MOCK_ARTICLES: NewsArticle[] = [
	{
		id: "1",
		title: "New Study Reveals Best Time of Day for Exercise",
		description:
			"Research shows morning workouts may boost metabolism more effectively than evening sessions, according to a new study published in the Journal of Sports Medicine.",
		url: "https://example.com/morning-exercise-study",
		imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
		source: { id: "health-daily", name: "Health Daily" },
		author: "Dr. Sarah Johnson",
		publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
		category: "fitness",
	},
	{
		id: "2",
		title: "Mediterranean Diet Linked to Better Brain Health",
		description:
			"A long-term study of over 10,000 participants shows those following a Mediterranean diet had 25% lower risk of cognitive decline.",
		url: "https://example.com/mediterranean-brain-health",
		imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=300&fit=crop",
		source: { id: "nutrition-news", name: "Nutrition News" },
		author: "Michael Chen",
		publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
		category: "nutrition",
	},
	{
		id: "3",
		title: "Walking 10,000 Steps: Myth or Science?",
		description:
			"Experts weigh in on the popular fitness goal and whether it actually matters for your health. The answer may surprise you.",
		url: "https://example.com/walking-steps-myth",
		imageUrl: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&h=300&fit=crop",
		source: { id: "fitness-weekly", name: "Fitness Weekly" },
		author: "Emma Rodriguez",
		publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
		category: "fitness",
	},
	{
		id: "4",
		title: "Protein Timing: Does It Really Matter?",
		description:
			"Sports nutritionists debate whether the anabolic window is real and how protein timing affects muscle building.",
		url: "https://example.com/protein-timing",
		imageUrl: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
		source: { id: "muscle-science", name: "Muscle & Science" },
		author: "Dr. James Miller",
		publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
		category: "nutrition",
	},
	{
		id: "5",
		title: "Sleep and Weight Loss: The Overlooked Connection",
		description:
			"Getting less than 7 hours of sleep may sabotage your weight loss efforts. Here is what the latest research says.",
		url: "https://example.com/sleep-weight-loss",
		imageUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=300&fit=crop",
		source: { id: "wellness-today", name: "Wellness Today" },
		author: "Lisa Park",
		publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000), // 18 hours ago
		category: "weight-loss",
	},
	{
		id: "6",
		title: "High-Intensity Interval Training: A Complete Guide",
		description:
			"Everything you need to know about HIIT workouts, from benefits to proper form and recovery strategies.",
		url: "https://example.com/hiit-guide",
		imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop",
		source: { id: "fit-life", name: "Fit Life Magazine" },
		author: "Coach Alex Thompson",
		publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
		category: "exercise",
	},
];

export class NewsService {
	// API configuration - uncomment and set when integrating real API
	// private static apiKey = process.env.NEWS_API_KEY;
	// private static apiUrl = process.env.NEWS_API_URL;

	/**
	 * Fetch news articles
	 * Currently returns mock data - replace with actual API call
	 */
	static async fetchNews(options: NewsFetchOptions = {}): Promise<NewsFetchResult> {
		const { category, limit = 6, page = 1 } = options;

		// TODO: Replace with actual API call
		// Example implementation for RapidAPI:
		//
		// const response = await fetch(`${this.apiUrl}/news`, {
		//   headers: {
		//     "X-RapidAPI-Key": this.apiKey,
		//     "X-RapidAPI-Host": "live-fitness-and-health-news.p.rapidapi.com"
		//   }
		// });
		// const data = await response.json();
		// return this.transformApiResponse(data);

		// Filter by category if specified
		let articles = [...MOCK_ARTICLES];
		if (category) {
			articles = articles.filter((a) => a.category === category);
		}

		// Paginate
		const startIndex = (page - 1) * limit;
		const paginatedArticles = articles.slice(startIndex, startIndex + limit);

		return {
			articles: paginatedArticles,
			totalResults: articles.length,
			page,
			hasMore: startIndex + limit < articles.length,
		};
	}

	/**
	 * Get featured/top articles for homepage
	 */
	static async getFeaturedNews(limit = 3): Promise<NewsArticle[]> {
		const result = await this.fetchNews({ limit });
		return result.articles;
	}

	/**
	 * Get articles by category
	 */
	static async getNewsByCategory(
		category: NewsCategory,
		limit = 6
	): Promise<NewsArticle[]> {
		const result = await this.fetchNews({ category, limit });
		return result.articles;
	}

	/**
	 * Format relative time for display
	 */
	static formatRelativeTime(date: Date): string {
		const now = new Date();
		const diffMs = now.getTime() - date.getTime();
		const diffMins = Math.floor(diffMs / (1000 * 60));
		const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
		const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

		if (diffMins < 60) {
			return `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`;
		} else if (diffHours < 24) {
			return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
		} else if (diffDays < 7) {
			return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
		} else {
			return date.toLocaleDateString();
		}
	}
}
