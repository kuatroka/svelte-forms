export type Idea = {
	name: string;
	emoji: string;
	description: string;
	slug: string;
};

export const ideas: Idea[] = [
	{
		name: 'Idea 1',
		emoji: '🤔',
		description: 'This is an idea',
		slug: 'idea-1'
	},
	{
		name: 'Idea 2',
		emoji: '🤔',
		description: 'This is an idea',
		slug: 'idea-2'
	},
	{
		name: 'Idea 5',
		emoji: '🍞',
		description: 'This is an idea',
		slug: 'idea-5'
	},
	{
		name: 'Idea 3',
		emoji: '🤔',
		description: 'This is an idea',
		slug: 'idea-3'
	}
];

export default ideas;
