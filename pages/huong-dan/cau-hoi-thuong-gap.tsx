import { listItemGuide } from "@/constants/index";
import FrequentlyAskedQuestionContainer from "@/containers/GuideContainer/FrequentlyAskedQuestionContainer";
import MenuLayout from "@/layouts/MenuLayout";
import React from "react";

const FrequentlyAskedQuestion = () => {
  return (
    <MenuLayout listItem={listItemGuide} type="guide">
      <FrequentlyAskedQuestionContainer />
    </MenuLayout>
  );
};
export default FrequentlyAskedQuestion;
