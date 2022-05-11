import { listQuestion } from "@/constants/index";
import React from "react";
import Accordion from "./Accordion";

const FrequentlyAskedQuestion = () => {
  return (
    <>
      {listQuestion?.length > 0 &&
        listQuestion?.map((item, index) => (
          <Accordion item={item} key={index} />
        ))}
    </>
  );
};
export default FrequentlyAskedQuestion;
