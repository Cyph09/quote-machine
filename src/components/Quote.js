import React from "react";

const Quote = ({ loading, quote, author }) => (
  <div className="quote">
    {loading ? (
      <p>Loading...</p>
    ) : (
      <>
        <p id="text">{quote}</p>
        <p id="author">~ {author}</p>
      </>
    )}
  </div>
);

export default Quote;
