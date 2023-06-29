import React from "react";
import styled from "@emotion/styled";

interface Props {
  id: number;
  name: string;
  created: Date;
  message: string;
}

const CommentWrapper = styled("div")({
  padding: "2rem",
  backgroundColor: "#FFF",
  border: "1px solid black",
  margin: "1rem",
  overflow: "scroll",
  borderRadius: "1rem",
});

const CommentHeader = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const Comment = ({ name, created, message }: Props) => {
  const dateString = created.toString();
  const [date, time] = dateString.split(" ");

  return (
    <CommentWrapper>
      <CommentHeader>
        <h2>{name}</h2>
        <p>{time && time}</p>
      </CommentHeader>
      <p>{message}</p>
    </CommentWrapper>
  );
};

export default Comment;
