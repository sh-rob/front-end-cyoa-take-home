import React, { useEffect } from "react";
import Comment from "./components/Comment";
import { useForm } from "react-hook-form";
import styled from "@emotion/styled";
import { useAddComment, useGetComments, deleteComments } from "./api-utils";

import "./App.css";

type FormInput = {
  name: string;
  message: string;
};

type Comment = {
  id: number;
  name: string;
  created: Date;
  message: string;
};

const Wrapper = styled("div")({
  display: "flex",
  width: "100%",
  height: "100%",
  backgroundColor: "#000",
});

const CommentSubmissionWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "50%",
  padding: "18rem 12rem",
});

const CommentBoardWrapper = styled("div")({
  width: "50%",
  padding: "18rem 12rem",
  backgroundColor: "#FFF",
});

const CommentBoardHeader = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

const FormWrapper = styled("form")({
  padding: "6rem",
  backgroundColor: "#FFF",
  borderRadius: "0.5rem",
});

const ScrollContainer = styled("div")({
  height: "500px",
  overflowY: "auto",
  backgroundColor: "#FFF",
  padding: "1rem 3rem",
});

const SendCommentButton = styled("button")({
  backgroundColor: "#FFA500",
  padding: "1rem 2rem",
  borderRadius: "0.75rem",
  width: "100%",
  border: "none",
  cursor: "pointer",
});

const Label = styled("label")({
  display: "flex",
  flexDirection: "column",
  margin: "2rem 0",
});

const Image = styled("img")({
  maxWidth: "100%",
  display: "block",
  cursor: "pointer",
});

const trashcan = require("./trashcan.png");
const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();
  const { mutate, isLoading } = useAddComment();
  const { data, refetch, status } = useGetComments();

  const onSubmit = (data: FormInput) => {
    const { name, message } = data;
    mutate({ name, message });
  };

  useEffect(() => {
    refetch();
  }, [onSubmit]);

  return (
    <Wrapper>
      <CommentSubmissionWrapper>
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <h1>New comment</h1>
          <Label>
            Name
            <input
              {...register("name", { required: "true" })}
              type="text"
              name="name"
            />
            {errors.name && errors.name.type === "required" && (
              <span role="alert" style={{ marginTop: "0.5rem", color: "red" }}>
                This is required
              </span>
            )}
          </Label>
          <Label>
            Message
            <input
              {...register("message", { required: true })}
              type="text"
              name="message"
            />
            {errors.message && errors.message.type === "required" && (
              <span role="alert" style={{ marginTop: "0.5rem", color: "red" }}>
                This is required
              </span>
            )}
          </Label>
          <SendCommentButton type="submit">
            {isLoading ? "Creating comment..." : "Create comment"}
          </SendCommentButton>
        </FormWrapper>
      </CommentSubmissionWrapper>
      <CommentBoardWrapper>
        <CommentBoardHeader>
          <h2>Comments</h2>
          <Image src={trashcan} alt="delete" onClick={() => deleteComments()} />
        </CommentBoardHeader>
        <ScrollContainer>
          {status === "success" &&
            data.map((comment: Comment) => (
              <Comment
                key={comment.id}
                id={comment.id}
                name={comment.name}
                created={comment.created}
                message={comment.message}
              />
            ))}
        </ScrollContainer>
      </CommentBoardWrapper>
    </Wrapper>
  );
};

export default App;
