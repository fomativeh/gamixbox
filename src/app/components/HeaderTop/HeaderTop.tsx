import { TonConnectUI } from "@tonconnect/ui-react";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import {formatNumberWithCommas} from "fomautils"

type props = {
  avatar?: string;
  handleWalletClick: () => void;
  name: string;
  walletLoaded: boolean;
  tonConnectUI: TonConnectUI;
  walletAddress: string;
  balance:number
  nickname:string
  visible:boolean
};

const HeaderTop = ({
  avatar,
  handleWalletClick,
  name,
  walletLoaded,
  tonConnectUI,
  walletAddress,
  balance,
  nickname,
  visible
}: props) => {
  const handleButtonClick = () => {
    if (walletLoaded) {
      handleWalletClick();
    }
  };

  // const balanceTextRef = useRef<HTMLSpanElement>(null)
  // if(balanceTextRef.current){
  // balanceTextRef.current.innerHTML = `${formatNumberWithCommas(balance)}`
  // }
  // const [balanceToRender, setBalanceToRender] = useState<number>(balance)
  // useEffect(()=>{setBalanceToRender(balance)},[balance])

  return (
    <header className={`${visible && `hidden`} z-[99] w-full fixed top-0 left-0 text-[white] flex flex-col justify-center items-center font-[Lexend]`}>
      <section className="bg-dark_blue_1 header w-full flex flex-col justify-center items-center max-w-[500px] p-[20px] rounded-b-[30px] z-[2] border-b-[3px] border-b-light_blue_1">
        <section className="w-full flex justify-between items-center">
          {/* Username--avatar */}
          <section className="flex justify-start items-center">
            <figure className="w-[40px] h-[40px] relative mr-[10px] rounded-[50px]">
              <Image
                src={avatar?avatar:"/assets/images/avatar.svg"}
                alt="Avatar image"
                className="rounded-[inherit]"
                fill
              />
            </figure>
            <span className="font-semibold">{name?.length>14?name?.slice(0,14):name}</span>
          </section>

          {/* Wallet button */}
          <button
            onClick={handleButtonClick}
            className="blur-bg py-[10px] px-[12px] rounded-[50px] flex justify-center items-center"
          >
            {walletLoaded && (
              <>
                <figure className="w-[25px] h-[25px] relative mr-[5px] rounded-[50px]">
                  <Image
                    src="/assets/icons/wallet.svg"
                    alt="Avatar image"
                    className="rounded-[inherit]"
                    fill
                  />
                </figure>
                <span className="font-semibold text-[12px]">
                  {tonConnectUI.connected ? (
                    <>
                      {walletAddress.slice(0, 3) +
                        "..." +
                        walletAddress.slice(
                          walletAddress.length - 4,
                          walletAddress.length - 1
                        )}
                    </>
                  ) : (
                    <>{"Connect Wallet"}</>
                  )}
                </span>
              </>
            )}

            {!walletLoaded && (
              <>
                <figure className="w-[25px] h-[25px] relative mr-[5px] rounded-[50px]">
                  <Image
                    src="/assets/icons/wallet.svg"
                    alt="Avatar image"
                    className="rounded-[inherit]"
                    fill
                  />
                </figure>

                <div className="loader-2"></div>
              </>
            )}
          </button>
        </section>

        <section className="w-full mt-[20px] blur-bg rounded-[50px] flex justify-between py-[10px] items-center px-[30px] relative">
          <section className="flex justify-start items-center">
            <figure className="w-[35px] h-[35px] relative mr-[5px]">
              <Image src="/assets/icons/Earns.svg" alt="Earn icon" fill />
            </figure>
            <span className="font-semibold" id="displayBalance"></span>
          </section>

          <div className="w-full h-full top-0 left-0 absolute flex justify-center items-center ">
            <div className="h-[30px] blur-bg w-[1px]"></div>
          </div>

          <section className="flex justify-start items-center">
            <figure className="w-[20px] h-[20px] relative mr-[10px]">
              <Image src="/assets/icons/trophy.svg" alt="Trophy icon" fill />
            </figure>
            <span className="max-w-[100px] break-words font-semibold">{nickname}</span>
          </section>
        </section>
      </section>
    </header>
  );
};

export default HeaderTop;
