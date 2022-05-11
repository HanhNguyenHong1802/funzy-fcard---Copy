import AccountInfoContainer from "@/containers/AccountInfoContainer";
import MenuLayout from "@/layouts/MenuLayout";
import React from "react";
import { listItemAcount } from "../constants";
const AccountInfo = () => {
  return (
    <MenuLayout listItem={listItemAcount}>
      <AccountInfoContainer />
    </MenuLayout>
  );
};
export default AccountInfo;
