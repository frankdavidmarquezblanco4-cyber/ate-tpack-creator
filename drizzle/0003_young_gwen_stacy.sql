CREATE TABLE `lmsExports` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ateId` int NOT NULL,
	`userId` int NOT NULL,
	`lmsType` enum('moodle','canvas','blackboard') NOT NULL,
	`lmsUrl` text NOT NULL,
	`courseId` varchar(255) NOT NULL,
	`status` enum('pending','success','failed') NOT NULL DEFAULT 'pending',
	`exportedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `lmsExports_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`type` enum('download','share','rating','comment') NOT NULL,
	`ateId` int NOT NULL,
	`fromUserId` int,
	`message` text NOT NULL,
	`read` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ratings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ateId` int NOT NULL,
	`userId` int NOT NULL,
	`score` int NOT NULL,
	`comment` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ratings_id` PRIMARY KEY(`id`)
);
