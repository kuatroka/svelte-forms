import { ideas } from '$lib/data/ideas';

export const load = async ({ url }) => {
	const limit = parseInt(url.searchParams.get('limit') || '50');

	return {
		ideas,
		meta: {
			title: 'Latest Ideas',
			description: 'The latest ideas from the Techy Cat community'
		}
	};
};
