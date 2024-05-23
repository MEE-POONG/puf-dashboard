import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                // Retrieve all AllianceData records
                const alliances = await prisma.allianceData.findMany();
                res.status(200).json(alliances);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching alliance data" });
            }
            break;
        case 'POST':
            try {
                // Create a new AllianceData record
                const alliance = await prisma.allianceData.create({
                    data: req.body,
                });
                res.status(201).json(alliance);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the alliance data" });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
