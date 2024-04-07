import styled from "styled-components";
import AddButton from "./AddBtn";
import CancelButton from "./CancelBtn";

export default function BtnContainer() {
  return (
    <ButtonsContainer>
      <AddButton />
      <CancelButton />
    </ButtonsContainer>
  );
}

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 40px;
`;