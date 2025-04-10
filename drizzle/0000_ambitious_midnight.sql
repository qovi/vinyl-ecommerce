CREATE TABLE `vinyl-ecommerce_account` (
	`userId` text(255) NOT NULL,
	`type` text(255) NOT NULL,
	`provider` text(255) NOT NULL,
	`providerAccountId` text(255) NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` integer,
	`token_type` text(255),
	`scope` text(255),
	`id_token` text,
	`session_state` text(255),
	PRIMARY KEY(`provider`, `providerAccountId`),
	FOREIGN KEY (`userId`) REFERENCES `vinyl-ecommerce_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `account_user_id_idx` ON `vinyl-ecommerce_account` (`userId`);--> statement-breakpoint
CREATE TABLE `vinyl-ecommerce_post` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(256),
	`createdById` text(255) NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer,
	FOREIGN KEY (`createdById`) REFERENCES `vinyl-ecommerce_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `created_by_idx` ON `vinyl-ecommerce_post` (`createdById`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `vinyl-ecommerce_post` (`name`);--> statement-breakpoint
CREATE TABLE `vinyl-ecommerce_session` (
	`sessionToken` text(255) PRIMARY KEY NOT NULL,
	`userId` text(255) NOT NULL,
	`expires` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `vinyl-ecommerce_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `session_userId_idx` ON `vinyl-ecommerce_session` (`userId`);--> statement-breakpoint
CREATE TABLE `vinyl-ecommerce_user` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text(255),
	`email` text(255) NOT NULL,
	`emailVerified` integer DEFAULT (unixepoch()),
	`image` text(255),
	`password` text(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `vinyl-ecommerce_verification_token` (
	`identifier` text(255) NOT NULL,
	`token` text(255) NOT NULL,
	`expires` integer NOT NULL,
	PRIMARY KEY(`identifier`, `token`)
);
--> statement-breakpoint
CREATE TABLE `vinyl-ecommerce_vinyls` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(256) NOT NULL,
	`image` text(256) NOT NULL,
	`price` integer NOT NULL,
	`description` text(256),
	`tracklist` text DEFAULT '[]',
	`createdAt` integer DEFAULT (unixepoch()),
	`updatedAt` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `vinyls_name_idx` ON `vinyl-ecommerce_vinyls` (`name`);--> statement-breakpoint
CREATE INDEX `vinyls_id_idx` ON `vinyl-ecommerce_vinyls` (`id`);