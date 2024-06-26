import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                // Retrieve all AdminData records
                const admins = await prisma.adminData.findMany();
                res.status(200).json(admins);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching admin data" });
            }
            break;
        case 'POST':
            try {
                // Create a new AdminData record
                const newAdmin = await prisma.adminData.create({
                    data: req.body,
                });
                res.status(201).json(newAdmin);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the admin data" });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
