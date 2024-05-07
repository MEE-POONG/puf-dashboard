import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { id } = req.query;

    switch (method) {
        case 'GET':
            try {
                // Retrieve a single CalculateData record by ID
                const calculateData = await prisma.calculateData.findUnique({
                    where: {
                        id: id as string,
                    },
                });
                if (calculateData) {
                    res.status(200).json(calculateData);
                } else {
                    res.status(404).json({ error: "CalculateData record not found" });
                }
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the calculate data" });
            }
            break;
        case 'PUT':
            try {
                // Update a single CalculateData record by ID
                const updatedCalculateData = await prisma.calculateData.update({
                    where: {
                        id: id as string,
                    },
                    data: req.body,
                });
                res.status(200).json(updatedCalculateData);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while updating the calculate data" });
            }
            break;
        case 'DELETE':
            try {
                // Delete a single CalculateData record by ID
                await prisma.calculateData.delete({
                    where: {
                        id: id as string,
                    },
                });
                res.status(204).end();
            } catch (error) {
                res.status(500).json({ error: "An error occurred while deleting the calculate data" });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
