import TopupNotiContainer from "@/containers/TopupNotiContainer";
import MenuLayout from "@/layouts/MenuLayout";
import React from "react";
import { listItemBuyCard } from "../constants";

const BuyCardAgency = () => {
  return (
    <MenuLayout listItem={listItemBuyCard}>
      <TopupNotiContainer />
    </MenuLayout>
  );
};
export default BuyCardAgency;
