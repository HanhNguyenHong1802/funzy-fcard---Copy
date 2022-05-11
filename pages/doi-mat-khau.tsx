import ChangePasswordContainer from "@/containers/ChangePasswordContainer";
import MenuLayout from "@/layouts/MenuLayout";
import React from "react";
import { listItemAcount } from "../constants";

const ChangePassword = () => {
  return (
    <MenuLayout listItem={listItemAcount}>
      <ChangePasswordContainer />
    </MenuLayout>
  );
};

export default ChangePassword;
