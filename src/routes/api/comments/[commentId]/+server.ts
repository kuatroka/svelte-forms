import comments from '$lib/data/comments.js';
import { json } from '@sveltejs/kit';

export async function GET(requestEvent) {
	const { params } = requestEvent;
	const { commentId } = params;
	const comment = comments.find((comment) => comment.id === Number(commentId));
	return json(comment);
}

export async function PATCH(requestEvent) {
	const { params, request } = requestEvent;
	const { commentId } = params;
	const { text } = await request.json();
	const comment = comments.find((comment) => comment.id === Number(commentId));
	if (!comment) {
		return json({ error: 'Comment not found' }, { status: 404 });
	}
	comment.text = text;
	return json(comment);
}

export async function DELETE(requestEvent) {
	const { params } = requestEvent;
	const { commentId } = params;
	const filteredComments = comments.filter((comment) => comment.id !== Number(commentId));
	if (filteredComments.length === comments.length) {
		return json({ error: 'Comment not found' }, { status: 404 });
	}
	comments.length = 0; // Clear the original array
	comments.push(...filteredComments); // Push the filtered comments back into the original array
	return json({ message: 'Comments deleted successfully' });
}
