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

  const filteredProductRequests =
    selectedFilter === "all"
      ? productRequests
      : productRequests.filter(
          (feedback) => feedback.status === selectedFilter
        );

  const displayFilter =
    selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1);

  const plannedRequests = productRequests.filter(
    (request) => request.status === "planned"
  );
  const inProgressRequests = productRequests.filter(
    (request) => request.status === "in-progress"
  );
  const liveRequests = productRequests.filter(
    (request) => request.status === "live"
  );

  return (
    <>
      <FeedbackSpace>
        {isMobile && selectedFilter !== "all" && (
          <StatusInfoTitle>
            <h2>
              {displayFilter}{" "}
              <span>
                {displayFilter === "all"
                  ? ""
                  : "(" + getCountByStatus(displayFilter) + ")"}
              </span>
            </h2>
            <p>Features currently being developed</p>
          </StatusInfoTitle>
        )}

        {!isMobile && (
          <CardsContainer>
            <FeedbackColumn
              getCountByStatus={getCountByStatus}
              filteredProductRequests={plannedRequests}
              setData={setData}
              status="planned"
            />
            <FeedbackColumn
              getCountByStatus={getCountByStatus}
              filteredProductRequests={inProgressRequests}
              setData={setData}
              status="in-progress"
            />
            <FeedbackColumn
              getCountByStatus={getCountByStatus}
              filteredProductRequests={liveRequests}
              setData={setData}
              status="live"
            />
          </CardsContainer>
        )}
        {isMobile &&
          productRequests.map((feedback) => {
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

        {/* {filteredProductRequests.map((feedback) => {
            if (feedback.status !== "suggestion") {
              return (
                <FeedbackCard
                  key={feedback.id}
                  feedback={feedback}
                  setData={setData}
                />
              );
            }
          })}  */}
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
  gap: 16px;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    align-items: flex-start;
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