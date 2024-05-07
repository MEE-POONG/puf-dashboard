import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { id } = req.query;

    switch (method) {
        case 'GET':
            try {
                // Retrieve a single ReportWLData record by ID
                const report = await prisma.reportWLData.findUnique({
                    where: {
                        id: id as string,
                    },
                });
                if (report) {
                    res.status(200).json(report);
                } else {
                    res.status(404).json({ error: "ReportWLData record not found" });
                }
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the report data" });
            }
            break;
        case 'PUT':
            try {
                // Update a single ReportWLData record by ID
                const updatedReport = await prisma.reportWLData.update({
                    where: {
                        id: id as string,
                    },
                    data: req.body,
                });
                res.status(200).json(updatedReport);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while updating the report data" });
            }
            break;
        case 'DELETE':
            try {
                // Delete a single ReportWLData record by ID
                await prisma.reportWLData.delete({
                    where: {
                        id: id as string,
                    },
                });
                res.status(204).end();
            } catch (error) {
                res.status(500).json({ error: "An error occurred while deleting the report data" });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
