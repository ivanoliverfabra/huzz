"use client";

import { ApplicationForm } from "@/components/forms/application-form";
import { Button } from "@/components/ui/button";
import { SignOutButton, SignedIn, SignedOut, useClerk } from "@clerk/nextjs";

export default function Home() {
	const clerk = useClerk();

	return (
		<div className="h-screen flex justify-center items-center">
			<SignedOut>
				<Button variant="outline" onClick={() => clerk.openSignIn()}>
					Sign In
				</Button>
			</SignedOut>
			<SignedIn>
				<ApplicationForm />
			</SignedIn>
			<div className="absolute bottom-0 right-0 m-4 p-4 flex items-center gap-4">
				<SignedIn>
					<Button variant="outline" asChild>
						<SignOutButton>Sign Out</SignOutButton>
					</Button>
				</SignedIn>
			</div>
		</div>
	);
}
