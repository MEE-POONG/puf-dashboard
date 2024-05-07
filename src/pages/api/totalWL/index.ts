import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                // Retrieve all TotalWLData records
                const totalData = await prisma.totalWLData.findMany();
                res.status(200).json(totalData);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching total WL data" });
            }
            break;
        case 'POST':
            try {
                // Create a new TotalWLData record
                const newTotalData = await prisma.totalWLData.create({
                    data: req.body,
                });
                res.status(201).json(newTotalData);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the total WL data" });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
