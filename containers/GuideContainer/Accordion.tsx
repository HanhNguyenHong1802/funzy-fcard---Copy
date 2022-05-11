import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type AccordionProps = {
  item: any;
};
const Accordion = ({ item }: AccordionProps) => {
  const [toggle, setToggle] = useState<boolean>(false);

  const router = useRouter();
  const toggleHandler = () => {
    setToggle(!toggle);
  };
  useEffect(() => {
    if (router.asPath.includes(item?.slug)) setToggle(true);
  }, []);
  return (
    <div className="shadow-lg mb-5 relative rounded-t-lg">
      <div
        className="p-4 flex justify-between cursor-pointer pr-16 bg-white"
        onClick={toggleHandler}
      >
        <div className="flex">
          <div className="flex">
            <img
              src="/icons/icon-question-active.svg"
              width={20}
              height={20}
              alt="icon"
            />
            <div className="block ml-5">
              <p className="text-[#0173d6] text-lg">{item?.question}</p>
              <p className="text-[#515151] line-clamp-1">{item?.desc}</p>
            </div>
          </div>
          <img
            src="/icons/icon-plus.svg"
            height={20}
            width={20}
            alt="icon"
            className={`absolute right-10 top-8 icon h-fit cursor-pointer transition-all duration-300 ${
              toggle && `rotate-45`
            }`}
          />
        </div>
      </div>
      <div
        className={`bg-white shadow-lg h-0 opacity-0 rounded-b-lg transition-all duration-150 px-4 ${
          toggle && `h-auto opacity-100 p-4`
        }`}
      >
        <hr />
        <div
          dangerouslySetInnerHTML={{
            __html: item?.answer,
          }}
        />
      </div>
    </div>
  );
};
export default Accordion;
