import styled from "styled-components";

export default function FeedbackCard({ feedback }) {
  //   console.log(feedback);

  const commentCount = Array.isArray(feedback.comments)
    ? feedback.comments.length
    : 0;

  return (
    <SingleCard>
      <div className="status-container">
        <div className="status-circle"></div>
        <span className="card-status">{feedback.status}</span>
      </div>
      <h3 className="feedback-title">{feedback.title}</h3>
      <p className="feedback-text">{feedback.description}</p>
      <FeatureIcon>{feedback.category}</FeatureIcon>
      <div className="upvote-comment-container">
        <UpvoteBox>
          <img src="/assets/shared/icon-arrow-up.svg" alt="icon of arrow up" />
          <span className="upvote-count">{feedback.upvotes}</span>
        </UpvoteBox>
        <CommentContainer>
          <img src="/assets/shared/icon-comments.svg" alt="comment icon" />
          <span className="comment-count">{commentCount}</span>
        </CommentContainer>
      </div>
    </SingleCard>
  );
}

const SingleCard = styled.div`
  background: rgba(255, 255, 255, 1);
  border-top: 6px solid rgba(173, 31, 234, 1);
  border-radius: 5px;
  padding: 16px 24px 24px;
  font-size: 13px;
  line-height: 18.79px;
  width: 327px;

  & .status-container {
    display: flex;
    align-items: center;
    gap: 8px;

    & .card-status {
      color: rgba(100, 113, 150, 1);

      font-weight: 400;
    }

    & .status-circle {
      height: 8px;
      width: 9px;
      background: rgba(173, 31, 234, 1);
      border-radius: 50%;
    }
  }

  & .feedback-title {
    font-weight: 700;
    letter-spacing: -0.1805555522441864px;
    color: rgba(58, 67, 116, 1);
    margin-top: 16px;
  }

  & .feedback-text {
    font-weight: 400;
    color: rgba(100, 113, 150, 1);
    margin-top: 9px;
  }

  & .upvote-comment-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
  }
`;

const FeatureIcon = styled.span`
  background: rgba(242, 244, 255, 1);
  padding: 8px 17px;
  border-radius: 10px;
  color: rgba(70, 97, 230, 1);
  font-weight: 600;
  margin-top: 13px;
  display: inline-block;
`;

const UpvoteBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(242, 244, 254, 1);
  padding: 7px 13px;
  width: 69px;
  border-radius: 10px;

  & .upvote-count {
    color: rgba(58, 67, 116, 1);
    font-weight: 700;
    line-height: 18.79px;
  }
`;

const CommentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;