import type { MappedUser } from "@/types";
import { type User, auth, clerkClient, currentUser } from "@clerk/nextjs/server";

export function isAdmin(user: User) {
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

export async function authenticateAdmin(): Promise<User> {
	const user = await currentUser();
	if (!user) throw new Error("UNAUTHENTICATED");
	if (!isAdmin(user)) throw new Error("NO_PERMISSION");
	return user;
}

export async function getUser(userId: string): Promise<User> {
	return (await clerkClient()).users.getUser(userId);
}

export async function banUser(user: User) {
	return (await clerkClient()).users.banUser(user.id);
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
		banned: user.banned
	};
}
