import { doc, updateDoc, increment } from "firebase/firestore";
import { firestore } from "$lib/firebase";
import { error, json, type RequestEvent } from "@sveltejs/kit";
import Stripe from "stripe";

import { SECRET_STRIPE_KEY, SECRET_STRIPE_WEBHOOK } from "$env/static/private";

const stripe = new Stripe(SECRET_STRIPE_KEY, {
	apiVersion: "2023-08-16",
	httpClient: Stripe.createFetchHttpClient()
});

function toBuffer(ab: ArrayBuffer): Buffer {
	const buf = Buffer.alloc(ab.byteLength);
	const view = new Uint8Array(ab);
	for (let i = 0; i < buf.length; i++) {
		buf[i] = view[i];
	}
	return buf;
}

async function handleStripeEvent(event: Stripe.Event) {
	console.log(`Received Stripe event: ${event.type}`);

	switch (event.type) {
		case "checkout.session.completed":
			const client_reference_id = (event.data.object as Stripe.Checkout.Session)
				.client_reference_id;

			console.log(`Checkout session completed for ${client_reference_id}`);

			if (client_reference_id) {
				const userDoc = doc(firestore, "codehint", client_reference_id);
				updateDoc(userDoc, { credits: increment(100) });

				console.log(`Added 100 credits to ${client_reference_id}`);
			}
			break;
	}
}

export async function POST(event: RequestEvent) {
	const req = event.request;

	const _rawBody = await req.arrayBuffer();
	const payload = toBuffer(_rawBody);
	const signature = req.headers.get("stripe-signature")!;
	try {
		const event = stripe.webhooks.constructEvent(payload, signature, SECRET_STRIPE_WEBHOOK);
		handleStripeEvent(event);
	} catch (err) {
		throw error(500, JSON.stringify(err));
	}

	return json({ received: true });
}
