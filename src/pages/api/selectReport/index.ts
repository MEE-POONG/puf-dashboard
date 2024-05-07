import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                // Fetch all SelectReportData records
                const reports = await prisma.selectReportData.findMany();
                res.status(200).json(reports);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching select report data" });
            }
            break;
        case 'POST':
            try {
                // Create a new SelectReportData record
                const report = await prisma.selectReportData.create({
                    data: req.body,
                });
                res.status(201).json(report);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the select report data" });
                }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
