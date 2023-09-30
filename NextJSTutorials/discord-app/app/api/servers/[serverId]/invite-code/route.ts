import { currentProfile } from "@/lib/current-profile";
import { v4 as uuidV4 } from "uuid";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { Server } from "@prisma/client";

interface RequestParams {
  params: { serverId: string };
}

export async function PATCH(req: Request, { params }: RequestParams) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!params.serverId) {
      return new NextResponse("Server Id Missing", { status: 400 });
    }
    const server: Server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        invite_code: uuidV4(),
      },
    });
    return NextResponse.json(server);
  } catch (err) {
    console.error("[INVITE_CODE_PATCH]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
