import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";
import "./Earn.css"

type props = {
  setBalance:Dispatch<SetStateAction<number>>
}
const Earn = ({setBalance}:props) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    setBalance((prev)=>prev+1)
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 200); // Duration to return to normal
  };

  return (
    <section className="w-full h-[100vh] flex flex-col justify-center items-center">
      <section className="relative w-full h-full flex justify-center items-center">
        {/* Blur */}
        <figure className="w-full h-full max-w-[400px] max-h-[400px] relative">
          <Image src="/assets/images/blur-1.svg" alt="Blur image" fill />
        </figure>

        {/* Coin */}
        <section className="w-full h-full flex justify-center items-center absolute top-0 left-0">
          <figure
            className="w-[250px] h-[250px] relative"
            onClick={handleClick}
          >
            <Image
              src="/assets/images/level-1.svg"
              alt="Coin image"
              className={`coin ${isPressed ? "pressed" : ""}`}
              fill
            />
          </figure>
        </section>
      </section>
    </section>
  );
};

export default Earn;
