
import {  getQtrStats  } from '$lib/server/db/sqlite';


export async function load({  url  }) {
	// depends('slider:quarter');	 

	let quarter_id = url.searchParams.get('quarter_id');
	let quarter = url.searchParams.get('quarter');
	console.log(`From +page.server.ts - var quarter_id: ${quarter_id}`);
	console.log(`From +page.server.ts - var quarter: ${quarter}`);
	console.log(`////////////////////////////////////////////`);
	// if (quarter === undefined) quarter = '';

	// let quarter_print = quarter;
	// if (quarter_print === undefined) quarter_print = 'UNEFINED';
	// if (quarter_print === "") quarter_print = 'EMPTY';

	const rows = getQtrStats(quarter?.toString());
	// console.log(`From +page.server.ts - var quarter: ${quarter_print},  'rows' from DB'- ${rows[0].quarter}` );

	return {
		rows,
		quarter_id,
		quarter,
	};
}
