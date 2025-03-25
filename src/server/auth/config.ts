import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { DefaultSession, NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { db } from "@/server/db";
import {
	accounts,
	sessions,
	users,
	verificationTokens,
} from "@/server/db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";
import argon2 from "argon2";
import { env } from "@/env";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
	interface Session extends DefaultSession {
		user: {
			id: string;
			// ...other properties
			// role: UserRole;
		} & DefaultSession["user"];
	}

	// interface User {
	//   // ...other properties
	//   // role: UserRole;
	// }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const parsedCredentials = z.object({
					email: z.string().email(),
					password: z.string().min(8),
				}).parse(credentials);
				const user = await db.query.users.findFirst({
					where: eq(users.email, parsedCredentials.email),
				});
				if (!user) return null;
				const passwordsMatch = await argon2.verify(user.password, parsedCredentials.password);
				if (passwordsMatch) return user;
				return null;
			},
		}),
		/**
		 * ...add more providers here.
		 *
		 * Most other providers require a bit more work than the Discord provider. For example, the
		 * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
		 * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
		 *
		 * @see https://next-auth.js.org/providers/github
		 */
	],
	adapter: DrizzleAdapter(db, {
		usersTable: users,
		accountsTable: accounts,
		sessionsTable: sessions,
		verificationTokensTable: verificationTokens,
	}),
	session: {
		strategy: "jwt",
		maxAge: 7 * 24 * 60 * 60, // 7 days
	},
	callbacks: {
		session: ({ session, token }) => ({
			...session,
			user: {
				...session.user,
					id: token.id as string,
			},
		}),
		jwt: ({ token, user }) => {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
	},
	secret: env.AUTH_SECRET,
} satisfies NextAuthConfig;
