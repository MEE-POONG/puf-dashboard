import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                // Retrieve all PartnerData records
                const partners = await prisma.partnerData.findMany();
                res.status(200).json(partners);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching partner data" });
            }
            break;
        case 'POST':
            try {
                // Create a new PartnerData record
                const partner = await prisma.partnerData.create({
                    data: req.body,
                });
                res.status(201).json(partner);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the partner data" });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
