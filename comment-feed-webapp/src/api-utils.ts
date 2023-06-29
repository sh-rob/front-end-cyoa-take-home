import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";

const URL = "http://localhost:3001/";

const addComment = (comment: any) => {
  return axios.post(`${URL}createComment`, comment);
};

const getComments = () => {
  return axios.get(`${URL}getComments`).then((res) => res.data);
};

export const deleteComments = () => {
  return axios.delete(`${URL}deleteComments`);
};

export const useAddComment = () => {
  return useMutation(addComment);
};

export const useGetComments = () => {
  return useQuery(["comments"], getComments, { enabled: false });
};

export const useDeleteComments = () => {
  return useMutation(deleteComments);
};
