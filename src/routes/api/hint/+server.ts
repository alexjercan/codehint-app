import { error, json, type RequestEvent } from "@sveltejs/kit";
import { generate as generateOpenai } from "$lib/hint/openai";
import { generate as generateLlama2 } from "$lib/hint/llama2";

export async function POST({ request }: RequestEvent) {
	const { code, model } = await request.json();

	switch (model) {
		case "llama2":
			return json(await generateLlama2(code));
		case "openai":
			return json(await generateOpenai(code));
		default:
			throw error(400, "Invalid model");
	}
}
