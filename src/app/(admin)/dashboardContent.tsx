"use client";

import type { User } from "next-auth";
import { signOut } from "next-auth/react";

type DashboardContentProps = {
	user: User;
};

export default function DashboardContent({ user }: DashboardContentProps) {
	return (
		<main className="p-4">
			<p>
				Wow <strong>{user.name}</strong> du er logget ind
				<button
					className="flex bg-amber-300"
					onClick={() => signOut()}
				>
					Log ud
				</button>
			</p>
		</main>
	);
}
