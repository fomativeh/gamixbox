import { fetchFriends } from "@/api/user";
import { copyToClipboard } from "@/helpers/copyToClipboard";
import { setFriendName } from "@/helpers/setName";
import { FriendsType } from "@/types/FriendType";
import { UserType } from "@/types/UserType";
import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { initUtils } from "@tma.js/sdk";

const FriendCard = ({ avatar, name }: { avatar?: string; name: string }) => {
  return (
    <section className="z-[1] w-full mb-[13px] blur-bg rounded-[8px] px-[20px] py-[12px] flex justify-between items-center">
      <section className="flex justify-start items-center">
        <figure className="w-[34px] h-[34px] relative mr-[15px] rounded-[50px]">
          <Image
            src={avatar ? avatar : "/assets/images/avatar.svg"}
            alt="Friend's image"
            fill
            className="rounded-[inherit]"
          />
        </figure>

        <span className="font-semibold">
          {name.length > 10 ? name.slice(0, 10) : name}
        </span>
      </section>

      <span className="font-semibold text-[12px]">+20,000 $GAX</span>
    </section>
  );
};

const Friends = ({
  token,
  chatId,
  setUserData,
  friends,
}: {
  friends: FriendsType[];
  token: string;
  chatId: number;
  setUserData: Dispatch<SetStateAction<UserType>>;
}) => {
  const utils = initUtils();
  const inviteFriends = () => {
    utils.openTelegramLink(
      `https://t.me/share/url?url=${process.env.NEXT_PUBLIC_BOT_LINK}?start=${chatId}&text=Join Gamixbox today to start earning $GAX😁💵💴`
    );
  };

  const [isReloading, setIsReloading] = useState<boolean>(false);
  const [confirmCopy, setConfirmCopy] = useState<boolean>(false);

  const reloadFriends = useCallback(async () => {
    setIsReloading(true);
    const latestFriendsData = await fetchFriends(chatId, token);
    if (latestFriendsData?.data) {
      setIsReloading(false);
      setUserData((prev) => ({ ...prev, referrals: latestFriendsData.data }));
    } else {
      setIsReloading(false);
    }
  }, []);

  const handleCopyLink = useCallback(async () => {
    const refLink = `${process.env.NEXT_PUBLIC_BOT_LINK}?start=${chatId}`;
    await copyToClipboard(refLink);
    setConfirmCopy(true);
    setTimeout(() => setConfirmCopy(false), 5000);
  }, []);

  return (
    <section className="w-full min-h-[100vh] flex bg-dark_blue_1 pt-[40px] flex-col justify-start items-center text-[white] font-[Lexend] px-[30px]">
      <h1 className="font-semibold text-[32px]">Invite friends!</h1>
      <p className="my-[12px]">You and your friends will recieve bonuses</p>

      <section className="blur-bg my-[20px] py-[12px] px-[20px] w-full rounded-[8px] flex justify-start items-center">
        <figure className="w-[50px] h-[50px] relative mr-[20px]">
          <Image src="/assets/images/bonus.svg" alt="Bonus image" fill />
        </figure>

        <section className="flex flex-col justify-start w-[50%] items-start">
          <span className="text-[14px]">Invite a friend</span>

          <section className="flex justify-start items-center">
            <figure className="w-[37px] h-[37px] relative mr-[5px]">
              <Image src="/assets/icons/Earns.svg" alt="Earn icon" fill />
            </figure>

            <span className="font-semibold text-[14px]">20,000 $GAX</span>
          </section>
        </section>
      </section>

      <section className="w-full flex justify-between items-center h-[56px] my-[12px]">
        <div
          onClick={inviteFriends}
          className="font-semibold text-[14px] w-[70%] h-full rounded-[8px] flex justify-center items-center bg-light_blue_1"
        >
          Invite a friend
        </div>

        <div
          onClick={handleCopyLink}
          className={`w-[25%] h-full rounded-[8px] flex justify-center items-center ${
            confirmCopy ? `bg-[#35e235]` : `bg-light_blue_1`
          }`}
        >
          <figure className="w-[24px] h-[24px] relative">
            <Image src="/assets/icons/copy.svg" alt="Copy icon" fill />
          </figure>
        </div>
      </section>

      {friends && friends?.length == 0 && (
        <p className="mt-[50px] font-semibold">No friends yet</p>
      )}

      <section
        className={`w-full flex ${
          friends.length > 0 ? `justify-between` : `justify-center`
        } items-center mb-[20px] mt-[30px]`}
      >
        {friends && friends.length > 0 && (
          <span className="font-semibold text-[18px]">
            List of your friends ({friends.length}):
          </span>
        )}

        <div
          className="p-[12px] rounded-[50px] bg-light_blue_1"
          onClick={reloadFriends}
        >
          <figure
            className={`w-[20px] h-[20px] relative ${
              isReloading && `animate-spin`
            }`}
          >
            <Image src="/assets/icons/reload.svg" alt="Reload icon" fill />
          </figure>
        </div>
      </section>

      {friends && friends.length > 0 && (
        <section className="mb-[200px] w-full flex flex-col items-center">
          {friends.map((each, i) => {
            return (
              <FriendCard
                name={setFriendName(each)}
                avatar={each.avatar}
                key={i}
              />
            );
          })}
        </section>
      )}
    </section>
  );
};

export default Friends;
