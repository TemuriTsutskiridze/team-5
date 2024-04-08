import styled from "styled-components";
import FeedbackCard from "./FeedbackCard";
import FeedbackColumn from "./FeedbackColumn-responsive";
import { useScreenType } from "../window-width/WindowWidth";

export default function FeedBackCardSpace({
  productRequests,
  selectedFilter,
  getCountByStatus,
  setData,
}) {
  const { isMobile, isTablet, isDesktop } = useScreenType();

  // Filter productRequests based on selectedFilter
  const filteredProductRequests = productRequests.filter(
    (feedback) => selectedFilter === "all" || feedback.status === selectedFilter
  );

  // Map the status to its corresponding requests
  const statusToRequestsMap = {
    planned: productRequests.filter((request) => request.status === "planned"),
    "in-progress": productRequests.filter(
      (request) => request.status === "in-progress"
    ),
    live: productRequests.filter((request) => request.status === "live"),
  };

  return (
    <>
      <FeedbackSpace>
        {isMobile && selectedFilter !== "all" && (
          <StatusInfoTitle>
            <h2>
              {selectedFilter}{" "}
              <span>
                {selectedFilter === "all"
                  ? ""
                  : "(" + getCountByStatus(selectedFilter) + ")"}
              </span>
            </h2>
            <p>Features currently being developed</p>
          </StatusInfoTitle>
        )}

        {!isMobile && (
          <CardsContainer>
            <FeedbackColumn
              getCountByStatus={getCountByStatus}
              filteredProductRequests={statusToRequestsMap["planned"]}
              setData={setData}
              status="planned"
            />
            <FeedbackColumn
              getCountByStatus={getCountByStatus}
              filteredProductRequests={statusToRequestsMap["in-progress"]}
              setData={setData}
              status="in-progress"
            />
            <FeedbackColumn
              getCountByStatus={getCountByStatus}
              filteredProductRequests={statusToRequestsMap["live"]}
              setData={setData}
              status="live"
            />
          </CardsContainer>
        )}
        {isMobile &&
          filteredProductRequests.map((feedback) => {
            if (feedback.status !== "suggestion") {
              return (
                <FeedbackCard
                  key={feedback.id}
                  feedback={feedback}
                  setData={setData}
                />
              );
            }
          })}
      </FeedbackSpace>
    </>
  );
}

const FeedbackSpace = styled.main`
  background: rgba(247, 248, 253, 1);
  height: fit-content;
  padding: 24px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 24px;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    align-items: flex-start;
  }

  @media (min-width: 1440px) {
    gap: 30px;
  }
`;

const StatusInfoTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0px 24px 0px;
  margin: auto;
  position: relative;
  left: -60px;
  /* text-align: left;
  align-self: flex-start; */

  & h2 {
    font-size: 18px;
    font-weight: 700;
    line-height: 26.01px;
    letter-spacing: -0.25px;
    color: rgba(58, 67, 116, 1);
  }

  & p {
    font-size: 13px;
    font-weight: 400;
    line-height: 18.79px;
    color: rgba(100, 113, 150, 1);
  }
`;
