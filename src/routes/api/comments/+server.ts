import comments from '$lib/data/comments.js';
import { json } from '@sveltejs/kit';

export async function GET(requestEvent) {
	return json(comments); // return json(comments);
}
