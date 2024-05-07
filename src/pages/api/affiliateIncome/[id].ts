import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { id } = req.query;

    switch (method) {
        case 'GET':
            try {
                // Retrieve a single AffiliateIncomeData record by ID
                const incomeData = await prisma.affiliateIncomeData.findUnique({
                    where: {
                        id: id as string,
                    },
                });
                if (incomeData) {
                    res.status(200).json(incomeData);
                } else {
                    res.status(404).json({ error: "AffiliateIncomeData record not found" });
                }
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the affiliate income data" });
            }
            break;
        case 'PUT':
            try {
                // Update a single AffiliateIncomeData record by ID
                const updatedIncomeData = await prisma.affiliateIncomeData.update({
                    where: {
                        id: id as string,
                    },
                    data: req.body,
                });
                res.status(200).json(updatedIncomeData);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while updating the affiliate income data" });
            }
            break;
        case 'DELETE':
            try {
                // Delete a single AffiliateIncomeData record by ID
                await prisma.affiliateIncomeData.delete({
                    where: {
                        id: id as string,
                    },
                });
                res.status(204).end();
            } catch (error) {
                res.status(500).json({ error: "An error occurred while deleting the affiliate income data" });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
