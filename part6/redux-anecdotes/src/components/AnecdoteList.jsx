import { useDispatch, useSelector } from "react-redux";
import { createVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) =>
    state.anecdotes.filter((a) =>
      a.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  );
  const sortByVotes = (state) => {
    return state.sort((a, b) => b.votes - a.votes);
  };

  const handleVote = (anecdote) => {
    dispatch(createVote(anecdote));
    dispatch(setNotification(`You voted for ${anecdote.content}`, 5));
  };

  return (
    <div>
      {sortByVotes(anecdotes).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
