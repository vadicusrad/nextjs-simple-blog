import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        const db = client.db('node-blog');
        const { title, text, author } = req.body;

        const post = await db.collection('posts').insertOne({
            title,
            text,
            author
        });

        res.json(post);
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
};