import React, { useState, useEffect } from 'react';
import { collection, doc, onSnapshot, runTransaction } from 'firebase/firestore';
import { firestore } from './firebaseConfig';
import './App.css';

const App = () => {
  const [votes, setVotes] = useState({ option1: 0, option2: 0 });

  useEffect(() => {
    // Subscribe to vote updates
    const voteRef = doc(firestore, 'votes', 'voteCounts');
    const unsubscribe = onSnapshot(voteRef, (doc) => {
      if (doc.exists()) {
        setVotes(doc.data());
      } else {
        // Handle the case where the document does not exist
      }
    });
  
    // Clean up listener on unmount
    return () => unsubscribe();
  }, []);

  const handleVote = (option) => {
    const voteRef = doc(firestore, 'votes', 'voteCounts');
    runTransaction(firestore, async (transaction) => {
      const voteDoc = await transaction.get(voteRef);
      if (!voteDoc.exists()) {
        throw "Document does not exist!";
      }
      const newVoteCount = voteDoc.data()[option] + 1;
      transaction.update(voteRef, { [option]: newVoteCount });
    });
  };

  return (
    <div id="app">
      <div className="title">Quem vai morrer primeiro?</div>
      <div className="options-container">
        <div className="option">
          <div>Marcelinho medida provisória</div>
          <button className="vote-button" onClick={() => handleVote('option1')}>+1</button>
          <div className="vote-count">Votos: {votes.option1}</div>
        </div>
        <div className="option">
          <div>Chicão das casadas</div>
          <button className="vote-button" onClick={() => handleVote('option2')}>+1</button>
          <div className="vote-count">Votos: {votes.option2}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
