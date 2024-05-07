import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                // Retrieve all RefundCreditData records
                const refundCredits = await prisma.refundCreditData.findMany();
                res.status(200).json(refundCredits);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching refund credit data" });
            }
            break;
        case 'POST':
            try {
                // Create a new RefundCreditData record
                const newRefundCredit = await prisma.refundCreditData.create({
                    data: req.body,
                });
                res.status(201).json(newRefundCredit);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the refund credit data" });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
