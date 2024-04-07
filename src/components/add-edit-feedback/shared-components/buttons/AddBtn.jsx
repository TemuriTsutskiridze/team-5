import styled from "styled-components";

export default function AddButton() {
  return <AddButtonComponent>Add Feedback</AddButtonComponent>;
}

const AddButtonComponent = styled.button`
  background: rgba(173, 31, 234, 1);
  border-radius: 10px;
  padding: 10.5px 32px;
  width: 100%;

  font-family: Jost;
  font-size: 13px;
  font-weight: 700;
  line-height: 18.79px;
  color: rgba(242, 244, 254, 1);

  &:hover {
    background: rgba(199, 90, 246, 1);
  }
`;