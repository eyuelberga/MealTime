import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'




export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const session = await getServerSession(req, res, authOptions);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}files/${id}`, {
      headers: {
        Authorization: "Bearer " + session.user.accessToken,

      }
    });
    const contentType = response.headers.get('Content-Type');
    if (response.ok && contentType) {
      res.setHeader('Content-Type', contentType);
      const arrayBuffer = await response.arrayBuffer();
      return res.send(Buffer.from(new Uint8Array(arrayBuffer)));
    }
    const filePath = path.resolve('.', 'public/placeholder.jpg')
    const imageBuffer = fs.readFileSync(filePath)
    res.setHeader('Content-Type', 'image/jpg')
    return res.send(imageBuffer)

  }
  catch (error: any) {
    return res.status(500).send(error.message);
  }

}