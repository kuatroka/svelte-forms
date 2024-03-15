// import { tableData } from '$lib/server/db/faker/faker';

import tableData from './static/data/tableData.json';
console.log('tableData', tableData.slice(0, 2));

interface TableDataItem {
	cik_name: string;
	cik: string;
	[key: string]: any; // This allows for other keys with any type, adjust as needed
}

const filterSortPaginateData = (
	data: TableDataItem[],
	{
		q = '',
		order_by = 'id',
		order_dir = 'asc',
		limit = 7,
		skip = 0
	}: {
		q?: string;
		order_by?: string;
		order_dir?: string;
		limit?: number;
		skip?: number;
	}
) => {
	// Filter based on search query
	let filteredData = data.filter(
		(item) =>
			item.cik_name.toLowerCase().includes(q.toLowerCase()) ||
			item.cik.toLowerCase().includes(q.toLowerCase())
	);

	// Sort data
	filteredData.sort((a, b) => {
		if (order_dir === 'asc') {
			return a[order_by] > b[order_by] ? 1 : -1;
		} else {
			return a[order_by] < b[order_by] ? 1 : -1;
		}
	});

	// Paginate data
	return filteredData.slice(skip, skip + limit);
};

const filterDataByQuery = (data: TableDataItem[], q: string): TableDataItem[] => {
	return data.filter(
		(item) =>
			item.cik_name.toLowerCase().includes(q.toLowerCase()) ||
			item.cik.toLowerCase().includes(q.toLowerCase())
	);
};

export const load = async ({ url }) => {
	const limit = Number(url.searchParams.get('limit')) || 7;
	const skip = Number(url.searchParams.get('skip')) || 0;
	const q = url.searchParams.get('q')?.toString() || '';
	const order_by = url.searchParams.get('order_by')?.toString() || 'cum_twrr_yahoo';
	const order_dir = url.searchParams.get('order_dir')?.toString() || 'desc';

	// Generate function to filter, sort, and paginate tableData

	const ciks = filterSortPaginateData(tableData, { q, order_by, order_dir, limit, skip });
	const totalFilteredEntries = filterDataByQuery(tableData, q).length;

	console.log('q', q);
	console.log('ciks', ciks.slice(0, 2));
	console.log('total_num_entries', totalFilteredEntries);
	/////////////////////////////////////////

	// console.log(`quarter_id: ${quarter_id}`);

	return {
		total_num_entries: totalFilteredEntries,
		ciks: ciks
	};
};
