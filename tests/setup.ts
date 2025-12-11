import { config } from "dotenv";
import path from "path";

// Load test environment variables FIRST (before any other imports)
// Use override to ensure test values take precedence
config({ path: path.resolve(__dirname, "../.env.test"), override: true });

// Set test environment
process.env.NODE_ENV = "test";

// Only set DATABASE_URL if not already set (allows CI to override)
if (!process.env.DATABASE_URL) {
	process.env.DATABASE_URL =
		"postgresql://devuser:devpassword@localhost:5433/testdb?schema=public";
}
