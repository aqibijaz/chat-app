import React, { Component } from "react";
import { Form, Icon, Input, Button, Row, Col } from "antd";
import io from "socket.io-client";
import { connect } from "react-redux";
import moment from "moment";
import { getChats, afterPostMessage } from "../../../_actions/chat_actions";
import ChatCard from "./Sections/ChatCard";
// https://www.youtube.com/watch?v=OrukPal3mJ4
// 0:49

export class ChatPage extends Component {
  state = {
    chatMessage: "",
  };

  componentDidMount() {
    let server = "http://localhost:5000";
    this.props.dispatch(getChats());
    this.socket = io(server);

    this.socket.on("Output Chat Message", (messageFromBackEnd) => {
      this.props.dispatch(afterPostMessage(messageFromBackEnd));
    });
  }

  hanleSearchChange = (e) => {
    this.setState({
      chatMessage: e.target.value,
    });
  };

  submitChatMessage = (e) => {
    e.preventDefault();
    let userId = this.props.user.userData._id;
    let chatMessage = this.state.chatMessage;
    let userName = this.props.user.userData.name;
    let userImage = this.props.user.userData.image;
    let nowTime = moment();
    let type = "Text";

    this.socket.emit("Input Chat Message", {
      chatMessage,
      userId,
      userName,
      userImage,
      nowTime,
      type,
    });
    this.setState({ chatMessage: "" });
  };

  renderCards = () =>
    this.props.chats.chats &&
    this.props.chats.chats.map((chat) => {
      const sender = chat.sender;
      return (
        // console.log('Chat', chat)

        <ChatCard key={chat._id} {...chat} {...sender} />
      );
    });

  render() {
    return (
      <React.Fragment>
        <div>
          <p style={{ fontSize: "2rem", textAlign: "center" }}>
            Real Time Chat
          </p>
        </div>

        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div className="infinite-container">
            {this.props.chats && <div>{this.renderCards()}</div>}
            <div
              ref={(el) => {
                this.messagesEnd = el;
              }}
              style={{ float: "left", clear: "both" }}
            />
          </div>

          <Row>
            <Form layout="inline" onSubmit={this.submitChatMessage}>
              <Col span={18}>
                <Input
                  id="message"
                  prefix={
                    <Icon type="message" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Let's start talking"
                  type="text"
                  value={this.state.chatMessage}
                  onChange={this.hanleSearchChange}
                />
              </Col>
              <Col span={2}></Col>

              <Col span={4}>
                <Button
                  type="primary"
                  style={{ width: "100%" }}
                  onClick={this.submitChatMessage}
                  htmlType="submit"
                >
                  <Icon type="enter" />
                </Button>
              </Col>
            </Form>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    chats: state.chat,
  };
};

export default connect(mapStateToProps)(ChatPage);
