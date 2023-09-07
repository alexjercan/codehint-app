import { error, json, type RequestEvent } from "@sveltejs/kit";
import { generate as generateOpenai } from "$lib/hint/openai";
import { generate as generateLlama2 } from "$lib/hint/llama2";
import { getDocs, where, collection, query, updateDoc, increment } from "firebase/firestore";
import { firestore } from "$lib/firebase";

async function handleCode(code: string, model: string) {
	switch (model) {
		case "llama2":
			return await generateLlama2(code);
		case "openai":
			return await generateOpenai(code);
		default:
			throw new Error("Invalid model");
	}
}

export async function POST({ request }: RequestEvent) {
	const { code, model, apiKey } = await request.json();

    console.log(code);

	const codehintCollection = collection(firestore, "codehint");
    console.log("1");
	const userQuery = query(codehintCollection, where("apiKey", "==", apiKey));
    console.log("2");
	const userDocs = await getDocs(userQuery);
    console.log("3");

	if (userDocs.empty) {
		throw error(400, "Invalid API key");
	}

    try {
        const hint = await handleCode(code, model);

        const userDoc = userDocs.docs[0].ref;
        updateDoc(userDoc, { credits: increment(-1) });

        return json(hint);
    } catch (e) {
        throw error(400, JSON.stringify(e));
    }
}
