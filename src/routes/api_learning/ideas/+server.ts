import type { RequestHandler } from './$types';
import comments from '$lib/data/comments.js';

import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	return json([
		{ id: 1, name: 'Idea 1' },
		{ id: 2, name: 'Idea 2' },
		{ id: 3, name: 'Idea 3' }
	]);
	// return json(comments);
};
