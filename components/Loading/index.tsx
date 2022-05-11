import React from "react";

const Loading = () => {
  return (
    <div className="container mx-auto max-w-screen-xl relative min-h-[700px]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="animate-spin h-12 w-12 border-4 rounded-[50%] border-[#e0e0e0da] border-t-4 border-t-[#F89736]" />
      </div>
    </div>
  );
};

export default Loading;
