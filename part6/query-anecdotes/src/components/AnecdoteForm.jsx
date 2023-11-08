import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createAnecdote } from "../requests";
import { useContext } from "react";
import MessageContext from "../MessageContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const [message, dispatch] = useContext(MessageContext);

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
      dispatch({
        type: "SET_MESSAGE",
        payload: `Created ${newAnecdote.content}`,
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_MESSAGE" });
      }, 5000);
    },
    onError: (error) => {
      console.error(error);
      dispatch({
        type: "SET_MESSAGE",
        payload: `Error: content too short. Content must be 5 characters`,
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_MESSAGE" });
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
