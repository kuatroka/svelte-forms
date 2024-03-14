import { fail, redirect } from '@sveltejs/kit';

export const load = ({ url }) => {
	const q = url.searchParams;
	const q_data = Object.fromEntries(q);
	console.log(q_data);
	// Redirect to auth page if user is not logged in

	return {};
};

export const actions = {
	login: async ({ request, cookies, url }) => {
		const data = await request.formData();
		const username = data.get('username') as string;
		const password = data.get('password') as string;
		if (!username || !password) {
			return fail(400, { username, message: 'Missing username or password' });
		}
		cookies.set('username', username, { path: '/' });
		throw redirect(303, url.searchParams.get('redirectTo') || '/');
		// return { message: 'Logged in' };
	}
};
