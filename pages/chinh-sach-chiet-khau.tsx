import DiscountPolicyContainer from "@/containers/DiscountPolicyContainer";
import MenuLayout from "@/layouts/MenuLayout";
import React from "react";
import { listItemBuyCard } from "../constants";

const BuyCardAgency = () => {
  return (
    <MenuLayout listItem={listItemBuyCard}>
      <DiscountPolicyContainer />
    </MenuLayout>
  );
};
export default BuyCardAgency;
