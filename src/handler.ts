import { APIInteractionResponse, InteractionType, InteractionResponseType, MessageFlags, APIMessageApplicationCommandGuildInteraction, APIPingInteraction, ComponentType, ButtonStyle } from "discord-api-types/v8";
import {verifyKey } from "discord-interactions";

export async function handleRequest(request: Request): Promise<Response> {
  const signature = request.headers.get("X-Signature-Ed25519");
  const timestamp = request.headers.get("X-Signature-Timestamp");

  const body = await request.text();

  if (!signature || !timestamp || !verifyKey(body, signature, timestamp, publicKey)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const interaction = JSON.parse(body) as APIPingInteraction | APIMessageApplicationCommandGuildInteraction;

  if (interaction.type === InteractionType.Ping) {
    return respond({ type: InteractionResponseType.Pong });
  }

  if (interaction.type === InteractionType.ApplicationCommand) {
    const  message = interaction.data.resolved.messages[interaction.data.target_id];
    const matches = [...message.content?.matchAll(/https:\/\/twitter\.com\/(\S+)/gm)];

    if (!matches.length) {
      return respond({
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          content: "❓ No Twitter embeds were found in this message.",
          flags: MessageFlags.Ephemeral
        }
      });
    }
  
    const fixedUrls = matches.map(([_, path]) => `https://fxtwitter.com/${path}`);

    return respond({
      type: InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: `${matches.length} embed${fixedUrls.length === 1 ? "" : "s"} from Twitter found:${"||​||".repeat(251)} ${fixedUrls.join(" ")}`,
        flags: MessageFlags.Ephemeral,
        components: [{
          type: ComponentType.ActionRow,
          components: [{
            type: ComponentType.Button,
            style: ButtonStyle.Link,
            label: "Invite this bot",
            url: "https://discord.com/oauth2/authorize?client_id=937220063935750184&scope=applications.commands"
          }]
        }]
      }
    });
  }

  return new Response("Unknown interaction", { status: 400 });
}

function respond(response: APIInteractionResponse): Response {
  return new Response(JSON.stringify(response), {
    headers: {
      "Content-Type": "application/json"
    },
    status: 200
  });
}
