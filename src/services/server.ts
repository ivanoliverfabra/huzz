import type { MappedUser } from "@/types";
import { type User, auth, clerkClient } from "@clerk/nextjs/server";

export async function isAdmin(userOrUserId: User | string) {
	const user =
		typeof userOrUserId === "string"
			? await getUser(userOrUserId)
			: userOrUserId;
	if (
		user &&
		"role" in user.publicMetadata &&
		user.publicMetadata.role === "admin"
	)
		return true;
	return false;
}

export async function authenticateUser(): Promise<string> {
	const { userId } = await auth();
	if (!userId) throw new Error("UNAUTHENTICATED");
	return userId;
}

export async function authenticateAdmin(): Promise<string> {
	const { userId } = await auth();
	if (!userId) throw new Error("UNAUTHENTICATED");
	const isAdministrator = await isAdmin(userId);
	if (!isAdministrator) throw new Error("NO_PERMISSION");
	return userId;
}

export async function getUser(userId: string): Promise<User> {
	return (await clerkClient()).users.getUser(userId);
}

export async function banUser(userId: string) {
	return (await clerkClient()).users.banUser(userId);
}

export function mapUser(user: User): MappedUser {
	const userDiscord = user.externalAccounts.find(
		(a) => a.provider === "oauth_discord",
	);
	const mappedUserDiscord = userDiscord
		? {
				id: userDiscord.externalId,
				username: userDiscord.username,
			}
		: null;

	return {
		id: user.id,
		name: user.fullName || user.username || user.id,
		image: user.imageUrl,
		discord: mappedUserDiscord,
		banned:
			"banned" in user.publicMetadata
				? Boolean(user.publicMetadata.banned)
				: false,
	};
}
