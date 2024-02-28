
import { tableData } from '$lib/server/db/faker/faker';

const filteredData = (tableData: any[], quarter?: string) => {
	return quarter === undefined ? tableData : tableData.filter((row: any) => row.quarter === quarter);
}

const maxQuarter = Math.max(...tableData.map((row: any) => Number(row.quarter.replace('Q', '')))).toString().replace(/^(\d{4})/, '$1Q');

export async function load({  url  }) {
	// depends('slider:quarter');	 
	console.log(maxQuarter)

	let quarter_id = url.searchParams.get('quarter_id');
	let quarter = url.searchParams.get('quarter')  || maxQuarter;
	console.log(`From +page.server.ts - var quarter_id: ${quarter_id}`);
	console.log(`From +page.server.ts - var quarter: ${quarter}`);
	console.log(`////////////////////////////////////////////`);
	// if (quarter === undefined) quarter = '';

	// let quarter_print = quarter;
	// if (quarter_print === undefined) quarter_print = 'UNEFINED';
	// if (quarter_print === "") quarter_print = 'EMPTY';

	const rows = filteredData(tableData, quarter);
	// console.log(`From +page.server.ts - var quarter: ${quarter_print},  'rows' from DB'- ${rows[0].quarter}` );

	return {
		rows,
		quarter_id,
		quarter,
	};
}
