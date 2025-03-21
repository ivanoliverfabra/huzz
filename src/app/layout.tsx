import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Huzz Finder",
	description: "Huzz Finder is a place to signup to be a e-kitten.",
	authors: [{ name: "Fabra" }],
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://huzz.fabra.me",
		title: "Huzz Finder",
		description: "Huzz Finder is a place to signup to be a e-kitten.",
		siteName: "Gabe",
	},
	twitter: {
		card: "summary_large_image",
		title: "Huzz Finder",
		description: "Huzz Finder is a place to signup to be a e-kitten.",
	},
	viewport: {
		width: "device-width",
		initialScale: 1,
	},
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en" suppressHydrationWarning>
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					{children}
					<Toaster />
				</body>
			</html>
		</ClerkProvider>
	);
}
