import { formatNumberWithCommas } from "fomautils";
import Image from "next/image";

const ItemCard = ({
  category,
  expiresIn,
  type,
  price,
  title,
  inUse,
}: {
  expiresIn?: number;
  category: "Booster" | "Multiplier";
  type?: "2x" | "3x" | "4x";
  price: number;
  title: string;
  inUse: Boolean;
}) => {
  return (
    <section
      style={{ border: inUse ? `1px solid silver` : `` }}
      className={`${
        inUse ? `opacity-[70%]` : ``
      } z-[1] w-full mb-[13px] blur-bg rounded-[8px] px-[20px] py-[12px] flex justify-between items-center`}
    >
      <section className="flex justify-start items-center">
        <figure className="w-[44px] h-[44px] relative mr-[10px] rounded-[50px]">
          <Image
            src={`/assets/icons/${
              category == "Booster" ? "Booster" : "Multiplier"
            }.svg`}
            alt="Booster | Multiplier icon"
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

      {expiresIn && expiresIn > 0 && (
        <span className="font-semibold w-[35px] h-[35px] flex justify-center items-center rounded-[50px] bg-light_blue_1 text-white">
          {expiresIn}
        </span>
      )}
    </section>
  );
};

const Boost = () => {
  return (
    <section className="w-full bg-dark_blue_1 min-h-[100vh] flex flex-col justify-start items-center pt-[200px] px-[30px] text-[white] font-[Lexend]">
      <span className="font-semibold text-[20px] mb-[12px] w-full text-left">
        Multiplier:
      </span>
      <section className="w-full flex flex-col items-center">
        <ItemCard
          price={20000}
          title="Get yourself a multiplier"
          category="Multiplier"
          inUse={true}
          expiresIn={28}
        />
      </section>

      <div className="w-full bg-[#6767E8] opacity-[60%] min-h-[1px]  h-[1px] my-[25px]"></div>

      <span className="font-semibold text-[20px] mb-[12px] w-full text-left">
        Booster:
      </span>
      <section className="w-full flex flex-col items-center mb-[200px]">
        <ItemCard
          price={10000}
          title="Booster 2x"
          category="Booster"
          inUse={true}
          expiresIn={18}
        />
        <ItemCard
          price={15000}
          title="Booster 3x"
          category="Booster"
          inUse={false}
        />
        <ItemCard
          price={20000}
          title="Booster 4x"
          category="Booster"
          inUse={false}
        />
      </section>
    </section>
  );
};

export default Boost;
