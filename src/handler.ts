import { APIInteractionResponse, APIInteraction, InteractionType } from "discord-api-types/v8";
import { verifyKey } from "discord-interactions";

export async function handleRequest(request: Request): Promise<Response> {
  const signature = request.headers.get("X-Signature-Ed25519");
  const timestamp = request.headers.get("X-Signature-Timestamp");

  const body = await request.text();

  if (!signature || !timestamp) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!verifyKey(body, signature, timestamp, publicKey)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const interaction = JSON.parse(body) as APIInteraction;

  if (interaction.type === InteractionType.Ping) {
    return respond({ type: 1 });
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
