import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                // Retrieve all CalculateData records
                const calculateData = await prisma.calculateData.findMany();
                res.status(200).json(calculateData);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching calculate data" });
            }
            break;
        case 'POST':
            try {
                // Create a new CalculateData record
                const newCalculateData = await prisma.calculateData.create({
                    data: req.body,
                });
                res.status(201).json(newCalculateData);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the calculate data" });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
