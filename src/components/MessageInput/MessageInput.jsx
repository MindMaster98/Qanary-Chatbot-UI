import React, { Component } from "react";
import { Button } from "..";
import "./MessageInput.css";
import { textsHelper } from "../../helpers";

export default class MessageInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
    };

    this.texts = textsHelper.getTexts();

    this.onSendMessage = this.onSendMessage.bind(this);
    this.inputTextChange = this.inputTextChange.bind(this);
    this.inputKeyPress = this.inputKeyPress.bind(this);
  }

  componentDidMount() {
    textsHelper.addListener("message-input", () => {
      this.texts = textsHelper.getTexts();
      this.forceUpdate();
    })
  }

  componentWillUnmount() {
    textsHelper.removeListener("message-input");
  }

  onSendMessage() {
    if (this.state.query.length > 0) {
      this.props.sendMessage(this.state.query);
      this.setState({ query: "" });
    }
  }

  inputTextChange(changeEvent) {
    if (changeEvent.target.value !== "\n") this.setState({ query: changeEvent.target.value });
  }

  inputKeyPress(keyPressEvent) {
    if (keyPressEvent.key === "Enter") {
      this.onSendMessage();
    }
  }

  render() {
    return (
      <>
        <div
          id="loadingBar"
          tabIndex="-1"
          className={this.props.isSending ? "visible" : ""}
        />
        <div tabIndex="-1" id="messageInput">
          <textarea
            id="inputTextBox"
            placeholder={this.texts["message-input"]["placeholder-text"]}
            className="black-text"
            value={this.state.query}
            onChange={this.inputTextChange}
            onKeyPress={this.inputKeyPress}
          />
          <div id="submitButtonContainer" tabIndex="-1">
            <Button
              text={this.texts["message-input"]["submit-button"]}
              onClick={this.onSendMessage}
              style={{
                width: "100px",
                height: "40px",
                marginRight: "10px",
              }}
              className={"light-gray black-text vertical-center right-side"}
            />
          </div>
        </div>
      </>
    );
  }
}
