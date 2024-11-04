import { startBooster, startMultitap } from "@/api/user";
import { formatNumberWithCommas } from "fomautils";
import Image from "next/image";
import { Dispatch, MutableRefObject, SetStateAction, useCallback } from "react";

const ItemCard = ({
  category,
  price,
  title,
  inUse,
  balanceRef,
  setMultitapActive,
  multitapTimer,
  chatId,
  token,
  boosterTimer,
  setBoosterActive,
  boosterType,
}: {
  expiresIn?: number;
  category: "Booster" | "Multitap";
  price: number;
  title: string;
  inUse: Boolean;
  balanceRef: MutableRefObject<number>;
  setMultitapActive?: Dispatch<SetStateAction<boolean>>;
  multitapTimer?: number;
  chatId: number;
  token: string;
  boosterTimer?: number;
  setBoosterActive?: Dispatch<SetStateAction<"2x" | "3x" | "4x" | null>>;
  boosterType?: "2x" | "3x" | "4x" | null;
}) => {
  const handleBuy = useCallback(async () => {
    if (balanceRef.current < price) return; //For insufficient balance

    if (inUse) return;

    if (category == "Multitap") {
      balanceRef.current -= price; //Deduct price
      document.getElementById(
        "displayBalance"
      )!.innerText = `${formatNumberWithCommas(balanceRef.current)}`;
      if (setMultitapActive) {
        setMultitapActive(true);
      }

      //Sync with backend
      startMultitap(chatId, token);
    } else {
      //For boosters
      balanceRef.current -= price; //Deduct price
      document.getElementById(
        "displayBalance"
      )!.innerText = `${formatNumberWithCommas(balanceRef.current)}`;
      if (setBoosterActive) {
        setBoosterActive(boosterType as "2x" | "3x" | "4x" | null);
      }

      //Sync with backend
      if (boosterType) {
        startBooster(chatId, token, parseInt(boosterType[0]));
      }
    }
  }, [inUse, balanceRef.current]);

  // balance = 20
  return (
    <section
      style={{
        border: balanceRef.current < price ? `1px solid silver` : ``,
      }}
      className={`${
        inUse || balanceRef.current < price ? `opacity-[70%]` : ``
      } z-[1] w-full mb-[13px] blur-bg rounded-[8px] px-[20px] py-[12px] flex justify-between items-center`}
    >
      <section className="flex justify-start items-center">
        <figure className="w-[44px] h-[44px] relative mr-[10px] rounded-[50px]">
          <Image
            src={`/assets/icons/${
              category == "Booster" ? "Booster" : "Multitap"
            }.svg`}
            alt="Booster | Multitap icon"
            fill
          />
        </figure>

        <section className="flex flex-col items-start">
          <span className="text-[14px]">{title}</span>

          <section className="flex justify-start items-center">
            <figure className="w-[28px] h-[28px] relative mr-[5px]">
              <Image src="/assets/icons/Earns.svg" alt="Earn icon" fill />
            </figure>

            <span className="font-semibold text-[12px]">
              {formatNumberWithCommas(price)} $GAX
            </span>
          </section>
        </section>
      </section>

      {category == "Multitap" && (
        <span
          onClick={handleBuy}
          className={`font-semibold py-[8px] px-[12px] flex justify-center items-center rounded-[50px] ${
            balanceRef.current < price ? `bg-[#6c6c6c]` : `bg-light_blue_1`
          } text-white`}
        >
          {inUse ? `${multitapTimer}` : `Buy`}
        </span>
      )}

      {category == "Booster" && (
        <span
          onClick={handleBuy}
          className={`font-semibold py-[8px] px-[12px] flex justify-center items-center rounded-[50px] ${
            balanceRef.current < price ? `bg-[#6c6c6c]` : `bg-light_blue_1`
          } text-white`}
        >
          {inUse ? `${boosterTimer}` : `Buy`}
        </span>
      )}
    </section>
  );
};

const Boost = ({
  balanceRef,
  multitapActive,
  setMultitapActive,
  boosterActive,
  setBoosterActive,
  multitapTimer,
  chatId,
  token,
  boosterTimer,
}: {
  multitapActive: boolean;
  setMultitapActive: Dispatch<SetStateAction<boolean>>;
  boosterActive: "2x" | "3x" | "4x" | null;
  setBoosterActive: Dispatch<SetStateAction<"2x" | "3x" | "4x" | null>>;
  balanceRef: MutableRefObject<number>;
  multitapTimer: number;
  chatId: number;
  token: string;
  boosterTimer: number;
}) => {
  return (
    <section className="w-full bg-dark_blue_1 min-h-[100vh] flex flex-col justify-start items-center pt-[200px] px-[30px] text-[white] font-[Lexend]">
      <span className="font-semibold text-[20px] mb-[12px] w-full text-left">
        Multitap:
      </span>
      <section className="w-full flex flex-col items-center">
        <ItemCard
          chatId={chatId}
          token={token}
          multitapTimer={multitapTimer}
          balanceRef={balanceRef}
          price={20000}
          title="Get yourself a multitap"
          category="Multitap"
          inUse={multitapActive}
          expiresIn={28}
          setMultitapActive={setMultitapActive}
        />
      </section>

      <div className="w-full bg-[#6767E8] opacity-[60%] min-h-[1px]  h-[1px] my-[25px]"></div>

      <span className="font-semibold text-[20px] mb-[12px] w-full text-left">
        Booster:
      </span>
      <section className="w-full flex flex-col items-center mb-[200px]">
        <ItemCard
          boosterTimer={boosterTimer}
          chatId={chatId}
          token={token}
          balanceRef={balanceRef}
          price={10000}
          title="Booster 2x"
          category="Booster"
          inUse={boosterActive == "2x"}
          setBoosterActive={setBoosterActive}
          boosterType={"2x"}
        />
        <ItemCard
          boosterTimer={boosterTimer}
          chatId={chatId}
          token={token}
          balanceRef={balanceRef}
          price={15000}
          title="Booster 3x"
          category="Booster"
          inUse={boosterActive == "3x"}
          setBoosterActive={setBoosterActive}
          boosterType={"3x"}
        />
        <ItemCard
          boosterTimer={boosterTimer}
          chatId={chatId}
          token={token}
          balanceRef={balanceRef}
          price={20000}
          title="Booster 4x"
          category="Booster"
          inUse={boosterActive == "4x"}
          setBoosterActive={setBoosterActive}
          boosterType={"4x"}
        />
      </section>
    </section>
  );
};

export default Boost;
