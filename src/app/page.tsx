"use client";

import { ApplicationForm } from "@/components/forms/application-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SignOutButton, SignedIn, SignedOut, useClerk } from "@clerk/nextjs";

export default function Home() {
	const clerk = useClerk();

	return (
		<div className="h-screen flex justify-center items-center">
			<SignedOut>
				<Card className="w-lg max-w-md relative animate-in fade-in-0 slide-in-from-bottom-5 duration-1000 shadow-lg border-2">
					<CardHeader className="pb-2">
						<CardTitle className="font-semibold">
							Welcome to the E-Kittens Application Portal
						</CardTitle>
						<CardDescription className="space-y-2 text-sm">
							<div>By signing in, you will be able to apply for the E-Kittens program and manage your application.</div>
							<div>We&rsquo;re sorry you have to login to apply, but there has been a lot of spam applications lately.</div>
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col items-center pb-6 pt-2">
						<div className="mb-4 text-center text-sm text-muted-foreground">
							Ready to start your E-Kittens journey?
						</div>
						<Button
							size="lg"
							className="w-3/4 transition-all hover:scale-105 active:scale-95"
							onClick={() => clerk.openSignIn()}
						>
							<span className="mr-2">Sign In</span> →
						</Button>
					</CardContent>
				</Card>
			</SignedOut>
			<SignedIn>
				<ApplicationForm />
				<div className="absolute bottom-0 right-0 m-4 p-4 flex items-center gap-4">
					<Button variant="outline" asChild>
						<SignOutButton>Sign Out</SignOutButton>
					</Button>
				</div>
			</SignedIn>
		</div>
	);
}
