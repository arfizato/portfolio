/**
 * Icons use Material Symbols Outlined:
 * https://fonts.google.com/icons?icon.set=Material+Symbols
 */

export interface Project {
	slug: string;
	title: string;
	description: string;
	date: string;
	tags: string[];
	readTime: string;
	category: 'scholarly' | 'technical';
	image: { src: string; alt: string };
	cta: string;
}

export interface TimelineChapter {
	dateRange: string;
	color: 'primary' | 'secondary' | 'tertiary';
	title: { prefix: string; italic: string };
	description: string;
	detail: {
		icon: string;
		label: string;
		sub: string;
	};
	image: {
		src: string;
		alt: string;
		aspect: '4/3' | '3/4' | '1/1';
	};
}
