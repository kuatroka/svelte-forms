
import {  getQtrStats,  } from '$lib/server/db/sqlite';

export async function load({  url, depends,  }) {
	depends('slider:quarter');	 

	let quarter = url.searchParams.get('quarter')?.toString() ?? '';
	console.log('quarter:', quarter);
	const rows =  getQtrStats(quarter);
	console.log(rows[0].quarter);

	return {
		rows
	};
}
