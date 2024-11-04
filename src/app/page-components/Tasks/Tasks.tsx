import { completeATask, startATask } from "@/api/task";
import { TaskType } from "@/types/TaskType";
import { UserType } from "@/types/UserType";
import { formatNumberWithCommas } from "fomautils";
import Image from "next/image";
import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useState,
} from "react";

const TaskCard = ({
  image,
  title,
  status,
  id,
  link,
  price,
  setUserData,
  chatId,
  token,
  balance,
}: {
  image: string;
  id: string;
  title: string;
  status: "Undone" | "Ongoing" | "Done";
  link: string;
  price: number;
  setUserData: Dispatch<SetStateAction<UserType>>;
  chatId: number;
  token: string;
  balance: MutableRefObject<number>;
}) => {
  const [startLoader, setStartLoader] = useState<boolean>(false);
  const [verifyLoader, setVerifyLoader] = useState<boolean>(false);

  const startTask = useCallback(async (id: string) => {
    setStartLoader(true);
    const startTaskRes = await startATask(chatId, id, token);
    if (startTaskRes?.data) {
      setUserData((prev) => ({ ...prev, ...startTaskRes.data }));
      setStartLoader(false);
    } else {
      setStartLoader(false);
    }
  }, []);

  const completeTask = useCallback(async (id: string) => {
    setVerifyLoader(true);
    const completeTaskRes = await completeATask(
      chatId,
      id,
      token,
      balance.current
    );
    if (completeTaskRes?.data) {
      setUserData((prev) => ({ ...prev, ...completeTaskRes.data }));

      //Update balance ref with new balance after task completion
      balance.current = completeTaskRes.data.balance;

      //Update balance text with DOM manipulation(due to special reasons)
      let balanceSpan = document.getElementById("displayBalance");
      if (balanceSpan) {
        balanceSpan.innerText = `${formatNumberWithCommas(
          completeTaskRes.data?.balance
        )}`;
      }
      setVerifyLoader(false);
    } else {
      setVerifyLoader(false);
    }
  }, []);

  return (
    <section className="z-[1] w-full mb-[13px] blur-bg rounded-[8px] px-[20px] py-[12px] flex justify-between items-center">
      <section className="flex justify-start items-center">
        <figure className="w-[34px] h-[34px] relative mr-[15px] rounded-[50px]">
          <Image src={image} alt="Task image" fill />
        </figure>

        <section className="flex flex-col items-start">
          <span className="text-[12px] max-w-[200px] break-words">{title}</span>

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
      {status == "Undone" && (
        <span
          className="font-semibold text-[12px]"
          onClick={() => startTask(id)}
        >
          {startLoader ? <div className="loader-2"></div> : `Go`}
        </span>
      )}

      {status == "Ongoing" && (
        <span
          onClick={() => completeTask(id)}
          className="font-semibold text-[12px] bg-light_blue_1 py-[10px] px-[20px] rounded-[50px]"
        >
          {verifyLoader ? <div className="loader-2"></div> : `Verify`}
        </span>
      )}

      {status == "Done" && (
        <span className="font-semibold text-[12px]">Done</span>
      )}
    </section>
  );
};

const Tasks = ({
  tasks,
  ongoingTasks,
  completedTasks,
  setUserData,
  chatId,
  token,
  balance,
}: {
  tasks: TaskType[] | null;
  ongoingTasks: string[];
  completedTasks: string[];
  setUserData: Dispatch<SetStateAction<UserType>>;
  chatId: number;
  token: string;
  balance: MutableRefObject<number>;
}) => {
  return (
    <main className="w-full bg-dark_blue_1 min-h-[100vh] flex flex-col items-center justify-start pt-[30px] px-[30px] font-[Lexend] text-[white]">
      <figure className="w-[140px] h-[140px] relative mb-[20px]">
        <Image src="/assets/images/level-1.svg" alt="Coin image" fill />
      </figure>

      <p className="font-semibold text-[20px] max-w-[80%] mb-[35px] text-center">
        Earn more by complete the following tasks
      </p>

      {tasks && tasks?.length > 0 && (
        <span className="font-semibold mb-[15px] text-left w-full">
          Tasks list:
        </span>
      )}

      {/* Tasks wrapper */}
      {tasks && tasks?.length > 0 && (
        <section className="w-full flex flex-col items-center mb-[200px]">
          {tasks?.map((each, i) => {
            const status = ongoingTasks?.includes(each._id)
              ? "Ongoing"
              : completedTasks?.includes(each._id)
              ? "Done"
              : "Undone";
            return (
              <TaskCard
              key={i}
                id={each._id}
                status={status}
                title={each.title}
                image={each.image ? each.image : "/assets/images/avatar.svg"}
                link={each.link}
                price={each.price}
                setUserData={setUserData}
                chatId={chatId}
                token={token}
                balance={balance}
              />
            );
          })}
        </section>
      )}
    </main>
  );
};

export default Tasks;
