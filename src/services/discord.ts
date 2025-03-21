import type { DiscordEmbed, DiscordWebhookPayload, Values } from "@/types";
import { getUser, mapUser } from "./server";

export async function sendApplicationWebhook(
  data: Values,
  userId: string,
  isMinor = false
) {
  if (!process.env.DISCORD_WEBHOOK_URL)
    throw new Error("Discord webhook URL not configured");

  const user = await getUser(userId).then(mapUser);

  const embed: DiscordEmbed = {
    title: `${isMinor ? "! MINOR ! " : ""}New E-Kitten Application from ${
      data.name
    }`,
    description: `
      Actions: [Ban User](${process.env.VERCEL_URL}/api/ban?userId=${user.id}) | [Unban User](${process.env.VERCEL_URL}/api/unban?userId=${user.id})
    `,
    thumbnail: {
      url: user.image,
    },
    color: 0xff69b4,
    fields: [
      { name: "📝 Name", value: `${data.username}#${data.tag}`, inline: true },
      { name: "👴🏻 Age", value: data.age, inline: true },
      { name: "🎮 Rank", value: data.rank, inline: true },
      {
        name: "💭 Discord",
        value: `${user.discord?.username || "unknown"}`,
        inline: true,
      },
      { name: "✨ About yourself", value: data.about },
      { name: "💖 Why are you applying", value: data.why },
      { name: "⏰ Availability", value: data.availability },
      { name: "💬 Communication Style", value: data.communicationStyle },
      { name: "🎲 Gaming Preferences", value: data.gamingPreferences },
      { name: "💝 Date Expectations", value: data.dateExpectations },
    ],
    footer: {
      icon_url: user.image,
      text: `Submitted by ${user.discord?.username} (${user.discord?.id})`,
    },
    timestamp: new Date().toISOString(),
  };

  const payload: DiscordWebhookPayload = {
    embeds: [embed],
  };

  const response = await fetch(process.env.DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    console.log(response);
    throw new Error(`Failed to send webhook: ${response.statusText}`);
  }

  return response;
}
