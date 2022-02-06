import { NextApiRequest, NextApiResponse } from "next";
import { validateApiKey } from "../validate";
import prisma from "@lib/database/client";

export default async function withKey(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
): Promise<void> {
  validateApiKey(req.headers);

  const key =
    (
      await prisma.apiKey.findMany({
        where: {
          active: true,
          key: req.headers["x-api-key"] as string,
        },
      })
    ).length > 0;

  if (!key) throw new Error("401|API key required");
  next();
}
