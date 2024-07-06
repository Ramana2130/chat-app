import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";

const Home = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:h-64 md:h-90 lg:h-[500px] lg:w-3/2 xl:h-112 rounded-lg bg-gray-500 overflow-hidden  bg-opacity-25 backdrop-filter ">
      <Sidebar className="flex-none sm:w-1/4" />
      <MessageContainer className="flex-grow sm:w-3/4" />
    </div>
  );
};

export default Home;
