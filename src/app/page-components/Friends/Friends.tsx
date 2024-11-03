import Image from "next/image";
import Link from "next/link";
import React from "react";

const FriendCard = ({ avatar, name }: { avatar?: string; name: string }) => {
  return (
    <section className="z-[1] w-full mb-[13px] blur-bg rounded-[8px] px-[20px] py-[12px] flex justify-between items-center">
      <section className="flex justify-start items-center">
        <figure className="w-[34px] h-[34px] relative mr-[15px] rounded-[50px]">
          <Image src={avatar?avatar:"/assets/images/avatar.svg"} alt="Friend's image" fill />
        </figure>

        <span className="font-semibold">{name}</span>
      </section>

      <span className="font-semibold">+20,000 $GAX</span>
    </section>
  );
};

const Friends = () => {
  return (
    <section className="w-full min-h-[100vh] flex bg-dark_blue_1 pt-[40px] flex-col justify-start items-center text-[white] font-[Lexend] px-[30px]">
      <h1 className="font-semibold text-[32px]">Invite friends!</h1>
      <p className="my-[12px]">You and your friends will recieve bonuses</p>

      <section className="blur-bg my-[20px] py-[12px] px-[20px] w-full rounded-[8px] flex justify-start items-center">
        <figure className="w-[50px] h-[50px] relative mr-[15px]">
          <Image src="/assets/images/bonus.svg" alt="Bonus image" fill />
        </figure>

        <section className="flex flex-col items-center">
          <span className="mr-[12px]">Invite a friend</span>

          <section className="flex justify-start items-center">
            <figure className="w-[44px] h-[44px] relative mr-[5px]">
              <Image src="/assets/icons/Earns.svg" alt="Earn icon" fill />
            </figure>

            <span className="font-semibold">20,000 $GAX</span>
          </section>
        </section>
      </section>

      <section className="w-full flex justify-between items-center h-[56px] my-[12px]">
        <Link
          href={"/"}
          className="font-semibold text-[14px] w-[70%] h-full rounded-[8px] flex justify-center items-center bg-light_blue_1"
        >
          Invite a friend
        </Link>
        <div className="w-[25%] h-full rounded-[8px] flex justify-center items-center bg-light_blue_1">
          <figure className="w-[24px] h-[24px] relative">
            <Image src="/assets/icons/copy.svg" alt="Copy icon" fill />
          </figure>
        </div>
      </section>

      <span className="font-semibold text-[18px] mb-[20px] mt-[20px] w-full text-left">
        List of your friends (1):
      </span>
      <section className="mb-[200px] w-full flex flex-col items-center">
        <FriendCard name="Lucy"/>
        <FriendCard name="Daniel"/>
        <FriendCard name="Micahel"/>
        <FriendCard name="Lucy"/>
        <FriendCard name="Daniel"/>
        <FriendCard name="Micahel"/>
      </section>
    </section>
  );
};

export default Friends;
