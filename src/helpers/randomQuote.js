const randomQuote = arr => {
  const randomQuoteIndex = Math.floor(Math.random() * arr.length);
  let quote = arr[randomQuoteIndex].quote;
  let author = arr[randomQuoteIndex].author;
  return { quote, author };
};

export default randomQuote;
