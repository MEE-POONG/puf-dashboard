import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { id } = req.query;

    switch (method) {
        case 'GET':
            try {
                // Retrieve a single AdminData record by ID
                const admin = await prisma.adminData.findUnique({
                    where: {
                        id: id as string,
                    },
                });
                if (admin) {
                    res.status(200).json(admin);
                } else {
                    res.status(404).json({ error: "AdminData record not found" });
                }
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the admin data" });
            }
            break;
        case 'PUT':
            try {
                // Update a single AdminData record by ID
                const updatedAdmin = await prisma.adminData.update({
                    where: {
                        id: id as string,
                    },
                    data: req.body,
                });
                res.status(200).json(updatedAdmin);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while updating the admin data" });
            }
            break;
        case 'DELETE':
            try {
                // Delete a single AdminData record by ID
                await prisma.adminData.delete({
                    where: {
                        id: id as string,
                    },
                });
                res.status(204).end();
            } catch (error) {
                res.status(500).json({ error: "An error occurred while deleting the admin data" });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
