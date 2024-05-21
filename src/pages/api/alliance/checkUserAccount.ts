// pages/api/alliance/checkUserAccount.ts
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                // Check if userAccount is unique
                const { userAccount } = req.query;
                if (!userAccount) {
                    return res.status(400).json({ error: 'userAccount is required' });
                }

                const existingAccount = await prisma.allianceData.findFirst({
                    where: { userAccount: userAccount as string },
                });

                if (existingAccount) {
                    return res.json({ isUnique: false });
                } else {
                    return res.json({ isUnique: true });
                }
            } catch (error) {
                console.error('Error checking user account:', error);
                return res.status(500).json({ error: 'An error occurred while checking the user account' });
            }
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}