import { PARSE_APP_ID, PARSE_HOST_URL, PARSE_REST_KEY } from '$env/static/private';

const parseHeaders = {
	'X-Parse-Application-Id': PARSE_APP_ID,
	'X-Parse-REST-API-Key': PARSE_REST_KEY,
	'Content-Type': 'application/json'
};

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const title = formData.get('title');
		const author = formData.get('author');
		const book = { Title: title, Author: author };

		await fetch(PARSE_HOST_URL + 'classes/Book', {
			headers: parseHeaders,
			method: 'POST',
			body: JSON.stringify(book),
			mode: 'no-cors'
		});
	}
};
