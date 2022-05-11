import Banner from "@/components/Banner";
import Feature from "@/components/Feature";
import GameList from "@/components/GameList";
import React from "react";

const HomeContainer = () => {
  return (
    <div style={{ marginTop: "52px" }}>
      <Banner />
      <Feature />
      <GameList />
    </div>
  );
};

export default HomeContainer;
