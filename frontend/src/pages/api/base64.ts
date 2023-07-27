import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.body) {
            const imageUrl = req.body;
            const imageUrlData = await fetch(imageUrl);
            const buffer = await imageUrlData.arrayBuffer();
            const stringifiedBuffer = Buffer.from(buffer).toString('base64');
            const contentType = imageUrlData.headers.get('content-type');
            const imageBase64 = `data:${contentType};base64,${stringifiedBuffer}`;
            return res.status(200).send(imageBase64);
        }
        return res.status(400).send("invalid or no URL!");
    }
    catch (error: any) {
        return res.status(500).send(error.message);
    }

}