// alliance/[id].ts
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { id } = req.query;

    switch (method) {
        case 'GET':
            try {
                const alliance = await prisma.allianceData.findUnique({
                    where: {
                        id: id as string,
                    },
                });
                if (!alliance) {
                    return res.status(404).json({ error: "Alliance not found" });
                }
                res.status(200).json(alliance);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the alliance data" });
            }
            break;
        case 'PUT':
            try {
                const alliance = await prisma.allianceData.update({
                    where: {
                        id: id as string,
                    },
                    data: req.body,
                });
                res.status(200).json(alliance);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while updating the alliance data" });
            }
            break;
        case 'DELETE':
            try {
                await prisma.allianceData.delete({
                    where: {
                        id: id as string,
                    },
                });
                res.status(204).end();
            } catch (error) {
                res.status(500).json({ error: "An error occurred while deleting the alliance data" });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
