import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { execSync } from "child_process";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });

/**
 * Reset the test database
 * Truncates all tables to start with a clean state
 */
export async function resetDatabase() {
	// Get all table names
	const tables = await prisma.$queryRaw<
		Array<{ tablename: string }>
	>`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

	// Truncate all tables except Prisma migrations table
	for (const { tablename } of tables) {
		if (tablename !== "_prisma_migrations") {
			await prisma.$executeRawUnsafe(
				`TRUNCATE TABLE "public"."${tablename}" CASCADE;`,
			);
		}
	}
}

/**
 * Setup test database
 * Run migrations and prepare database for testing
 */
export async function setupTestDatabase() {
	try {
		// Push schema to test database
		execSync("npx prisma db push --skip-generate", {
			env: { ...process.env, DATABASE_URL: process.env.DATABASE_URL },
			stdio: "ignore",
		});
	} catch (error) {
		console.error("Failed to setup test database:", error);
		throw error;
	}
}

/**
 * Teardown test database connection
 */
export async function teardownTestDatabase() {
	await prisma.$disconnect();
	await pool.end();
}

/**
 * Seed test database with minimal data
 */
export async function seedTestData() {
	// Add common test data here if needed
	// For example, create a test user, etc.
}
