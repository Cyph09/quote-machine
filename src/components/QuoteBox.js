import React, { Component } from "react";
import axios from "axios";

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
          error: error.response.data
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
    return (
      <div id="quote-box" className="quoteBox">
        <div className="quoteBox-quote">
          {this.state.isLoading ? (
            <h4>Loading</h4>
          ) : (
            <>
              <p>{this.state.quote}</p>
              <p className="author">-{this.state.author}</p>
            </>
          )}
        </div>
        <div className="quoteBox-controls">
          <a href="#">Tweet Quote</a>
          <button onClick={this.getNewQuote}>New Quote</button>
        </div>
      </div>
    );
  }
}
export default QuoteBox;
