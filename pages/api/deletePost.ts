import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(req.query);
    try {
        const client = await clientPromise;
        const db = client.db('posts');
        const { id } = req.query as unknown as ObjectId;
        console.log(id);
        // let id = new ObjectId(context.params.id);
        const post = await db.collection('posts').deleteOne({
            _id: id,
        });

        res.json(post);
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
};
