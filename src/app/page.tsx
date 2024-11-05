"use client";
import {
  TonConnectButton,
  useTonAddress,
  useTonConnectModal,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import { useEffect, useRef, useState, useCallback } from "react";
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
import { UserType } from "@/types/UserType";
import { initialUserData } from "./utils/initialUserData";
import {
  fetchUserAccount,
  updateBalance,
  updateWalletAddress,
} from "@/api/user";
import { setName } from "@/helpers/setName";
import { formatNumberWithCommas } from "fomautils";
import { fetchTasks } from "@/api/task";
import { TaskType } from "@/types/TaskType";
import { checkLevel } from "@/helpers/checkLevel";
import Image from "next/image";
import Loader from "./components/Loader/Loader";
import Airdrop from "./components/Airdrop/Airdrop";

export default function Home() {
  // const [closingBehavior] = initClosingBehavior();
  // closingBehavior.enableConfirmation();
  // const viewport = useViewport();
  // const data = useInitData(); // Destructuring initData
  // const chatId = data?.user?.id as number;
  // viewport?.expand();
  // const { initDataRaw } = retrieveLaunchParams();
  // const token = initDataRaw as string;
  let token = "";
  let chatId = 164587362;

  const [currentPage, setCurrentPage] = useState<NavPagesType>("Earns");
  const [userData, setUserData] = useState<UserType>(initialUserData);
  const balanceRef = useRef<number>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleBalanceUpdate = async () => {
    if (userData._id) {
      await updateBalance(chatId, balanceRef.current, token);
    }
  };

  //
  useEffect(() => {
    const intervalId = setInterval(handleBalanceUpdate, 30000);
    return () => clearInterval(intervalId);
  }, [userData]);

  const walletAddress = useTonAddress();
  const { state, open, close } = useTonConnectModal();
  const [tonConnectUI] = useTonConnectUI();
  const [walletLoaded, setWalletLoaded] = useState<boolean>(false);
  const [walletErr, setWalletErr] = useState<string>("");

  const initWallet = useCallback(() => {
    const intervalId = setInterval(() => {
      let loader = document.querySelector(".go121314943");
      if (!loader) {
        setWalletLoaded(true);
        clearInterval(intervalId); // Clear the interval to stop it
      }
    }, 1000);
    return () => clearInterval(intervalId); // Cleanup
  }, []);

  useEffect(() => {
    initWallet();
  }, []);

  const handleWalletClick = useCallback(() => {
    if (!tonConnectUI.connected) {
      open();
    } else {
      tonConnectUI.disconnect();
    }
  }, []);

  const loadUser = useCallback(async () => {
    try {
      const loadUserRes = await fetchUserAccount(chatId, token);
      if (loadUserRes?.data) {
        setUserData(loadUserRes.data);
        balanceRef.current = loadUserRes.data.balance;
        let balanceSpan = document.getElementById("displayBalance");
        if (balanceSpan) {
          balanceSpan.innerText = `${formatNumberWithCommas(
            loadUserRes.data.balance
          )}`;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, []);

  //This function will only be re-initialized/re-created whenever wallet address changes
  const handleAddressChange = useCallback(async () => {
    const userWalletAddress = userData?.walletAddress;

    if (walletAddress && userWalletAddress !== walletAddress) {
      await updateWalletAddress(chatId, walletAddress as string, token);
    }
  }, [walletAddress]);

  useEffect(() => {
    handleAddressChange(); // Calls the function whenever it is recreated
  }, [handleAddressChange]);

  const [tasks, setTasks] = useState<TaskType[] | null>(null);
  const loadTasks = useCallback(async () => {
    const loadTasksRes = await fetchTasks(chatId, token);
    if (loadTasksRes?.data) {
      setTasks(loadTasksRes.data);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    //Check for level updates
    const isUpdateNeeded = checkLevel(
      balanceRef.current,
      userData?.level?.levelCount as number
    );
    if (isUpdateNeeded.levelUpdateNeeded) {
      setUserData((prev) => ({
        ...prev,
        level: isUpdateNeeded.newLevelData as {
          levelCount: number;
          levelNickname: string;
        },
      }));
    }
  }, [balanceRef.current]);

  return (
    <main className="w-full h-[100vh] relative">
      <TonConnectButton className="hidden" />
      {userData._id && (
        <>
          <HeaderTop
            hide={currentPage == "Friends" || currentPage == "Tasks" || currentPage=="Airdrop"}
            nickname={userData?.level?.levelNickname as string}
            name={setName(userData)}
            avatar={userData.avatar as string}
            balance={balanceRef.current}
            handleWalletClick={handleWalletClick}
            tonConnectUI={tonConnectUI}
            walletAddress={walletAddress}
            walletLoaded={walletLoaded}
          />

          {currentPage === "Friends" && (
            <Friends
              friends={userData.referrals}
              chatId={chatId}
              token={token}
              setUserData={setUserData}
            />
          )}

          {currentPage === "Earns" && (
            <>
              {userData?.level?.levelCount && (
                <Earn
                  multitapActive={userData.multitap}
                  balanceRef={balanceRef}
                  setUserData={setUserData}
                  level={userData?.level?.levelCount}
                  highestBoosterBought={
                    userData.booster4
                    ? 4
                    : userData.booster3
                    ? 3
                    : userData.booster2
                    ? 2
                    : null
                  }
                />
              )}
            </>
          )}

          {currentPage=="Airdrop" && (
            <Airdrop/>
          )}

          {currentPage === "Tasks" && (
            <Tasks
              lastClaimTime={userData.lastDailyLoginClaimTime as string}
              balance={balanceRef}
              token={token}
              chatId={chatId}
              setUserData={setUserData}
              tasks={tasks}
              ongoingTasks={userData.ongoingTasks}
              completedTasks={userData.completedTasks}
            />
          )}
          {currentPage === "Boost" && (
            <Boost chatId={chatId}
            multitapActive={userData.multitap}
            booster2Active={userData.booster2}
            booster3Active={userData.booster3}
            booster4Active={userData.booster4}

            token={token} balanceRef={balanceRef} setUserData={setUserData} />
          )}
          <Nav currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </>
      )}

      {!userData._id && (
        <section className="w-full h-full relative">
          <figure className="relative w-full h-full">
            <Image src="/assets/images/loader.jpg" alt="Loader image" fill />
          </figure>

          <section className="absolute top-0 left-0 flex justify-center items-center w-full h-full">

            <section className="mt-[400px] bg-[#0f0e39f1] rounded-[50%] w-[45vw] h-[45vw] flex justify-center items-center">
            <Loader/>

            </section>
          </section>
        </section>
      )}
    </main>
  );
}
