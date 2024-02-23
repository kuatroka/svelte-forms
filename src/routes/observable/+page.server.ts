import * as aq from 'arquero';
import pl from 'nodejs-polars';
import duckdb from 'duckdb';
import { Database } from 'duckdb-async';
import { read } from '$app/server';

// const f = read('/static/data/aapl.csv');
// console.log(f);

// duckdb-async
async function seattle_csv_async() {
	const db = await Database.create(':memory:');
	db.exec('INSTALL arrow; LOAD arrow;');
	let sql = `select * from read_csv_auto("./static/data/seattle-weather.csv")`;
	const seattle = await db.all(sql);
	console.log(seattle.slice(0, 1));
	return seattle;
}

// duckdb-async
async function bls_csv_async() {
	const db = await Database.create(':memory:');
	let sql = `select * from read_csv_auto("./static/data/bls-metro-unemployment.csv")`;
	const bls = await db.all(sql);
	// console.log(bls.slice(0, 1));
	return bls;
}

async function traffic_csv_async() {
	const db = await Database.create(':memory:');
	let sql = `select date::date AS date, location, vehicles::integer AS vehicles from read_csv_auto("./static/data/traffic.csv")`;
	const traffic = await db.all(sql);
	// console.log(traffic.slice(0, 1));
	return traffic;
}

// duckdb-async
async function get_gistemp_csv_async() {
	const db = await Database.create(':memory:');
	let sql = `select * from read_csv_auto("./static/data/gistemp.csv")`;
	const gistemp = await db.all(sql);
	// console.log(gistemp.slice(0, 1));
	return gistemp;
}

// duckdb-async
async function get_penguins_csv_async() {
	const db = await Database.create(':memory:');
	let sql = `select * from read_csv_auto("./static/data/penguins.csv")`;
	const penguins = await db.all(sql);
	// console.log(penguins.slice(0, 1));
	return penguins;
}

// duckdb-async
async function get_aapl_csv_async() {
	const db = await Database.create(':memory:');
	let sql = `select Date, Open::float AS Open, High::float AS High, Low::float AS Low, Close::float AS Close, Volume::integer AS Volume from read_csv_auto("./static/data/aapl.csv")`;
	const rows = await db.all(sql);
	return rows;
	// console.log(rows.slice(0, 4));
}

async function get_goog_csv_async() {
	const db = await Database.create(':memory:');
	let sql = `select Date, Open::float AS Open, High::float AS High, Low::float AS Low, Close::float AS Close, Volume::integer AS Volume from read_csv_auto("./static/data/goog.csv")`;
	const rows = await db.all(sql);
	return rows;
	// console.log(rows.slice(0, 4));
}

async function get_alphabet_csv_async() {
	const db = await Database.create(':memory:');
	let sql = `select * from read_csv_auto("./static/data/alphabet.csv")`;
	const alphabet = await db.all(sql);
	// console.log(alphabet.slice(0, 4));
	return alphabet;
}

// standard duckdb

// async function get_aapl_csv(): Promise<[]> {
// 	const db2 = new duckdb.Database(':memory:');
// 	const conn = db2.connect();
// 	const query = (query: string) => {
// 		return new Promise<[]>((resolve, reject) => {
// 			conn.all(query, (err: Error | null, res: any) => {
// 				if (err) reject(err);
// 				resolve(res);
// 			});
// 		});
// 	};
// 	let sql = `select Date, Open::float AS Open, High::float AS High, Low::float AS Low, Close::float AS Close from read_csv_auto("./static/data/aapl.csv")`; // Use template literals correctly

// 	const data = await query(sql);
// 	// conn.close();
// 	console.log('data:', data.slice(0, 1));
// 	return data; // Return an object with entries property
// }

// const start5 = performance.now();
// get_aapl_csv();
// const end5 = performance.now();
// console.log(`Time to load: duckdb -  ${end5 - start5} milliseconds`);
///////////////////////////

// db2.all('select * from read_csv_auto("./static/data/aapl.csv")');

export async function load({ fetch }) {
	const response = await fetch('/data/congress.json');
	let congress = await response.json();

	// Parse 'birthday' as a Date
	congress = congress.map((member: any) => ({
		...member,
		birthday: new Date(member.birthday)
	}));

	// duckdb
	// const start5 = performance.now();
	// get_aapl_csv();
	// const end5 = performance.now();
	// console.log(`Time to load: duckdb -  ${end5 - start5} milliseconds`);
	// console.log(rows[0]);

	// duckdb-async
	const start6 = performance.now();
	get_aapl_csv_async();
	const end6 = performance.now();
	console.log(`Time to load: duckdb-async -  ${end6 - start6} milliseconds`);
	// console.log(rows[0]);

	// Use Arquero to read the CSV data
	const start2 = performance.now();
	const aaplData = (await aq.loadCSV('./static/data/aapl.csv', { header: true })).objects();
	const end2 = performance.now();
	console.log(`Time to load: arquero -  ${end2 - start2} milliseconds`);

	//  polars and csv
	const start = performance.now();
	const aaplDataPolars = pl.readCSV('./static/data/aapl.csv').toRecords();
	const end = performance.now();
	console.log(`Time to load: polars - ${end - start} milliseconds`);

	// polars 2
	// const start3 = performance.now();
	// const djDataPolars = pl
	// 	.readParquet('/Users/yo_macbook/Documents/app_data/TICKER_DATA_AV_NONADJ/DIA_AVNONADJ.parquet')
	// 	.toRecords();
	// const end3 = performance.now();
	// console.log(`Time to load: polars - ${end3 - start3} milliseconds`);

	const csvGOOGpath = '/data/goog.csv'; // Adjust the path as necessary
	const responseGOOG = await fetch(csvGOOGpath);
	const csvGOOG = await responseGOOG.text();
	const googData = aq.fromCSV(csvGOOG).objects();
	// console.log(googData.slice(0, 5));

	return {
		congress,
		// aapl,
		// goog,
		aaplData,
		googData,
		aaplDataPolars,
		// rows: await get_aapl_csv(),
		aapl: await get_aapl_csv_async(),
		goog: await get_goog_csv_async(),
		alphabet: await get_alphabet_csv_async(),
		penguins: await get_penguins_csv_async(),
		gistemp: await get_gistemp_csv_async(),
		bls: await bls_csv_async(),
		traffic: await traffic_csv_async(),
		seattle: await seattle_csv_async()
	};
}
