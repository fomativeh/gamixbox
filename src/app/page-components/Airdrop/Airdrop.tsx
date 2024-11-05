import Image from "next/image";
import React, { useState } from "react";

const Airdrop = () => {
  const [page, setPage] = useState<"Points" | "Withdrawal">("Points");
  const points = ["Earn/Achievements", "Friends", "Presale", "Social media"];
  return (
    <main className="w-full h-[100vh] flex flex-col justify-start items-center px-[30px] pt-[30px] font-[Lexend] text-[white]">
      <figure className="w-[180px] h-[180px] relative">
        <Image src="/assets/images/level-7.svg" alt="Coin image" fill />
      </figure>

      <p className="mt-[10px] mb-[5px]">Listing Date</p>
      <span className="font-semibold text-[20px]">January, 2025</span>

      <section className="w-full blur-bg mt-[25px] flex justify-between items-center h-[50px] rounded-[50px] text-[white]">
        <span
          onClick={() => setPage("Points")}
          className={`${
            page == "Points" && `bg-light_blue_1`
          } w-[50%] h-full rounded-[inherit] flex justify-center items-center font-bold`}
        >
          Points
        </span>
        <span
          onClick={() => setPage("Withdrawal")}
          className={`${
            page == "Withdrawal" && `bg-light_blue_1`
          } w-[50%] h-full rounded-[inherit] flex justify-center items-center font-bold`}
        >
          Withdrawal
        </span>
      </section>

      {page == "Points" && (
        <ul className="mt-[12px] list-disc w-full flex flex-col justify-start items-start bg-light_blue_1 rounded-[30px] p-[20px]">
          {points.map((e, i) => {
            return (
              <li className="ml-[20px] my-[10px] font-semibold" key={i}>
                {" "}
                {e}
              </li>
            );
          })}
        </ul>
      )}

      {page == "Withdrawal" && (
        <section className="w-full mt-[12px] blur-bg flex flex-col justify-center items-center rounded-[30px] p-[20px]">
          <figure className="w-[120px] h-[120px] relative mb-[25px]">
            <Image src="/assets/images/announce.svg" alt="Speaker image" fill />
          </figure>

          <p className="font-extrabold">To be announced!</p>
        </section>
      )}
    </main>
  );
};

export default Airdrop;
