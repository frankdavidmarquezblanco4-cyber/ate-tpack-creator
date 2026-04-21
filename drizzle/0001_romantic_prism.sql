CREATE TABLE `ates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`accessCode` varchar(12) NOT NULL,
	`data` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ates_id` PRIMARY KEY(`id`),
	CONSTRAINT `ates_accessCode_unique` UNIQUE(`accessCode`)
);
