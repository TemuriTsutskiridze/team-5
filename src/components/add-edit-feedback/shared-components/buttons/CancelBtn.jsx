import styled from "styled-components";
import { MyContext } from "../../../../App";
import { useContext } from "react";
import { useLocation } from "react-router";
import { useParams } from "react-router";

export default function CancelButton() {
  const pathname = useLocation().pathname.split("/").at(-1);
  const params = useParams();
  const id = params.id;

  const context = useContext(MyContext);
  return (
    <CancelButtonComponent
      onClick={() => {
        if (pathname === "edit-feedback") {
          context.navigate(`/feedbacks/${params.id}`);
        } else {
          context.navigate(`/feedbacks`);
        }
      }}>
      Cancel
    </CancelButtonComponent>
  );
}

// context.navigate(`/feedbacks/${params.id}`)}

const CancelButtonComponent = styled.button`
  background: rgba(58, 67, 116, 1);
  border-radius: 10px;
  padding: 10.5px 32px;
  width: 100%;

  font-family: Jost;
  font-size: 13px;
  font-weight: 700;
  line-height: 18.79px;
  color: rgba(242, 244, 254, 1);

  @media (min-width: 768px) {
    width: 93px;
    padding: 12px 25px;
    font-size: 14px;
  }

  &:hover {
    background: rgba(101, 110, 163, 1);
  }
`;
