import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";

export const initialProfile = async () => {
  const user = await currentUser();
  if (!user) {
    return redirectToSignIn();
  }
  const profile = await db.profile.findUnique({
    where: { userId: user.id },
  });

  if (profile) return profile;

  const newProfile = await db.profile.create({
    data: {
      userId: user.id.toString(),
      name: `${user.firstName} ${user.lastName}`,
      image_url: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });
  return newProfile;
};
