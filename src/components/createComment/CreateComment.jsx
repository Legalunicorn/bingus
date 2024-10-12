import { useState } from "react";
import "./createComment.scss";
import { Form } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFetch } from "../../hooks/useFetch";
import { toast } from "react-toastify";
const CreateComment = ({ postId }) => {

  const [comment, setComment] = useState("");
  const postComment = useFetch();
  const queryClient = useQueryClient();

  const handleSubmit = (e) => {
    e.preventDefault();
    createCommentMutation.mutate(); //prom props
  };

  const createCommentMutation = useMutation({
    mutationFn: () =>
      postComment(`/comments`, {
        method: "POST",
        body: JSON.stringify({
          postId,
          body: comment,
        }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["post", postId], { exact: true });
      setComment("");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <Form className="create-comment" onSubmit={handleSubmit}>
      <TextareaAutosize
        value={comment}
        className="textarea"
        placeholder="Type a comment.."
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <button disabled={createCommentMutation.isPending}>Post</button>
    </Form>
  );
};

export default CreateComment;
