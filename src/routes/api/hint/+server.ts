import { error, json, type RequestEvent } from "@sveltejs/kit";
import { generate as generateOpenai } from "$lib/hint/openai";
// import { generate as generateLlama2 } from "$lib/hint/llama2";
import { getDocs, where, collection, query, updateDoc, increment } from "firebase/firestore";
import { firestore } from "$lib/firebase";

async function handleCode(code: string, model: string) {
	switch (model) {
		// case "llama2":
		// 	return await generateLlama2(code);
		case "openai":
			return await generateOpenai(code);
		default:
			throw new Error("Invalid model");
	}
}

export const config = {
	runtime: "edge"
};

export async function POST({ request }: RequestEvent) {
	const { code, model, apiKey } = await request.json();

	const codehintCollection = collection(firestore, "codehint");
	const userQuery = query(codehintCollection, where("apiKey", "==", apiKey));
	const userDocs = await getDocs(userQuery);
	if (userDocs.empty) {
		throw error(400, "Invalid API key");
	}

	try {
		console.time("handleCode");
		const hint = await handleCode(code, model);
		console.timeEnd("handleCode");

		const userDoc = userDocs.docs[0].ref;
		updateDoc(userDoc, { credits: increment(-1) });

		return json(hint);
	} catch (e) {
		throw error(400, JSON.stringify(e));
	}
}
