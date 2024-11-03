"use client";
import {
  TonConnectButton,
  useTonAddress,
  useTonConnectModal,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import { useEffect, useRef, useState } from "react";
import { initClosingBehavior } from "@tma.js/sdk";
import {
  useInitData,
  useViewport,
  retrieveLaunchParams,
} from "@tma.js/sdk-react";
import Nav from "./components/BottomNav/Nav";
import { NavPagesType } from "@/types/NavPagesType";
import Earn from "./page-components/Earn/Earn";
import HeaderTop from "./components/HeaderTop/HeaderTop";
import Friends from "./page-components/Friends/Friends";
import Tasks from "./page-components/Tasks/Tasks";
import Boost from "./page-components/Boost/Boost";

export default function Home() {
  const [currentPage, setCurrentPage] = useState<NavPagesType>("Friends");
  const [balance, setBalance] = useState<number>(1906);

  let chatId = 1645873626;
  // const [closingBehavior] = initClosingBehavior();
  // closingBehavior.enableConfirmation();
  // const viewport = useViewport();
  // const data = useInitData(); // Destructuring initData
  // const chatId = data?.user?.id;
  // viewport?.expand();
  // const { initDataRaw } = retrieveLaunchParams();

  const walletAddress = useTonAddress();
  const { state, open, close } = useTonConnectModal();

  const [tonConnectUI] = useTonConnectUI();
  // console.log(tonConnectUI.connected);

  const [walletLoaded, setWalletLoaded] = useState<boolean>(false);

  const initWallet = () => {
    // Correctly typing the interval ID for both Node.js and browser
    const intervalId: ReturnType<typeof setInterval> = setInterval(() => {
      let loader = document.querySelector(".go121314943");
      // console.log(loader);
      if (!loader) {
        setWalletLoaded(true);
        clearInterval(intervalId); // Clear the interval to stop it
      }
    }, 1000);
  };

  useEffect(() => {
    initWallet();
  }, []);

  const handleWalletClick = () => {
    if (!tonConnectUI.connected) {
      open();
    } else {
      tonConnectUI.disconnect();
    }
  };

  const [walletErr, setWalletErr] = useState<string>("");

  // const handleAddressChange = async () => {
  //   const userWalletAddress = userData?.walletAddress;

  //   //Update Wallet address in db
  //   // If wallet is connected, check for sync with user data in db
  //   if (
  //     (!userWalletAddress || userWalletAddress !== walletAddress) &&
  //     walletAddress
  //   ) {
  //     //Update wallet address
  //     await updateWalletAddress(chatId, walletAddress as string, token);
  //   }
  // };

  return (
    <main className="w-full h-[100vh] relative">
      <TonConnectButton className="hidden" />
      {currentPage !== "Friends" && currentPage!=="Tasks" && (
        <HeaderTop
          balance={balance}
          handleWalletClick={handleWalletClick}
          tonConnectUI={tonConnectUI}
          walletAddress={walletAddress}
          walletLoaded={walletLoaded}
        />
      )}

      {currentPage == "Friends" && <Friends />}
      {currentPage == "Earns" && <Earn setBalance={setBalance} />}
      {currentPage =="Tasks" && <Tasks/>}
      {currentPage =="Boost" && <Boost/>}
      <Nav currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </main>
  );
}
