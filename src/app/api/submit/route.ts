import { parseNum, tryCatch, tryCatchSync } from "@/lib/utils";
import { sendApplicationWebhook } from "@/services/discord";
import { banUser, isAdmin } from "@/services/server";
import type { Values } from "@/types";
import { currentUser } from "@clerk/nextjs/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();
const MIN_AGE = 18;

export async function POST(req: Request) {
	const [success, user] = await tryCatch(currentUser);
	if (!success || !user)
		return Response.json({ error: user instanceof Error ? user.message : "UNAUTHENTICATED" }, { status: 400 });

	const data = (await req.json()) as Values;
	const [isNumber, age] = tryCatchSync(() => parseNum(data.age));
	if (!isNumber)
		return Response.json({ error: age.message, param: "age" }, { status: 400 });
	if (age < MIN_AGE) {
		const [banSuccess] = await tryCatch(() => banUser(user));
		await tryCatch(() =>
			sendApplicationWebhook(data, "user_2ubqYRvkI8qDLHYtRy7DoQJ7Pyq", true),
		);
		if (!banSuccess)
			return Response.json({ error: "BAN_ERROR" }, { status: 400 });
		return Response.json(
			{ error: "AGE_MINIMUM", minimum: MIN_AGE },
			{ status: 400 },
		);
	}

	const cooldownKey = `submit_cooldown:${user}`;
	if (!isAdmin(user)) {
		const lastSubmission = await redis.get<string>(cooldownKey);

		if (lastSubmission) {
			const timeLeft = Math.ceil(
				(300000 - (Date.now() - Number.parseInt(lastSubmission))) / 1000,
			);
			return Response.json({ error: "COOLDOWN", timeLeft }, { status: 429 });
		}

		await redis.set(cooldownKey, Date.now().toString(), { ex: 300 });
	}

	try {
		await sendApplicationWebhook(data, "user_2ubqYRvkI8qDLHYtRy7DoQJ7Pyq");
		return Response.json({ success: true });
	} catch (error) {
		if (error && typeof error === "object" && "clerkError" in error && error.clerkError === true) {
			console.error("Clerk Error:", error, error.toString());
			if ("errors" in error && Array.isArray(error.errors)) {
				console.error("Clerk Errors", ...error.errors);
			}
		} else {
			console.error("Failed to send webhook:", error);
		}

		await redis.del(cooldownKey);
		return Response.json({ error: "WEBHOOK_ERROR" }, { status: 500 });
	}
}
