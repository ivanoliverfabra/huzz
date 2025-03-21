export interface Values {
	name: string;
	age: string;
	username: string;
	tag: string;
	rank: string;
	about: string;
	why: string;
	availability: string;
	communicationStyle: string;
	gamingPreferences: string;
	dateExpectations: string;
}

export interface DiscordEmbed {
	title?: string;
	description?: string;
	color?: number;
	fields?: Array<{
		name: string;
		value: string;
		inline?: boolean;
	}>;
	thumbnail?: {
		url: string;
	};
	timestamp?: string;
	footer?: {
		text: string;
		icon_url?: string;
	};
}

export interface DiscordWebhookPayload {
	embeds: DiscordEmbed[];
}

export interface Result<T> {
	success: boolean;
	result?: T;
	error?: string;
}

export interface UserDiscord {
	id: string;
	username: string | null;
}

export interface MappedUser {
	id: string;
	name: string;
	image: string;
	discord: UserDiscord | null;
	banned: boolean;
}
