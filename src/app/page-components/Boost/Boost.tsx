import { buyMultitap, buyBooster } from "@/api/user";
import { UserType } from "@/types/UserType";
import { formatNumberWithCommas } from "fomautils";
import Image from "next/image";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useState,
} from "react";

const setBalanceText = (newBalance: number) => {
  document.getElementById(
    "displayBalance"
  )!.innerText = `${formatNumberWithCommas(newBalance)}`;
};

const ItemCard = ({
  setUserData,
  category,
  price,
  title,
  bought,
  balanceRef,
  chatId,
  token,
  boosterType,
  readyForPurchase,
}: {
  setUserData: Dispatch<SetStateAction<UserType>>;
  category: "Booster" | "Multitap";
  price: number;
  title: string;
  bought: boolean;
  balanceRef: MutableRefObject<number>;
  chatId: number;
  token: string;
  boosterType?: number;
  readyForPurchase: boolean;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const insufficientBalance = balanceRef.current < price;

  const handleBuy = useCallback(async () => {
    if (insufficientBalance) return; //For insufficient balance
    if (bought) return; //For already bought items

    if (category == "Multitap") {
      setLoading(true);
      const buyMultitapRes = await buyMultitap(chatId, token, balanceRef.current);
      if (buyMultitapRes?.data) {
        setUserData((prev) => ({ ...prev, ...buyMultitapRes.data }));
        let newBalance = buyMultitapRes.data.balance;
        balanceRef.current = newBalance;
        setBalanceText(newBalance);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } else {
      //For boosters
      setLoading(true);
      const buyBoosterRes = await buyBooster(chatId, token, boosterType as number, balanceRef.current);
      if (buyBoosterRes?.data) {
        setUserData((prev) => ({ ...prev, ...buyBoosterRes.data }));
        let newBalance = buyBoosterRes.data.balance;
        balanceRef.current = newBalance;
        setBalanceText(newBalance);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  }, [balanceRef]);

  // balance = 20
  return (
    <section
      style={{
        border: (insufficientBalance && !bought) ? `1px solid silver` : ``,
      }}
      className={`${
        (insufficientBalance && !bought) || !readyForPurchase? `opacity-[50%]` : ``
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

      <span
        onClick={handleBuy}
        className={`font-semibold py-[8px] px-[12px] flex justify-center items-center rounded-[50px] ${
          insufficientBalance && !bought ? `bg-[#6c6c6c]` : `bg-light_blue_1`
        } text-white`}
      >
        {loading ? (
          <div className="loader-2"></div>
        ) : (
          <>
            {bought ? (
              <figure className="relative w-[23px] h-[23px]">
                <Image
                  src={"/assets/icons/check.svg"}
                  sizes="30px"
                  alt="Check icon"
                  fill
                />
              </figure>
            ) : (
              "Buy"
            )}
          </>
        )}
      </span>
    </section>
  );
};

const Boost = ({
  balanceRef,
  chatId,
  token,
  setUserData,
  multitapActive,
  booster2Active,
  booster3Active,
  booster4Active,
}: {
  balanceRef: MutableRefObject<number>;
  chatId: number;
  token: string;
  setUserData: Dispatch<SetStateAction<UserType>>;
  multitapActive: boolean;
  booster2Active: boolean;
  booster3Active: boolean;
  booster4Active: boolean;
}) => {
  return (
    <section className="w-full bg-dark_blue_1 min-h-[100vh] flex flex-col justify-start items-center pt-[200px] px-[30px] text-[white] font-[Lexend]">
      <span className="font-semibold text-[20px] mb-[12px] w-full text-left">
        Multitap:
      </span>
      <section className="w-full flex flex-col items-center">
        <ItemCard
          bought={multitapActive}
          chatId={chatId}
          token={token}
          balanceRef={balanceRef}
          price={20000}
          title="Get yourself a multitap"
          category="Multitap"
          setUserData={setUserData}
          readyForPurchase={true}
        />
      </section>

      <div className="w-full bg-[#6767E8] opacity-[60%] min-h-[1px]  h-[1px] my-[25px]"></div>

      <span className="font-semibold text-[20px] mb-[12px] w-full text-left">
        Booster:
      </span>
      <section className="w-full flex flex-col items-center mb-[200px]">
        <ItemCard
        setUserData={setUserData}
          bought={booster2Active}
          chatId={chatId}
          token={token}
          balanceRef={balanceRef}
          price={10000}
          title="Booster 2x"
          category="Booster"
          boosterType={2}
          readyForPurchase={true}
        />
        <ItemCard
        setUserData={setUserData}
          chatId={chatId}
          token={token}
          balanceRef={balanceRef}
          price={15000}
          title="Booster 3x"
          category="Booster"
          readyForPurchase={booster2Active}
          bought={booster3Active}
          boosterType={3}
        />
        <ItemCard
        setUserData={setUserData}
          bought={booster4Active}
          chatId={chatId}
          token={token}
          balanceRef={balanceRef}
          price={20000}
          title="Booster 4x"
          category="Booster"
          readyForPurchase={booster2Active && booster3Active}
          boosterType={4}
        />
      </section>
    </section>
  );
};

export default Boost;
