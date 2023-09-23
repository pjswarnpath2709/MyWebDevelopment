import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });
    const { channelId } = params;
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    if (!serverId)
      return new NextResponse("Server Id Missing", { status: 400 });
    if (!channelId)
      return new NextResponse("Channel Id Missing", { status: 400 });
    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          delete: {
            id: channelId,
            name: {
              not: "general",
            },
          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (err) {
    console.error("[CHANNEL_ID_DELETE]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });
    const { channelId } = params;
    const { name, type } = await req.json();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    if (!serverId)
      return new NextResponse("Server Id Missing", { status: 400 });
    if (!channelId)
      return new NextResponse("Channel Id Missing", { status: 400 });
    if (name === "general")
      return new NextResponse("Cannot rename 'general' channel", {
        status: 400,
      });

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          update: {
            where: {
              id: channelId,
              name: {
                not: "general",
              },
            },
            data: {
              name: name,
              type: type,
            },
          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (err) {
    console.error("[CHANNEL_ID_PATCH]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
