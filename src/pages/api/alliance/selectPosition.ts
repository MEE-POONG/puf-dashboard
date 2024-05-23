import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { position } = req.query;

    if (method === 'GET') {
        try {
            const alliances = await prisma.allianceData.findMany({
                where: { position: position as string },
            });
            res.status(200).json(alliances);
        } catch (error) {
            res.status(500).json({ error: "An error occurred while fetching alliance data by position" });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}