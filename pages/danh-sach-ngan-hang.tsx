import PaymentMethodContainer from "@/containers/PaymentMethodContainer";
import MenuLayout from "@/layouts/MenuLayout";

import React from "react";
import { listItemBuyCard } from "../constants";

const BuyCardAgency = () => {
  return (
    <MenuLayout listItem={listItemBuyCard}>
      <PaymentMethodContainer />
    </MenuLayout>
  );
};
export default BuyCardAgency;
