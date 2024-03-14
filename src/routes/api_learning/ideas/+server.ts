import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import ideas from '$lib/data/ideas.js';

export const GET: RequestHandler = async () => {
	return json(ideas);
	// return new Response(JSON.stringify(ideas));
};

// export async function GET(requestEvent) {
// 	return json(ideas);
// }
