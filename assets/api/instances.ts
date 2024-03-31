import axios from 'axios';

export const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const instanceRick = axios.create({
	baseURL: process.env.NEXT_PUBLIC_RICK_API_URL,
});
