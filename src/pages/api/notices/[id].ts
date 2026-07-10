import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { noticeSchema } from "@/validators/notice.schema";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return handleGet(req, res);
  } else if (req.method === "PUT") {
    return handlePut(req, res);
  } else if (req.method === "DELETE") {
    return handleDelete(req, res);
  }
  return res.status(405).json({ message: "Method not allowed" });
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const notice = await prisma.notice.findUnique({
      where: { id: String(id) },
    });
    
    if (!notice) {
      return res.status(404).json({ message: "Notice not found" });
    }
    return res.status(200).json(notice);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch notice" });
  }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const data = noticeSchema.parse(req.body);
    
    const notice = await prisma.notice.update({
      where: { id: String(id) },
      data: {
        title: data.title,
        body: data.body,
        category: data.category,
        priority: data.priority,
        publishDate: new Date(data.publishDate),
        image: data.image || null,
      },
    });
    return res.status(200).json(notice);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Invalid data", error });
  }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    await prisma.notice.delete({
      where: { id: String(id) },
    });
    return res.status(204).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to delete notice" });
  }
}
