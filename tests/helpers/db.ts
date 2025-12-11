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
	// Delete in correct order to respect foreign key constraints
	await prisma.comment.deleteMany();
	await prisma.like.deleteMany();
	await prisma.message.deleteMany();
	await prisma.conversation.deleteMany();
	await prisma.userAchievement.deleteMany();
	await prisma.achievement.deleteMany();
	await prisma.challengeParticipant.deleteMany();
	await prisma.challenge.deleteMany();
	await prisma.post.deleteMany();
	await prisma.progressPhoto.deleteMany();
	await prisma.weightEntry.deleteMany();
	await prisma.teamMember.deleteMany();
	await prisma.team.deleteMany();
	await prisma.refreshToken.deleteMany();
	await prisma.user.deleteMany();
}

/**
 * Setup test database
 * Run migrations and prepare database for testing
 */
export async function setupTestDatabase() {
	try {
		// Push schema to test database
		execSync("npx prisma db push", {
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
