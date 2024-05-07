import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { id } = req.query;

    switch (method) {
        case 'GET':
            try {
                // Retrieve a single RefundCreditData record by ID
                const refundCredit = await prisma.refundCreditData.findUnique({
                    where: {
                        id: id as string,
                    },
                });
                if (refundCredit) {
                    res.status(200).json(refundCredit);
                } else {
                    res.status(404).json({ error: "RefundCreditData record not found" });
                }
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the refund credit data" });
            }
            break;
        case 'PUT':
            try {
                // Update a single RefundCreditData record by ID
                const updatedRefundCredit = await prisma.refundCreditData.update({
                    where: {
                        id: id as string,
                    },
                    data: req.body,
                });
                res.status(200).json(updatedRefundCredit);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while updating the refund credit data" });
            }
            break;
        case 'DELETE':
            try {
                // Delete a single RefundCreditData record by ID
                await prisma.refundCreditData.delete({
                    where: {
                        id: id as string,
                    },
                });
                res.status(204).end();
            } catch (error) {
                res.status(500).json({ error: "An error occurred while deleting the refund credit data" });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
