import React from "react";
// import CardGame from "./CardGame";
/**
 * GameList List
 * @return {JSX.Element} The JSX Code for the GameList
 */

const GameList = () => {
  return (
    <div className="pt-6 sm:pt-12">
      <h2 className="font-bold text-xl sm:text-3xl text-center mb-4 uppercase">
        Danh sách game
      </h2>
      <p className="w-28 h-[1px] m-auto bg-[#f89736]"></p>
      <p className="w-10 m-auto border-t-[5px] border-l-[3px] border-r-[3px] border-t-[#f89736] border-l-transparent border-r-transparent"></p>
      <div className="pt-8 pb-12 grid gap-y-6 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 m-auto xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm">
        {/* {GameLists.map((f) => (
          <CardGame key={f.id} item={f} />
        ))} */}
      </div>
    </div>
  );
};

export default GameList;
