import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                // Retrieve all ReferFriendData records
                const referFriendData = await prisma.referFriendData.findMany();
                res.status(200).json(referFriendData);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching refer friend data" });
            }
            break;
        case 'POST':
            try {
                // Create a new ReferFriendData record
                const newReferFriendData = await prisma.referFriendData.create({
                    data: req.body,
                });
                res.status(201).json(newReferFriendData);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the refer friend data" });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
