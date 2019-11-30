import React from "react";
const TwitterButton = ({ quote, author }) => (
  <a
    id="tweet-quote"
    className="btn twitter-share-button"
    href={`https://twitter.com/intent/tweet?text="${quote}" ${author}`}
    target="_blank"
  >
    Tweet
  </a>
);

export default TwitterButton;
