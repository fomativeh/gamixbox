import Image from "next/image";
import React from "react";

const TaskCard = ({
  image,
  description,
  status,
}: {
  image: string;
  description: string;
  status: "Undone" | "Ongoing" | "Done";
}) => {
  return (
    <section className="z-[1] w-full mb-[13px] blur-bg rounded-[8px] px-[20px] py-[12px] flex justify-between items-center">
      <section className="flex justify-start items-center">
        <figure className="w-[44px] h-[44px] relative mr-[15px] rounded-[50px]">
          <Image src={image} alt="Task image" fill />
        </figure>

        <section className="flex flex-col items-start">
          <span className="text-[12px] max-w-[200px] break-words">
            {description}
          </span>

          <section className="flex justify-start items-center">
            <figure className="w-[28px] h-[28px] relative mr-[5px]">
              <Image src="/assets/icons/Earns.svg" alt="Earn icon" fill />
            </figure>

            <span className="font-semibold text-[12px]">1,000 $GAX</span>
          </section>
        </section>
      </section>
      {status == "Undone" && <span className="font-semibold">GO</span>}

      {status == "Ongoing" && (
        <span className="font-semibold bg-light_blue_1 py-[10px] px-[20px] rounded-[50px]">
          Verify
        </span>
      )}

      {status == "Done" && <span className="font-semibold">Done</span>}
    </section>
  );
};

const Tasks = () => {
  return (
    <main className="w-full h-[100vh] flex flex-col items-center justify-start pt-[30px] px-[30px] font-[Lexend] text-[white] overflow-y-auto">
      <figure className="w-[140px] h-[140px] min-h-[140px] min-w-[140px] relative mb-[20px]">
        <Image src="/assets/images/level-1.svg" alt="Coin image" fill />
      </figure>

      <p className="font-semibold text-[30px] mb-[35px] text-center">
        Earn more by complete the following tasks
      </p>

      <span className="font-semibold mb-[15px] text-left w-full">Tasks list:</span>

      {/* Tasks wrapper */}
      <section className="w-full flex flex-col items-center mb-[200px]">
        <TaskCard
          status="Ongoing"
          description="Join our tg channel"
          image="/assets/images/avatar.svg"
        />
        <TaskCard
          status="Ongoing"
          description="Join our tg channel"
          image="/assets/images/avatar.svg"
        />
        <TaskCard
          status="Ongoing"
          description="Join our tg channel"
          image="/assets/images/avatar.svg"
        />
        <TaskCard
          status="Ongoing"
          description="Join our tg channel"
          image="/assets/images/avatar.svg"
        />
        <TaskCard
          status="Ongoing"
          description="Join our tg channel"
          image="/assets/images/avatar.svg"
        />
      </section>
    </main>
  );
};

export default Tasks;
