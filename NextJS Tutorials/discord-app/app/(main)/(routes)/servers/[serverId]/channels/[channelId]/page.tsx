'use client'

import { useParams, useRouter } from "next/navigation";

const ChannelIdPage = () => {
  const params = useParams();
  const { channelId, serverId } = params;

  return <div>ChannelPage</div>;
};

export default ChannelIdPage;
