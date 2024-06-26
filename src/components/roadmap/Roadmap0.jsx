import { MyContext } from "../../App";
import styled from "styled-components";
import Header from "./Header";
import RoadMapFilter from "./RoadmapFilter";
import { useState, useContext } from "react";
import { useScreenType } from "./window-width/WindowWidth";
import FeedBackCardSpace from "./feedbackcards/FeedbackCardSpace";

export default function RoadMap() {
  const context = useContext(MyContext);
  const data = context.data;
  const setData = context.setData;
  const [selectedFilter, setSelectedFilter] = useState("all");
  const { productRequests } = data;
  const getCountByStatus = (statusName) => {
    return productRequests.filter((request) => request.status === statusName)
      .length;
  };

  const { isMobile, isTablet, isDesktop } = useScreenType(); // this might stay here. let's see

  return (
    <>
      <Header />
      {isMobile && (
        <RoadMapFilter
          getCountByStatus={getCountByStatus}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          productRequests={productRequests}
        />
      )}

      <FeedBackCardSpace
        getCountByStatus={getCountByStatus}
        selectedFilter={selectedFilter}
        productRequests={productRequests}
        data={data}
        setData={setData}
      />
    </>
  );
}

const Main = styled.main``;
