import React, { Component } from "react";
import axios from "axios";
import Quote from "./Quote";
import Button from "./Button";
import TwitterButton from "./TwitterButton";
import randomQuote from "../helpers/randomQuote";

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
        "https://gist.githubusercontent.com/Cyph09/15d53fe78f6960955cf6cb19630d2814/raw/6f1b1574d2ad0335808ea0e31bf6f197a8eaf234/quotes.json"
      )
      .then(response => {
        const { quotes } = response.data;
        let { quote, author } = randomQuote(quotes);
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
      let { quote, author } = randomQuote(quotes);
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
              <Button clicked={this.getNewQuote} name="New Quote" />
            </div>
          </>
        )}
      </div>
    );
  }
}
export default QuoteBox;
