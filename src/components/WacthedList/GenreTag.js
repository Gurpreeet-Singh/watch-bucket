import React from "react";

const GenreTag = ({ genre }) => {
  return (
    <h5 className="bg-yellow-300 text-yellow-700 rounded font-medium px-2">
      {genre}
    </h5>
  );
};

export default GenreTag;
