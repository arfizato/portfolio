import { fail } from '@sveltejs/kit';
import { SPREADSHEET_URL } from '$env/static/private';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name')?.toString().trim();
		const email = data.get('email')?.toString().trim();
		const message = data.get('message')?.toString().trim();

		if (!name || !email || !message) {
			return fail(400, { error: 'All fields are required.', name, email, message });
		}

		try {
			const res = await fetch(SPREADSHEET_URL, {
				method: 'POST',
				body: JSON.stringify({
					timestamp: new Date().toISOString(),
					name,
					email,
					message
				})
			});

			if (!res.ok) {
				return fail(500, { error: 'Something went wrong. Please try again.', name, email, message });
			}

			return { success: true };
		} catch {
			return fail(500, { error: 'Something went wrong. Please try again.', name, email, message });
		}
	}
} satisfies Actions;
