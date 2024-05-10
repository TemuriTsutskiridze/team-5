import styled from "styled-components";
import GoBack from "../../roadmap/Go-back";
import Form from "../shared-components/Form";
import FeedbackTitle from "../shared-components/FdbckTitle";
import Category from "../shared-components/Category";
import FdbckComment from "../shared-components/FdbckComment";
import BtnContainer from "../shared-components/buttons/BtnContainer";
import UpdateStatus from "./UpdateStatus";
import AddButton from "../shared-components/buttons/AddBtn";
import CancelButton from "../shared-components/buttons/CancelBtn";
import { useForm } from "react-hook-form";
import { MyContext } from "../../../App";
import { useContext, useEffect } from "react";
import React, { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditFeedback() {
  const { navigate, setData, data } = useContext(MyContext);

  // find id of currently clicked feedback
  const currFeedbackId = useLocation().pathname.split("/")[2];

  // find all of the current feedback's content
  const currentFeedback = data.productRequests.find(
    (item) => item.id === Number(currFeedbackId)
  );

  const category = currentFeedback.category;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      id: currentFeedback.id,
      title: currentFeedback.title,
      category: currentFeedback.category,
      upvotes: currentFeedback.upvotes,
      status: currentFeedback.status,
      description: currentFeedback.description,
      comments: currentFeedback.comments,
    },
  });

  useEffect(() => {
    reset(
      {
        id: currentFeedback.id,
        "feedback-title": currentFeedback.title,
        category: currentFeedback.category,
        upvotes: currentFeedback.upvotes,
        status: currentFeedback.status,
        "feedback-comment": currentFeedback.description,
        comments: currentFeedback.comments,
      }
      // { keepDefaultValues: false }
    );
  }, []);

  const onSubmit = (formData) => {
    const newFeedbackItem = {
      id: formData.id,
      title: watch("feedback-title"),
      category: formData.category,
      upvotes: formData.upvotes,
      status: formData.status,
      description: watch("feedback-comment"),
      comments: formData.comments,
    };

    const feedbackIndex = data.productRequests.indexOf(currentFeedback);

    setData((prevData) => {
      const newProductRequests = [
        ...prevData.productRequests.slice(0, feedbackIndex),
        newFeedbackItem,
        ...prevData.productRequests.slice(feedbackIndex + 1),
      ];

      return {
        ...prevData,
        productRequests: newProductRequests,
      };
    });
    navigate("/feedbacks");

    // console.log("Form submitted:", formData);
    // console.log("New feedback item:", newFeedbackItem);
    // console.log("Updated data:", data);
  };

  const handleDelete = (feedbackId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this feedback?"
    );
    if (isConfirmed) {
      setData((prevData) => {
        return {
          ...prevData,
          productRequests: prevData.productRequests.filter(
            (item) => item.id !== feedbackId
          ),
        };
      });
      navigate("/feedbacks");
      // toast.success("Feedback deleted successfully!"); // not working.
    }
  };

  return (
    <FeedbackContainer>
      {/* <ToastContainer position="top-center" autoClose={3000} /> */}

      <Header>
        {" "}
        <GoBack />
      </Header>

      <Main>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <img
            id="plus-icon"
            src="/assets/shared/icon-edit-feedback.svg"
            alt="plus icon"
          />
          <h1 id="form-title">Create New Feedback</h1>
          <FeedbackTitle register={register} errors={errors} />
          <Category setValue={setValue} category={category} />
          <UpdateStatus setValue={setValue} />
          <FdbckComment register={register} errors={errors} />
          <BtnContainer>
            <div className="buttons-flex-group"></div>
            <AddButton>Save Changes</AddButton>
            <CancelButton />
            <DeleteButton onClick={() => handleDelete(currentFeedback.id)}>
              Delete
            </DeleteButton>
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

const DeleteButton = styled.button`
  background: rgba(215, 55, 55, 1);

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
    position: relative;
    left: -77px;
  }

  &:hover {
    background: rgba(233, 136, 136, 1);
  }
`;
