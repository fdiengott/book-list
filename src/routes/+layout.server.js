import { error } from '@sveltejs/kit';
import { PARSE_APP_ID, PARSE_HOST_URL, PARSE_REST_KEY } from '$env/static/private';

const parseHeaders = {
	'X-Parse-Application-Id': PARSE_APP_ID,
	'X-Parse-REST-API-Key': PARSE_REST_KEY,
	'Content-Type': 'application/json'
};

export async function load() {
	const res = await fetch(PARSE_HOST_URL + 'classes/Book', {
		headers: parseHeaders
	});

	if (res) {
		return res.json();
	}

	throw error(404, 'Not found');
}
