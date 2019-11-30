import React, { Component } from "react";
import axios from "axios";
import Quote from "./Quote";
import Button from "./Button";
import TwitterButton from "./TwitterButton";

function generateRandomQuote(arr) {
  const randomQuoteIndex = Math.floor(Math.random() * arr.length);
  let quote = arr[randomQuoteIndex].quote;
  let author = arr[randomQuoteIndex].author;
  return { quote, author };
}

class QuoteBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: true,
      quotes: [],
      quote: "",
      author: ""
    };

    this.getNewQuote = this.getNewQuote.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        "https://gist.githubusercontent.com/irkreja/5f35dc197c6be4ddc32a45acdd23fcd7/raw/0d9b85d4a9d9da9dc67fa0257df66ed80702ff3a/quotes.json"
      )
      .then(response => {
        const { quotes } = response.data;
        let { quote, author } = generateRandomQuote(quotes);
        this.setState({
          quotes,
          quote,
          author,
          isLoading: false
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          error: error
        });
      });
  }

  getNewQuote() {
    const { quotes } = this.state;

    if (quotes && quotes.length) {
      let { quote, author } = generateRandomQuote(quotes);
      this.setState({ quote, author });
    }
  }
  render() {
    const { isLoading, quote, author, error } = this.state;
    return (
      <div id="quote-box">
        {error ? (
          <h3>Opss...Something is not right. Please try again leter..!</h3>
        ) : (
          <>
            <Quote loading={isLoading} quote={quote} author={author} />
            <div className="quoteBox-buttons">
              <TwitterButton quote={quote} author={author} />
              <Button
                id="new-quote"
                clicked={this.getNewQuote}
                name="New Quote"
              />
            </div>
          </>
        )}
      </div>
    );
  }
}
export default QuoteBox;
