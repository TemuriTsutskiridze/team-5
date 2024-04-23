import { useParams } from "react-router";
import { useState, useContext } from "react";
import { MyContext } from "../App";
function Feedback() {
  const context = useContext(MyContext);
  const params = useParams();
  let productRequests = context.data.productRequests;
  const id = params.id;
  const map0 = new Map(Object.entries(context.data));
  const map1 = new Map(Object.entries(context.data.productRequests[id - 1]));
  // console.log(map1);

  const choosen = context.data.productRequests[id - 1];
  const choosenClon = { ...choosen };

  let commentsAmout = 0;
  if (choosen.comments) {
    commentsAmout = commentsAmout + choosen.comments.length;
    choosen.comments.map((e) => {
      if (e.replies) {
        return (commentsAmout = commentsAmout + e.replies.length);
      } else {
        return;
      }
    });
  }

  const [commentValue, setCommentValue] = useState();
  const [charLength, setCharLength] = useState("250");
  const [commentError, setCommentError] = useState(true);
  const [validation, setValidation] = useState(false);
  const [countId, setCountId] = useState(16);

  const handleChange = (e) => {
    handleComment(e), inputHandler(e);
  };
  const handleComment = (e) => {
    if (charLength > 0) {
      setCommentValue(e.target.value);
      setCharLength(`${250 - e.target.value.length}`);
    } else {
      setCharLength(charLength);
    }
  };
  const inputHandler = (e) => {
    if (250 - e.target.value.length == "250") {
      setCommentError(true);
    } else {
      setCommentError(false);
    }
  };

  const commentPost = () => {
    if (!Array.isArray(choosenClon.comments)) {
      choosenClon.comments = [];
    }
    if (!commentError) {
      choosenClon.comments.push({
        id: countId,
        content: commentValue,
        user: {
          image: "/assets/user-images/image-zena.jpg",
          name: "Zena Kelley",
          username: "velvetround",
        },
      });
      setCountId(countId + 1);
      map1.set("comments", choosenClon.comments);

      const updatedObj = Object.fromEntries(map1);
      productRequests = [...productRequests][id - 1] = updatedObj;
      // console.log(productRequests);
      map0.set("productRequests", productRequests);
      const updatedData = Object.fromEntries(map0);
      // context.setData(updatedData);
      // console.log(context.data);
      setUseReply(reply0());
      setCommentValue("");
      setCommentError(true);
      setCharLength(250);
    }
    if (commentError) {
      setValidation(true);
    } else {
      setValidation(false);
    }
  };

  console.log(choosen);
  const reply0 = () => {
    return choosen.comments.map((comment) => {
      const replyArray = comment.replies
        ? comment.replies.map(() => ({ reply: false }))
        : [];
      return {
        reply: false,
        replies: replyArray,
      };
    });
  };

  const [useReply, setUseReply] = useState(reply0());

  const handleReply = (index0, index) => {
    let useReplyC = [...useReply];
    if (index || index == 0) {
      useReplyC[index0].replies[index].reply =
        !useReplyC[index0].replies[index].reply;
    } else {
      useReplyC[index0].reply = !useReplyC[index0].reply;
    }
    setUseReply(useReplyC);
  };

  return (
    <div className="bg-[#f7f8fd] flex flex-col items-center gap-6">
      <header className="w-[327px] md:w-[689px] xl:w-[730px] flex items-center justify-between mt-6 xl:mt-10">
        <div className="flex items-center gap-[15.7px] hover:underline hover:cursor-pointer">
          <img src="/assets/shared/icon-arrow-left.svg" alt="arrow_icon" />
          <span
            onClick={() => context.navigate("/feedbacks")}
            className="text-[13px] md:text-sm text-[#647196] font-[700]"
          >
            Go Back
          </span>
        </div>
        <button
          onClick={() => context.navigate(`/feedbacks/${id}/edit-feedback`)}
          className="w-[119px] md:w-[142px] h-10 md:h-11 rounded-[10px] bg-[#4661e6] text-[13px] md:text-sm text-[#f2f4fe] font-[700] hover:bg-[#7c91f9] hover:cursor-pointer"
        >
          Edit Feedback
        </button>
      </header>
      <section className="w-[327px] md:w-[689px] xl:w-[730px] bg-white rounded-[10px] p-6 md:py-[28px] md:px-[32px] mt-6 md:flex md:justify-between">
        <div className="md:flex md:gap-10">
          <div className="hidden md:flex w-[69px] md:w-10 h-[32px] md:h-[53px] rounded-[10px] bg-[#f2f4fe] flex md:flex-col items-center justify-center gap-[10px] md:gap-2 hover:bg-[#cfd7ff] hover:cursor-pointer">
            <img src="/assets/shared/icon-arrow-up.svg" alt="arrow_icon" />
            <span className="text-[13px] text-[#3a4374] font-[700] tracking-[-0.18px]">
              {choosen.upvotes}
            </span>
          </div>
          <div>
            <h1 className="text-[13px] md:text-lg text-[#3a4374] tracking-[-0.18px] md:tracking-[-0.25px] font-[700]">
              {choosen.title}
            </h1>
            <p className="text-[13px] md:text-base text-[#647196] font-[400] mt-[9px] md:mt-1">
              {choosen.description}
            </p>
            <div className="w-[87px] h-[30px] bg-[#f2f4ff] flex items-center justify-center rounded-[10px] mt-[10px] md:mt-3">
              <span className="text-[13px] text-[#4661e6] font-[600]">
                {choosen.category}
              </span>
            </div>
          </div>
        </div>
        <div className="hidden md:flex flex items-center gap-1 md:gap-2">
          <img src="/assets/shared/icon-comments.svg" alt="comments_icon" />
          <span className="text-[13px] md:text-base text-[#3a4374] font-[700] tracking-[-0.18px] md:tracking-[-0.22px]">
            {commentsAmout}
          </span>
        </div>
        <div className="flex items-center justify-between mt-[14px] md:hidden">
          <div className="w-[69px] h-[32px] rounded-[10px] bg-[#f2f4fe] flex items-center justify-center gap-[10px]">
            <img src="/assets/shared/icon-arrow-up.svg" alt="arrow_icon" />
            <span className="text-[13px] text-[#3a4374] font-[700] tracking-[-0.18px]">
              {choosen.upvotes}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <img src="/assets/shared/icon-comments.svg" alt="comments_icon" />
            <span className="text-[13px] text-[#3a4374] font-[700] tracking-[-0.18px]">
              {commentsAmout}
            </span>
          </div>
        </div>
      </section>
      <main className="flex flex-col items-start gap-6 md:gap-[28px] w-[327px] md:w-[689px] xl:w-[730px] bg-white rounded-[10px] py-6 pl-[23px] pr-6 md:px-[32px] md:pt-6 md:pb-[33px] xl:pb-10">
        <h1 className="text-lg text-[#3a4374] font-[700] tracking-[-0.25px]">
          <span>{commentsAmout}</span> Comments
        </h1>
        <div className="flex flex-col gap-6 md:gap-[32px]">
          {choosen.comments
            ? choosen.comments.map((e, index0) => {
                return (
                  <div
                    key={e.id}
                    className={`${
                      index0 < choosen.comments.length - 1
                        ? "border-b border-solid border-[ #8c92b3]"
                        : ""
                    } flex flex-col md:w-[625px] xl:w-[667px] md:flex-row gap-6 md:gap-[5px]`}
                  >
                    {e.replies ? (
                      <div className="hidden md:flex md:flex-col md:items-center md:w-10 md:gap-[12px]">
                        <img
                          className="w-[40px] h-[40px] rounded-full"
                          src={e.user.image}
                          alt="avatar"
                        />
                        <div className="w-10"></div>
                        <div className="hidden md:block md:h-[267px] md:w-[1px] md:border-l md:border-solid md:border-[#647196] md:opacity-10"></div>
                      </div>
                    ) : (
                      <div>
                        <img
                          className="hidden w-10 h-10 rounded-full md:flex"
                          src={e.user.image}
                          alt="avatar"
                        />
                      </div>
                    )}
                    <div className="flex flex-col md:ml-[27px] xl:ml-27 xl:mr-[-41px]">
                      <div className="flex flex-col pb-6 md:pb-[32px] md:w-[553px] xl:w-[594px]">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 md:gap-[32px]">
                            <img
                              className={`${
                                e.replies ? "md:hidden" : "md:hidden"
                              } w-10 h-10 rounded-full`}
                              src={e.user.image}
                              alt="avatar"
                            />
                            <div className="flex flex-col">
                              <span className="text-[13px] md:text-sm text-[#3a4374] font-[700] tracking-[-0.18px]">
                                {e.user.name}
                              </span>
                              <span className="text-[13px] md:text-sm text-[#647196] font-[400]">
                                @{e.user.username}
                              </span>
                            </div>
                          </div>
                          <span
                            onClick={() => handleReply(index0)}
                            className="text-[13px] text-[#4661e6] font-[600] hover:underline hover:cursor-pointer"
                          >
                            Reply
                          </span>
                        </div>
                        <p className="text-[13px] md:text-[15px] text-[#647196] font-[400] mt-4 md:mt-[17px]">
                          {e.content}
                        </p>
                        {useReply[index0].reply ? (
                          <section className="flex items-start justify-between mt-5 xl:mt-6">
                            <textarea
                              placeholder="Type your comment here"
                              className="w-[190px] md:w-[400px] xl:w-[421px] h-[60px] md:h-[95px] bg-[#f7f8fd] rounded-[5px] outline-none resize-none p-2 md:p-3  text-[13px] md:text-[15px] text-[#3a4374] font-[400] hover:cursor-pointer hover:border hover:border-solid hover:border-[#4661e6]"
                            />
                            <button className="w-[80px] md:w-[117px] h-[28px] md:h-10 xl:h-11 rounded-[10px] bg-[#ad1fea] text-[13px] xl:text-sm text-[#f2f4fe] font-[700] hover:bg-[#c75af6] hover:cursor-pointer">
                              Post Reply
                            </button>
                          </section>
                        ) : (
                          ""
                        )}
                      </div>
                      {e.replies ? (
                        <section className="w-[280px] md:w-[604px] xl:w-[621px] flex gap-[23px] md:ml-[-27px]">
                          <div className="h-[216px] w-[1px] border-l border-solid border-[#647196] opacity-10 md:hidden"></div>
                          <div>
                            {e.replies.map((e, index) => {
                              return (
                                <div
                                  key={index}
                                  className="flex flex-col pb-6 md:pb-[17px]"
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 md:gap-[32px]">
                                      <img
                                        className="w-10 h-10 rounded-full"
                                        src={e.user.image}
                                        alt="avatar"
                                      />
                                      <div className="flex flex-col">
                                        <span className="text-[13px] md:text-sm text-[#3a4374] font-[700] tracking-[-0.18px]">
                                          {e.user.name}
                                        </span>
                                        <span className="text-[13px] md:text-sm text-[#647196] font-[400]">
                                          {e.user.username}
                                        </span>
                                      </div>
                                    </div>
                                    <span
                                      onClick={() => handleReply(index0, index)}
                                      className="text-[13px] text-[#4661e6] font-[600] hover:underline hover:cursor-pointer"
                                    >
                                      Reply
                                    </span>
                                  </div>
                                  <p className="md:w-[508px] xl:w-[548px] text-[13px] md:text-[15px] text-[#647196] font-[400] mt-4 xl:mt-[17px] md:mt-[10px] md:ml-[72px]">
                                    <span className="text-[#ad1fea] font-[700]">
                                      {e.replyingTo}
                                    </span>{" "}
                                    {e.content}
                                  </p>
                                  {useReply[index0].replies[index].reply ? (
                                    <section className="flex items-start justify-between mt-5 md:ml-[72px]">
                                      <textarea
                                        className="w-[175px] md:w-[350px] xl:w-[400px] h-[60px] md:h-[90px] bg-[#f7f8fd] rounded-[5px] outline-none resize-none p-2 md:p-3 text-[13px] md:text-sm text-[#3a4374] font-[400] hover:cursor-pointer hover:border hover:border-solid hover:border-[#4661e6]"
                                        placeholder="Type your comment here"
                                        name=""
                                        id=""
                                        cols="30"
                                        rows="10"
                                      ></textarea>
                                      <button className="w-[70px] md:w-[100px] h-[28px] md:h-[35px] rounded-[10px] bg-[#ad1fea] text-[13px] md:text-sm text-[#f2f4fe] font-[700] hover:bg-[#c75af6] hover:cursor-pointer">
                                        Post Reply
                                      </button>
                                    </section>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </section>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      </main>
      <section className="w-[327px] md:w-[689px] xl:w-[730px] bg-white rounded-[10px] p-6 md:pl-[34px] md:pr-[32px] md:pb-[32px] mb-20">
        <h1 className="text-lg text-[#3a4374] font-[700] tracking-[-0.25px]">
          Add Comment
        </h1>
        <div className="flex flex-col gap-1">
          <textarea
            onChange={handleChange}
            className={`${
              commentError && charLength > 249 && validation
                ? "border border-solid border-[#d73737]"
                : "border-none"
            } outline-none resize-none w-[279px] md:w-[623px] xl:w-[664px] h-20 md:h-[80px] p-4 break-all text-[13px] md:text-sm xl:text-[15px] text-[#3a4374] font-[400] rounded-[5px] bg-[#f7f8fd] placeholder:text-[13px] md:placeholder:text-sm xl:placeholder:text-[15px] placeholder:text-[#8c92b3] placeholder:font-[500] mt-6 hover:cursor-pointer hover:border hover:border-solid hover:border-[#4661e6]`}
            placeholder="Type your comment here"
            value={commentValue}
            type="text"
            name=""
            id=""
          />
          {commentError && charLength > 249 && validation ? (
            <span className="text-xs text-red-500 font-[500] ml-1">
              Can’t be empty
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-[13px] md:text-[15px] text-[#647196] font-[400]">
            <span>{charLength}</span> Characters left
          </p>
          <button
            onClick={commentPost}
            className="w-[119px] md:w-[142px] h-10 md:h-[44px] bg-[#ad1fea] rounded-[10px] text-[13px] md:text-sm text-[#f2f4fe] font-[700] hover:bg-[#c75af6] hover:cursor-pointer"
          >
            Post Comment
          </button>
        </div>
      </section>
    </div>
  );
}

export default Feedback;
