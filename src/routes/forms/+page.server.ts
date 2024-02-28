
import { tableData } from '$lib/server/db/faker/faker';

const filteredData = (tableData: any[], quarter?: string) => {
	return quarter === undefined ? tableData : tableData.filter((row: any) => row.quarter === quarter);
}

const uniqueQuarters = new Set(tableData.map(row => row.quarter));
const uniqueQuartersList = Array.from(uniqueQuarters).sort();

// console.log(uniqueQuartersList)

const maxQuarter = Math.max(...tableData.map((row: any) => Number(row.quarter.replace('Q', '')))).toString().replace(/^(\d{4})/, '$1Q');
const maxQuarterIndex = uniqueQuartersList.indexOf(maxQuarter);

export async function load({  url  }) { 
	// console.log(maxQuarter)
	

	let quarter_id: number = parseInt(url.searchParams.get('quarter_id') || '') || maxQuarterIndex;
	let quarter = uniqueQuartersList[quarter_id]  || maxQuarter;
	console.log(`From +page.server.ts - var quarter_id: ${quarter_id}`);
	console.log(`From +page.server.ts - var quarter: ${quarter}`);
	console.log(`////////////////////////////////////////////`);
	const rows = filteredData(tableData,
		 quarter
		 );
	rows.slice(0, 3).forEach(row => console.log(`Quarter: ${row.quarter}, Cik: ${row.cik}, Value: ${row.value}`));
	// console.log(`${rows.slice(0, 2)}`);


	return {
		rows,
		quarter_id,
		quarter,
		quarters: uniqueQuartersList
	};
}
