import React from 'react';
import {Link} from "react-router-dom";

const JokeList = props => {
  return (
    <div className="jokes-parent">
      {props.jokes.map(j => {
        return (
          <div key={j._id} className="jokesWrapper">
            <div className="innerJoke">
              <h5>{j.setup}</h5>
              <p>"{j.punchline}"</p>
            </div>
            <div className="actionBtn">
              <Link to={{ pathname: `/edit-joke/${j._id}`, _id: j._id}}>Edit</Link>
              <button onClick={() => props.deleteJoke(j._id)}>Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default JokeList;
