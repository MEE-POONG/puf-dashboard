import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                // Retrieve all AffiliateIncomeData records
                const incomeData = await prisma.affiliateIncomeData.findMany();
                res.status(200).json(incomeData);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching affiliate income data" });
            }
            break;
        case 'POST':
            try {
                // Create a new AffiliateIncomeData record
                const newIncomeData = await prisma.affiliateIncomeData.create({
                    data: req.body,
                });
                res.status(201).json(newIncomeData);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the affiliate income data" });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
