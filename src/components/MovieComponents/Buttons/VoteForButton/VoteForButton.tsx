import { useEffect, useState } from "react";
import { useTypedSelector } from "../../../../redux/redux.type";

import toast from "react-hot-toast";
import { FaRegThumbsUp } from "react-icons/fa6";
import { FaRegThumbsDown } from "react-icons/fa6";
import { useVotes } from "../../../../firebase/users/userHook";


function VoteForButton({ movieId }: { movieId: string }) {

  const [alreadyVoted, setAlreadyVoted] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showGenial, setShowGenial] = useState(false);
  const [showMerde, setShowMerde] = useState(false);

  const [userVotes, setUserVotes] = useState([]);

  const user = useTypedSelector(state => state.user);
  const { getOneUserVotes, sendVote } = useVotes();

  useEffect(() => {
    getOneUserVotes(user.userId).then(data => {
      data?.find(vote => vote.movieId === movieId) ? setAlreadyVoted(true) : setAlreadyVoted(false);
    })
  }, [])

  const handleGoodVote = async () => {

    if (alreadyVoted) {
      toast.error("Déjà voté");
      return;
    }

    const vote = {
      movieId,
      userId: user.userId,
      value: 1
    };
    try {
      sendVote(vote);
      toast.success("Vous avez voté pour ce film !");

    } catch (err) {
      console.error(err);
      toast.error("Le vote a échoué. Réessayez.");
    }
  }

  const handleBadVote = async () => {

    if (alreadyVoted) {
      toast.error("Déjà voté");
      return;
    }

    const vote = {
      movieId,
      userId: user.userId,
      value: -1
    };
    try {
      sendVote(vote);
      toast.success("Vous avez démoli ce navet !");

    } catch (err) {
      console.error(err);
      toast.error("Le vote a échoué. Réessayez.");
    }
  }
  
  return (
    <div className="ml-4 relative text-sm" onMouseLeave={() => setShowMenu(false)} onMouseEnter={() => setShowMenu(true)}>
      {!showMenu && <FaRegThumbsUp className="text-2xl" />}
      {showMenu && (
        <div className="absolute top-0 left-0 -translate-x-2 transition-transform duration-500 -translate-y-5 border-1 flex rounded-lg p-2">
          <FaRegThumbsUp
            className="relative hover:text-gray-500 cursor-pointer text-2xl"
            onMouseEnter={() => setShowGenial(true)}
            onMouseLeave={() => setShowGenial(false)}
            onClick={handleGoodVote}
          />
          {showGenial && <div className="absolute p-2 transform origin-bottom -translate-y-20 bg-gray-200 text-black rounded-md">Trop génial</div>}
          
          <FaRegThumbsDown className="relative cursor-pointer hover:text-gray-500 ml-6 rounded-full text-2xl"
            onMouseEnter={() => setShowMerde(true)}
            onMouseLeave={() => setShowMerde(false)}
            onClick={handleBadVote}
          />
          {showMerde && <div className="absolute p-2 transform origin-bottom-right -translate-y-20 bg-gray-200 text-black rounded-md">De la merde</div>}
          
        </div>
      )}
    </div>
  )
}

export default VoteForButton