import type { NextApiRequest, NextApiResponse } from 'next';

const booksDB = [
	{ id: 1, title: 'books one' },
	{ id: 2, title: 'books two' },
	{ id: 3, title: 'books three' },
];

// async
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method === 'GET') {
		let books = booksDB;

		const term = req.query.term as string;

		if (term) {
			books = books.filter((book) => book.title.toLowerCase().includes(term.toLowerCase()));
		}

		// await res.revalidate('./characters');

		res.status(200).json(books);
	}
}

type Data = BookType[];

type BookType = {
	id: number;
	title: string;
};
