import comments from '$lib/data/comments.js';
import { json } from '@sveltejs/kit';

export async function GET(requestEvent) {
	return json(comments); // return json(comments);
}

export async function POST(requestEvent) {
	const { request } = requestEvent;
	const { text } = await request.json();
	const newComment = {
		id: comments.length + 1,
		text
	};
	comments.push(newComment);
	return json(newComment, { status: 201 });
}
