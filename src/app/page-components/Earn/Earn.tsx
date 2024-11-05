import React, { Dispatch, MutableRefObject, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
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
  const tapEffectsRef = useRef(tapEffects); // Reference to hold tap effects without causing re-renders
  tapEffectsRef.current = tapEffects; // Sync ref with state
  let tapC = useRef<null | number>(null)

  // Detect if the device is touch-enabled
  const isTouchDevice = "ontouchstart" in window;

  const handleIncrement = useCallback((tapCount: number) => {
    const incrementAmount = highestBoosterBought || 1;
    const totalIncrement = incrementAmount * tapCount;

    balanceRef.current += totalIncrement;

    const balanceSpan = document.getElementById("displayBalance");
    if (balanceSpan) {
      balanceSpan.innerText = `${formatNumberWithCommas(balanceRef.current)}`;
    }

    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 100);
  },[balanceRef, highestBoosterBought])

  const handleTouchOrClick = (e: React.MouseEvent | React.TouchEvent) => {
    // Determine the number of taps based on multitapActive and number of fingers detected
    const tapCount = multitapActive && "touches" in e ? Math.min(e.touches.length, highestBoosterBought || 1) : 1;
    tapC.current = tapCount
    
    handleIncrement(tapCount);
  
    const newTapEffects: { id: number; x: number; y: number; amount: number }[] = [];
    const incrementAmount = highestBoosterBought || 1;
  
    for (let i = 0; i < tapCount; i++) {
      const x = "touches" in e ? e.touches[i].pageX : (e as React.MouseEvent).pageX;
      const y = "touches" in e ? e.touches[i].pageY : (e as React.MouseEvent).pageY;
      const newTapEffect = { id: tapId + i, x, y, amount: incrementAmount };
      newTapEffects.push(newTapEffect);
  
      // Schedule removal after 1700ms
      setTimeout(() => {
        setTapEffects((currentEffects) =>
          currentEffects.filter((effect) => effect.id !== newTapEffect.id)
        );
      }, 1700);
    }
  
    setTapEffects((prev) => [...prev, ...newTapEffects]);
    setTapId((prev) => prev + tapCount);
  };
  

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
          <div className="w-[200px] h-[200px] relative">
            <img
              onClick={!isTouchDevice ? handleTouchOrClick : undefined}
              onTouchStart={isTouchDevice ? handleTouchOrClick : undefined}
              src={`/assets/images/level-${level}.svg`}
              alt="Coin image"
              className={`w-full h-full coin ${isPressed ? "pressed" : ""}`}
            />
          </div>
          {tapC.current && (
            <span className="text-[white] font-bold">{tapC.current}</span>
          )}
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
