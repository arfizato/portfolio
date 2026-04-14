import type { TimelineChapter } from './types';

export const timeline: TimelineChapter[] = [
	{
		dateRange: '2016 — 2020',
		color: 'primary',
		title: { prefix: 'The Binary', italic: 'Origins' },
		description:
			"It began with a Bachelor's in Computer Science. My world was defined by syntax and logic. I learned that data wasn't just numbers—it was a language waiting to be translated into meaning. This academic rigor shaped my obsession with structural integrity.",
		detail: {
			icon: 'school',
			label: 'BSc Computer Science',
			sub: 'Focus: Algorithmic Efficiency'
		},
		image: {
			src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPVWgBttZ2q2sQmAMboe_fVxM97j96o_gUSEEwhdhxNmWn2SVoWRQJfZevFiRqIPQ_mIe07rpmPjKLSnRbWSV9hgm5T6YzvtvKwjhd1bDYq0uFB9JEysOluZhDGP_Kt8pCW1gOZ1IGlbQrnFVC56XvvT0PZIj7yPCV6N1v1ygJVQzlmxPuY7oHZNhPX03pCJLnc3OioxFEaPpNTBAaEbSK1LoE7WohjT77NRPvS8z4ZKGoz2jKDTN7bcRpJethjSH4gNzQWrMJtq8',
			alt: 'Vintage university library with tall wooden shelves and a single focused student',
			aspect: '4/3'
		}
	},
	{
		dateRange: '2021 — 2022',
		color: 'secondary',
		title: { prefix: 'Scaling', italic: 'Perspectives' },
		description:
			"Transitioning to a Master's in Big Data Analytics shifted my focus from micro-logic to macro-patterns. I learned to navigate the noise of massive datasets, finding the signal that drives strategic decisions. It was here I realized that data is the ultimate storyteller.",
		detail: {
			icon: 'data_exploration',
			label: 'MSc Big Data Analytics',
			sub: 'Specialization: Machine Learning'
		},
		image: {
			src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKWtFoEcwQwVKtXxUKzDlEG5A0ew24nTUhNc8uPHXpkWRqpNN15xwgqjFYDgJWyUuZCP2z9DX6OhAJ4dSXalf6tS6pzTuV3gkatjgXLIHJJLBOw38q6zUdEu2bb5DnWgQnZ7Za3553YHO11kYmVLWNz49nLvc0ZtV-0wy8eF0ULC_wC1PUsqEK1faSTt1n3M-ySRG4S1BgfIa8WN8ovjJgVZbQrB34TU-9rUGQvv7MLEQNIqX3jKq0vmEf235cWOelsBlEgafnap4',
			alt: 'Abstract network of glowing blue nodes and connecting lines representing big data scale',
			aspect: '4/3'
		}
	},
	{
		dateRange: '2023 — Present',
		color: 'tertiary',
		title: { prefix: 'The Amsterdam', italic: 'Synthesis' },
		description:
			"Moving to Amsterdam wasn't just a change of location; it was a change of rhythm. The city's blend of historic charm and cutting-edge tech innovation became my new home. Today, I work as a Data Analyst, bridging the gap between technical complexity and business intelligence.",
		detail: {
			icon: 'location_city',
			label: 'Living & Working',
			sub: 'Amsterdam, NL'
		},
		image: {
			src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3A67SCeaEtV8VUB7fUQ3n2-iicz2GZVONJN7mUdFg3TY_1xYH7Zg2aO_UbFgQwripPWklx5D8VO7cA9U6JzyHxpaghtRyJ8fOxF4L-G2HGKTUNfCKaEREV6vagbWmg2Q9jHh1IPxWj5CC7OIFOyThemmL8WD-wkFYwT7XS0DW1rQw6nHimfI-vNLGjtct8CfhjA4UjB5lz9d1IZt4WiGLHZC2QKdIINn80-puR2EEN0uW_OV--1wAKCK9FLYlS87eZmDvWz_5tFc',
			alt: 'A foggy morning over an Amsterdam canal with bicycles parked on a bridge',
			aspect: '1/1'
		}
	}
];
