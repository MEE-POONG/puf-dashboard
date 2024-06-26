import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { id } = req.query;

    switch (method) {
        case 'GET':
            try {
                // Retrieve a single AllianceData record by ID
                const alliance = await prisma.allianceData.findUnique({
                    where: {
                        id: id as string,
                    },
                });
                if (alliance) {
                    res.status(200).json(alliance);
                } else {
                    res.status(404).json({ error: "AllianceData record not found" });
                }
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the alliance data" });
            }
            break;
        case 'PUT':
            try {
                // Update a single AllianceData record by ID
                const updatedAlliance = await prisma.allianceData.update({
                    where: {
                        id: id as string,
                    },
                    data: req.body,
                });
                res.status(200).json(updatedAlliance);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while updating the alliance data" });
            }
            break;
        case 'DELETE':
            try {
                // Delete a single AllianceData record by ID
                await prisma.allianceData.delete({
                    where: {
                        id: id as string,
                    },
                });
                res.status(204).end();
            } catch (error) {
                res.status(500).json({ error: "An error occurred while deleting the alliance data" });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
