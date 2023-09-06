import { error, json, type RequestEvent } from "@sveltejs/kit";
import { generate as generateOpenai } from "$lib/hint/openai";
import { generate as generateLlama2 } from "$lib/hint/llama2";
import { getDocs, where, collection, query } from "firebase/firestore";
import { firestore } from "$lib/firebase";

export async function POST({ request }: RequestEvent) {
	const { code, model, apiKey } = await request.json();

	const codehintCollection = collection(firestore, "codehint");
	const userQuery = query(codehintCollection, where("apiKey", "==", apiKey));
	const userDocs = await getDocs(userQuery);
	if (userDocs.empty) {
		throw error(400, "Invalid API key");
	}

	switch (model) {
		case "llama2":
			return json(await generateLlama2(code));
		case "openai":
			return json(await generateOpenai(code));
		default:
			throw error(400, "Invalid model");
	}
}
