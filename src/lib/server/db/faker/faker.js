import { faker } from '@faker-js/faker';

/**
 * Function to generate table data
 * @param {number} startYear, startYear - The number of entries to generate.
 * @param {number} endYear, startYear - The number of entries to generate.
 */


function randomDate(startYear, endYear) {
  const year = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
  const quarter = Math.floor(Math.random() * 4) + 1; // 1-4 for quarters
  const month = (quarter - 1) * 3 + 2; // End of quarter month
  const date = new Date(year, month + 1, 0); // Last day of the next month
  return date;
}

  

/**
 * Function to generate table data
 * @param {number} numEntries - The number of entries to generate.
 */
  // Function to generate table data
  export function generateTableData(numEntries) {
    const data = [];
    const uniqueCombinations = new Set();

    while (data.length < numEntries) {
        const quarterEndDate = randomDate(1999, 2023);
        const year = quarterEndDate.getFullYear();
        const month = quarterEndDate.getMonth() + 1; // getMonth() returns 0-11, so we add 1
        const quarter = Math.ceil(month / 3); // Calculate the quarter
        const cik = faker.number.int({ min: 1000000, max: 9999999 });
        const combination = `${cik}-${year}Q${quarter}`;

        if (!uniqueCombinations.has(combination)) {
            uniqueCombinations.add(combination);
            data.push({
                cik: cik,
                quarter: `${year}Q${quarter}`,
                quarter_end_date: quarterEndDate,
                value: faker.number.float({ min:1000, max: 10000000, fractionDigits: 2 }), 
                rank_value: faker.number.int({ min: 1, max: 10 }),
                cum_twrr_yahoo: faker.number.float({ min:1, max: 99, fractionDigits: 2 }),
                rank_cum_twrr_yahoo: faker.number.int({ min: 1, max: 10 }),
            });
        }
    }

    return data;
}

  // Generate and display data
export const tableData = generateTableData(1000);
// console.table(tableData.slice(0, 2));
// console.log(tableData.slice(0, 5));
// console.log(tableData.length);