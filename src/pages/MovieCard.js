import React from "react";

const MovieCard = (props) => {
  const { item,onClick } = props;
  return (
    <div className="card-container" onClick={onClick}> 
      <div className="card-inner">
        <div className="left">
          <div className="poster" style={{backgroundImage:`url(${item.Poster})`}}>
       
          </div>
        </div>
        <div className="right">
          <div className="top">{item.Title}</div>
          <div className="mid">
            <div className="type">Type :{item.Type}</div>
            <div className="year">Year :{item.Year}</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
