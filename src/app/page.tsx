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
  endBooster,
  endMultitap,
  fetchUserAccount,
  updateBalance,
  updateWalletAddress,
} from "@/api/user";
import { setName } from "@/helpers/setName";
import { formatNumberWithCommas } from "fomautils";
import { fetchTasks } from "@/api/task";
import { TaskType } from "@/types/TaskType";
import { checkLevel } from "@/helpers/checkLevel";

export default function Home() {
  const [closingBehavior] = initClosingBehavior();
  closingBehavior.enableConfirmation();
  const viewport = useViewport();
  const data = useInitData(); // Destructuring initData
  const chatId = data?.user?.id as number;
  viewport?.expand();
  const { initDataRaw } = retrieveLaunchParams();
  const token = initDataRaw as string

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

  const [multitapActive, setMultitapActive] = useState<boolean>(false);
  const [boosterActive, setBoosterActive] = useState<"2x" | "3x" | "4x" | null>(
    null
  );

  const [multitapTimer, setMultitapTimer] = useState<number | null>(null);
  const [boosterTimer, setBoosterTimer] = useState<number | null>(null);

  useEffect(() => {
    if (multitapActive) {
      // Initialize the timer
      setMultitapTimer(30);

      const multitapCounter = setInterval(() => {
        setMultitapTimer((prevTimer) => {
          if (prevTimer === null || prevTimer <= 1) {
            clearInterval(multitapCounter);
            setMultitapActive(false);
            endMultitap(chatId, token);
            return null;
          }
          return prevTimer - 1;
        });
      }, 1000);

      // Clear interval when component unmounts or multitapActive changes
      return () => clearInterval(multitapCounter);
    }
  }, [multitapActive]);

  useEffect(() => {
    if (boosterActive) {
      // Initialize the timer
      setBoosterTimer(30);

      const boosterCounter = setInterval(() => {
        setBoosterTimer((prevTimer) => {
          if (prevTimer === null || prevTimer <= 1) {
            clearInterval(boosterCounter);
            setBoosterActive(null);
            endBooster(chatId, token);
            return null;
          }
          return prevTimer - 1;
        });
      }, 1000);

      // Clear interval when component unmounts or boosterActive changes
      return () => clearInterval(boosterCounter);
    }
  }, [boosterActive]);

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
      <HeaderTop
        visible={currentPage == "Friends" || currentPage == "Tasks"}
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
              multitapActive={multitapActive}
              balanceRef={balanceRef}
              setUserData={setUserData}
              level={userData?.level?.levelCount}
              boosterActive={boosterActive}
            />
          )}
        </>
      )}

      {currentPage === "Tasks" && (
        <Tasks
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
        <Boost
          chatId={chatId}
          token={token}
          multitapTimer={multitapTimer as number}
          boosterTimer={boosterTimer as number}
          multitapActive={multitapActive}
          setMultitapActive={setMultitapActive}
          balanceRef={balanceRef}
          boosterActive={boosterActive}
          setBoosterActive={setBoosterActive}
        />
      )}
      <Nav currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </main>
  );
}
