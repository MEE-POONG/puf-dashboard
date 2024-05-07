import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { id } = req.query;

    switch (method) {
        case 'GET':
            try {
                // Retrieve a single TotalWLData record by ID
                const totalData = await prisma.totalWLData.findUnique({
                    where: {
                        id: id as string,
                    },
                });
                if (totalData) {
                    res.status(200).json(totalData);
                } else {
                    res.status(404).json({ error: "TotalWLData record not found" });
                }
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the total WL data" });
            }
            break;
        case 'PUT':
            try {
                // Update a single TotalWLData record by ID
                const updatedTotalData = await prisma.totalWLData.update({
                    where: {
                        id: id as string,
                    },
                    data: req.body,
                });
                res.status(200).json(updatedTotalData);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while updating the total WL data" });
            }
            break;
        case 'DELETE':
            try {
                // Delete a single TotalWLData record by ID
                await prisma.totalWLData.delete({
                    where: {
                        id: id as string,
                    },
                });
                res.status(204).end();
            } catch (error) {
                res.status(500).json({ error: "An error occurred while deleting the total WL data" });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
