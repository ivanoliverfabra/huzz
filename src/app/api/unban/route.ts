import { tryCatch } from "@/lib/utils";
import { authenticateAdmin, mapUser } from "@/services/server";
import { clerkClient } from "@clerk/nextjs/server";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const [success, userId] = await tryCatch(authenticateAdmin);
	if (!success)
		return NextResponse.json({ error: userId.message }, { status: 400 });

	const banId = req.nextUrl.searchParams.get("userId");
	if (!banId?.trim())
		return NextResponse.json({ error: "INCORRECT_PARAMS" }, { status: 400 });

	const [clerkSuccess, clerk] = await tryCatch(clerkClient);
	if (!clerkSuccess)
		return NextResponse.json({ error: clerk.message }, { status: 400 });

	const [banSuccess, banUser] = await tryCatch(() =>
		clerk.users.unbanUser(banId),
	);
	if (!banSuccess)
		return NextResponse.json({ error: banUser.message }, { status: 400 });

	const user = mapUser(banUser);

	return NextResponse.json({
		user,
	});
}
