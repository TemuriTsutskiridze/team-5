import styled from "styled-components";
import GoBack from "../../roadmap/Go-back";
import Form from "../shared-components/Form";
import FeedbackTitle from "../shared-components/FdbckTitle";
import Category from "../shared-components/Category";
import FdbckComment from "../shared-components/FdbckComment";
import BtnContainer from "../shared-components/buttons/BtnContainer";
import AddButton from "../shared-components/buttons/AddBtn";
import CancelButton from "../shared-components/buttons/CancelBtn";
import { useForm } from "react-hook-form";
import { MyContext } from "../../../App";
import { useContext } from "react";
// import uuid from "react-uuid";

export default function NewFeedback() {
  // const id = uuid();

  const { navigate, setData, data } = useContext(MyContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      category: "Feature",
      comments: [],
      description: "",
      id: "",
      status: "suggestion",
      title: "",
      upvote: 0,
    },
  });

  const onSubmit = (formData) => {
    const newFeedbackItem = {
      category: formData.category,
      comments: [],
      description: formData["feedback-comment"],
      id: Math.random(),
      status: "suggestion",
      title: formData["feedback-title"],
      upvotes: 0,
    };

    setData((prevData) => {
      return {
        ...prevData,
        productRequests: [...prevData.productRequests, newFeedbackItem],
      };
    });
    navigate("/feedbacks");

    // console.log("Form submitted:", formData);
    // console.log("New feedback item:", newFeedbackItem);
    // console.log("Updated data:", data);
  };

  return (
    <FeedbackContainer>
      <Header>
        {" "}
        <GoBack />
      </Header>

      <Main>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <img
            id="plus-icon"
            src="/assets/shared/icon-new-feedback.svg"
            alt="plus icon"
          />
          <h1 id="form-title">Create New Feedback</h1>
          <FeedbackTitle register={register} errors={errors} />
          <Category setValue={setValue} />
          <FdbckComment register={register} errors={errors} />
          <BtnContainer>
            <AddButton>Add Feedback</AddButton>
            <CancelButton />
          </BtnContainer>
        </Form>
      </Main>
    </FeedbackContainer>
  );
}

const Header = styled.header`
  padding: 34px 24px;
  position: relative;
  right: 125px;

  @media (min-width: 768px) {
    padding: 56px 0px 58px 0px;
    right: 223px;
  }

  @media (min-width: 1440px) {
    padding: 92px 0px 68px 0px;
  }
`;

const FeedbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & #plus-icon {
    position: absolute;
    top: -20px;
    left: 24px;
    width: 40px;

    @media (min-width: 768px) {
      width: 56px;
      top: -29px;
      left: 42px;
    }
  }

  .go-back-flex-group {
    display: flex;
    align-items: center;
    gap: 15.5px;
    color: rgba(100, 113, 150, 1);
    font-size: 13px;
    font-weight: 700;
    line-height: 18.79px;

    @media (min-width: 768px) {
      font-size: 14px;
    }
  }
`;

const Main = styled.div`
  padding: 0px 24px 77px;
  display: flex;
  justify-content: center;
  margin-top: -35px;

  & #form-title {
    font-size: 18px;
    font-weight: 700;
    line-height: 26.01px;
    letter-spacing: -0.25px;
    color: rgba(58, 67, 116, 1);

    @media (min-width: 768px) {
      font-size: 24px;
    }
  }
`;
