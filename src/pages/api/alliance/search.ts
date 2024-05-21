import { Prisma, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

interface QueryParams {
  page?: string;
  pageSize?: string;
  search?: string;
  position?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "GET":
      await handleGET(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function handleGET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { page = '1', pageSize = '10', search, position } = req.query as QueryParams;

    const pageNum = parseInt(page, 10) || 1;
    const pageSizeNum = parseInt(pageSize, 10) || 10;

    const skip = (pageNum - 1) * pageSizeNum;
    const take = pageSizeNum;

    const whereConditions: Prisma.AllianceDataWhereInput[] = [];

    if (search && search.length >= 3) {
      whereConditions.push({ userAccount: { contains: search, mode: 'insensitive' } });
      whereConditions.push({ counselor: { contains: search, mode: 'insensitive' } });
    }

    if (position) {
      whereConditions.push({ position });
    }

    const whereClause: Prisma.AllianceDataWhereInput = {
      AND: whereConditions.length > 0 ? whereConditions : undefined,
    };

    const [allianceDataItems, totalAllianceDataCount] = await Promise.all([
      prisma.allianceData.findMany({
        where: whereClause,
        skip,
        take,
        include: {
          reportsData: true,
          totalWLData: true,
          PartnerData: true,
        },
      }),
      prisma.allianceData.count({ where: whereClause })
    ]);

    const totalPages = Math.ceil(totalAllianceDataCount / pageSizeNum);

    res.status(200).json({
      success: true,
      data: allianceDataItems,
      pagination: {
        total: totalAllianceDataCount,
        totalPages,
        page: pageNum,
        pageSize: pageSizeNum,
      },
    });
  } catch (error) {
    console.error("Error fetching alliance data:", error);
    res.status(500).json({ message: "Error fetching alliance data" });
  }
}
