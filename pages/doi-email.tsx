import ChangeEmailContainer from "@/containers/ChangeEmailContainer";
import MenuLayout from "@/layouts/MenuLayout";
import React from "react";
import { listItemAcount } from "../constants";

const ChangeEmail = () => {
  return (
    <MenuLayout listItem={listItemAcount}>
      <ChangeEmailContainer />
    </MenuLayout>
  );
};

export default ChangeEmail;
