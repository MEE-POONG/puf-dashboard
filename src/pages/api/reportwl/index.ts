import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                // Retrieve all ReportWLData records
                const reports = await prisma.reportWLData.findMany();
                res.status(200).json(reports);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching report data" });
            }
            break;
        case 'POST':
            try {
                // Create a new ReportWLData record
                const report = await prisma.reportWLData.create({
                    data: req.body,
                });
                res.status(201).json(report);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the report data" });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
