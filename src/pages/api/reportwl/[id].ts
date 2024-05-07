// reportwl/[id].ts
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { id } = req.query;

    switch (method) {
        case 'GET':
            try {
                // ดึงข้อมูลตาม ID
                const report = await prisma.reportWLData.findUnique({
                    where: {
                        id: id as string,
                    },
                });
                if (!report) {
                    return res.status(404).json({ error: "Report not found" });
                }
                res.status(200).json(report);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the report WL data" });
            }
            break;
        case 'PUT':
            try {
                // อัปเดตรายการตาม ID
                const report = await prisma.reportWLData.update({
                    where: {
                        id: id as string,
                    },
                    data: req.body,
                });
                res.status(200).json(report);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while updating the report WL data" });
            }
            break;
        case 'DELETE':
            try {
                // ลบรายการตาม ID
                await prisma.reportWLData.delete({
                    where: {
                        id: id as string,
                    },
                });
                res.status(204).end();
            } catch (error) {
                res.status(500).json({ error: "An error occurred while deleting the report WL data" });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
