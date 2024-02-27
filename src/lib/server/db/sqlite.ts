import { SQLITE_SHORT_PATH } from '$env/static/private';
import Database from 'better-sqlite3';
// import { Database } from "bun:sqlite";
import type { Totals, Cik, QtrStats } from './types';

// const db = new Database(SQLITE_FULL_PATH, { verbose: console.log, readonly: true }); // remove in prod
const db = new Database(SQLITE_SHORT_PATH, { readonly: true });

// ### Totals
export function getTotals(): Totals[] {
	const sql = `
    SELECT ttl_num_ciks AS ttl_ciks,
	ttl_num_assets AS ttl_assets,
	ttl_years,
	ttl_quarters,
	ttl_tr AS ttl_positions,
	last_full_qtr,
	last_full_value,
	last_load_date
	FROM totals
`;
	const stmnt = db.prepare(sql);
	const rows = stmnt.all();
	console.log(rows.slice(0, 2));
	console.log(rows.length);
	return rows as Totals[];
}

//  ### every quarter and value
export const getQtrStats = (quarter?: string): QtrStats[] => {
	const sql = `
	SELECT
	quarter,
	quarter_end_date,
	ttl_value_all_ciks_per_qtr,
	ttl_num_ciks_per_qtr,
	ttl_num_assets_all_ciks_per_qtr,
	ttl_num_positions_per_qtr,
	open_close_ratio,
	mean_curr_twrr_all_ciks_per_qtr_cons,
	mean_curr_twrr_all_ciks_per_qtr_yahoo,
	num_stopped_ciks,
	num_new_ciks,
	is_quarter_completed,
	ratio_new_stopped_cusips
	FROM every_qtr_twrr
	${quarter ? 'WHERE quarter = ?' : ''}
	ORDER BY quarter
	`;
	const stmnt = db.prepare(sql);
	const rows = quarter ? stmnt.all(quarter) : stmnt.all();
	// console.log(rows.slice(0,1));
	// console.log(rows.length);
	return rows as QtrStats[];
};

export function getCik(
	limit: number,
	q: string = '',
	skip: number,
	order_by: string,
	order_dir: string
): Cik[] {
	const sql = `
		SELECT
		COUNT(*) OVER () AS num_entries,
		id,
		l.cik,
		r.cik_name,
		cum_mean_twrr_per_cik_per_qtr_cons AS cum_twrr_cons,
		cum_mean_twrr_per_cik_per_qtr_yahoo AS cum_twrr_yahoo,
		(select count(*) from cik_md) AS initial_num_entries
		FROM every_cik_latest_qtr_stats l
		LEFT JOIN
		(SELECT cik, cik_name
		FROM cik_md) r
		ON l.cik = r.cik
		WHERE UPPER(cik_name) LIKE UPPER('%${q}%')
		ORDER BY ${order_by ? order_by : 'cik'} ${order_dir ? order_dir : 'ASC'}
		LIMIT $limit OFFSET $skip
	`;
	const stmnt = db.prepare(sql);
	const rows = stmnt.all({ limit,  skip });
	console.log(rows.slice(0, 2));
	console.log(rows.length);
	return rows as Cik[];
}

// export function getCikDetails(cik?: string, quarter?: string): Cik[] {
// 	const sql = `
//     SELECT
//         cik,
//         quarter,
//         ttl_value_per_cik_per_qtr AS value,
//         num_assets_per_cik_per_qtr AS num_assets,
//         mean_curr_twrr_per_cik_per_qtr_cons AS curr_twrr,
//         cum_mean_twrr_per_cik_per_qtr_cons AS cum_twrr
//     FROM every_cik_qtr_twrr
//     WHERE ($cik IS NULL OR cik = $cik) AND quarter = ${
// 			quarter ? '$quarter' : '(SELECT MAX(quarter) FROM every_cik_qtr_twrr)'
// 		}
// `;
// 	const stmnt = db.prepare(sql);
// 	const rows = stmnt.all({ cik, quarter });
// 	console.log(rows.slice(0, 2));
// 	console.log(rows.length);
// 	return rows as Cik[];
// }

// const sql = `
// SELECT
// l.cik AS cik,
// last_quarter,
// l.cik_name AS cik_name,
// cum_twrr,
// '/superinvestors/' || l.cik  || '/' || last_quarter as link
// FROM
// (SELECT cik, cik_name
// 	FROM cik_md) l
// LEFT JOIN
// (SELECT cik, MAX(quarter) AS last_quarter, cum_mean_twrr_per_cik_per_qtr_cons AS cum_twrr
// FROM every_cik_qtr_twrr
// GROUP BY cik) r
// ON l.cik = r.cik
// WHERE ($q IS NULL OR l.cik_name LIKE '%' || '${q}' || '%')
// LIMIT $limit OFFSET $skip
// `;
