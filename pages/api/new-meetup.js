
// POST /api/new-meetup

import { MongoClient } from "mongodb";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        // const { title, image, address, description } = req.body;

        const client = await MongoClient.connect(`mongodb+srv://1992vishukumar:2gsF4CHrdjejF2lJ@cluster0.e6eizds.mongodb.net/meetups?retryWrites=true&w=majority`);
        const db = client.db();
        const meetupsCollection = db.collection('meetups');
        const result = await meetupsCollection.insertOne(req.body);

        res.status(201).json({ message: 'Meetup added!' });

    }
};

export default handler;