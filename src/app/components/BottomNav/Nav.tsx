import React, { Dispatch, SetStateAction } from "react";
import { NavPagesType } from "@/types/NavPagesType";
import Image from "next/image";

type props = {
    currentPage:NavPagesType,
    setCurrentPage:Dispatch<SetStateAction<NavPagesType>>
}

const Nav = ({currentPage, setCurrentPage}:props) => {
  const pages: string[] = ["Earns", "Boost", "Tasks", "Friends", "Airdrop"];

  return (
    <nav className="w-full fixed z-[9] bottom-0 left-0 text-[white] flex flex-col justify-center items-center font-[Lexend]">
      <section className="bg-dark_blue_1 nav-shadow w-full flex justify-center items-center max-w-[500px] py-[25px] rounded-t-[30px] border-t-[3px] border-t-light_blue_1">
        <section className="w-[90%] py-[15px] flex justify-between items-center px-[40px] blur-bg rounded-[50px] ">
          {pages.map((each, i) => {
            return (
              <section key={i} className="flex flex-col justify-start items-center" onClick={()=>setCurrentPage(each as NavPagesType)}>
                <figure className="relative w-[30px] h-[30px] mb-[2px]">
                  <Image
                    src={`/assets/icons/${each}.svg`}
                    alt="Nav icon"
                    fill
                    className={`${each!==currentPage && `opacity-[50%]`}`}
                  />
                </figure>
                <span className={`${each!==currentPage && `opacity-[50%]`} font-semibold text-[12px]`}>{each}</span>
              </section>
            );
          })}
        </section>
      </section>
    </nav>
  );
};

export default Nav;
