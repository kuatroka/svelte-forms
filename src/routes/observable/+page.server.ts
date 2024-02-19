let aapl = [
	{
		Date: new Date('2013-05-13'),
		Open: 64.501427,
		High: 65.414284,
		Low: 64.5,
		Close: 64.96286,
		Volume: 79237200
	},
	{
		Date: new Date('2013-05-14'),
		Open: 64.835716,
		High: 65.028572,
		Low: 63.164288,
		Close: 63.408573,
		Volume: 111779500
	},
	{
		Date: new Date('2013-05-15'),
		Open: 62.737144,
		High: 63.0,
		Low: 60.337143,
		Close: 61.264286,
		Volume: 185403400
	},
	{
		Date: new Date('2013-05-16'),
		Open: 60.462856,
		High: 62.549999,
		Low: 59.842857,
		Close: 62.082859,
		Volume: 150801000
	},
	{
		Date: new Date('2013-05-17'),
		Open: 62.721428,
		High: 62.869999,
		Low: 61.572857,
		Close: 61.894287,
		Volume: 106976100
	}
];

let goog = [
	{
		Date: new Date('2013-05-13'),
		Open: 64.501427,
		High: 65.414284,
		Low: 64.5,
		Close: 94.96286,
		Volume: 79237200
	},
	{
		Date: new Date('2013-05-14'),
		Open: 64.835716,
		High: 65.028572,
		Low: 63.164288,
		Close: 93.408573,
		Volume: 111779500
	},
	{
		Date: new Date('2013-05-15'),
		Open: 62.737144,
		High: 63.0,
		Low: 60.337143,
		Close: 91.264286,
		Volume: 185403400
	},
	{
		Date: new Date('2013-05-16'),
		Open: 60.462856,
		High: 62.549999,
		Low: 59.842857,
		Close: 92.082859,
		Volume: 150801000
	},
	{
		Date: new Date('2013-05-17'),
		Open: 62.721428,
		High: 62.869999,
		Low: 61.572857,
		Close: 91.894287,
		Volume: 106976100
	}
];

export async function load({ fetch }) {
	const response = await fetch('/data/congress.json');
	let congress = await response.json();

	// Parse 'birthday' as a Date
	congress = congress.map((member: any) => ({
		...member,
		birthday: new Date(member.birthday)
	}));

	return {
		congress,
		aapl,
		goog
	};
}
