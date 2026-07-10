import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { noticeSchema } from "@/validators/notice.schema";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return handleGet(req, res);
  } else if (req.method === "POST") {
    return handlePost(req, res);
  }
  return res.status(405).json({ message: "Method not allowed" });
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  try {
    const notices = await prisma.notice.findMany({
      orderBy: [
        { priority: "asc" }, // URGENT comes before NORMAL because U comes after N in alphabet? Wait. Let's fix this.
        // Actually, prisma enum sort order might be based on DB. Or we can just sort by publishDate desc.
        // Let's sort by createdAt desc as fallback
        { createdAt: "desc" }
      ]
    });
    
    // In-memory sort to ensure URGENT is on top regardless of DB enum text value
    const sortedNotices = notices.sort((a, b) => {
      if (a.priority === "URGENT" && b.priority !== "URGENT") return -1;
      if (a.priority !== "URGENT" && b.priority === "URGENT") return 1;
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    });

    return res.status(200).json(sortedNotices);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch notices" });
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = noticeSchema.parse(req.body);
    const notice = await prisma.notice.create({
      data: {
        title: data.title,
        body: data.body,
        category: data.category,
        priority: data.priority,
        publishDate: new Date(data.publishDate),
        image: data.image || null,
      },
    });
    return res.status(201).json(notice);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Invalid data", error });
  }
}
