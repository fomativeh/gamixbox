import React, { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from "react";
import "./Earn.css";
import { formatNumberWithCommas } from "fomautils";
import { UserType } from "@/types/UserType";

type Props = {
  balanceRef: MutableRefObject<number>;
  level: number;
  setUserData: Dispatch<SetStateAction<UserType>>;
  highestBoosterBought: number | null;
  multitapActive: boolean;
};

const Earn = ({ balanceRef, level, setUserData, highestBoosterBought, multitapActive }: Props) => {
  const [isPressed, setIsPressed] = useState(false);
  const [tapEffects, setTapEffects] = useState<{ id: number; x: number; y: number; amount: number }[]>([]);
  const [tapId, setTapId] = useState(0);

  // Detect if the device is touch-enabled
  const isTouchDevice = "ontouchstart" in window;

  const handleIncrement = (tapCount: number) => {
    const incrementAmount = highestBoosterBought || 1;
    const totalIncrement = incrementAmount * tapCount;

    balanceRef.current += totalIncrement;

    const balanceSpan = document.getElementById("displayBalance");
    if (balanceSpan) {
      balanceSpan.innerText = `${formatNumberWithCommas(balanceRef.current)}`;
    }

    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 50);
  };

  const handleTouchOrClick = (e: React.MouseEvent | React.TouchEvent) => {
    // Calculate tap count based on multitap status and number of touches
    const tapCount = multitapActive && "touches" in e ? e.touches.length : 1;
    handleIncrement(tapCount);

    // Set tap effect position and amount
    const x = "touches" in e ? e.touches[0].pageX : (e as React.MouseEvent).pageX;
    const y = "touches" in e ? e.touches[0].pageY : (e as React.MouseEvent).pageY;
    const amount = (highestBoosterBought || 1) * tapCount;

    setTapEffects((prev) => [...prev, { id: tapId, x, y, amount }]);
    setTapId((prev) => prev + 1);
  };

  useEffect(() => {
    // Remove tap effects after animation duration
    const timer = setTimeout(() => {
      setTapEffects((effects) => effects.slice(1));
    }, 1700);

    return () => clearTimeout(timer);
  }, [tapEffects]);

  return (
    <section className="w-full h-[100vh] flex flex-col justify-center items-center">
      <section className="relative w-full h-full flex justify-center items-center">
        {/* Blur */}
        <figure className="w-full h-full max-w-[400px] max-h-[400px] relative">
          <img
            src={`/assets/images/blur-${level}.svg`}
            alt="Blur image"
            className="w-full h-full"
          />
        </figure>

        {/* Coin */}
        <section className="w-full h-full flex justify-center items-center absolute top-0 left-0">
          <div className="w-[160px] h-[160px] relative">
            <img
              onClick={!isTouchDevice ? handleTouchOrClick : undefined}
              onTouchStart={isTouchDevice ? handleTouchOrClick : undefined}
              src={`/assets/images/level-${level}.svg`}
              alt="Coin image"
              className={`w-full h-full coin ${isPressed ? "pressed" : ""}`}
            />
          </div>
        </section>

        {/* Tap Effects */}
        {tapEffects.map((effect) => (
          <span
            key={effect.id}
            className="tap-effect text-white font-semibold absolute z-10"
            style={{
              top: `${effect.y}px`,
              left: `${effect.x}px`,
            }}
          >
            +{formatNumberWithCommas(effect.amount)}
          </span>
        ))}
      </section>
    </section>
  );
};

export default Earn;
