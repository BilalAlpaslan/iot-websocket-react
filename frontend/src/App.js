import React, { Component } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Page from "./page";

var client = new W3CWebSocket("ws://0.0.0.0:5678");

class App extends Component {
  state = {
    data: [],
  };

  buttonClick=(a)=> client.send(a)

  componentDidMount() {
    client.onopen = () => {
      console.log("WebSocket Connected");
    };
    client.onmessage = (message) => {
      if(Number.isInteger(parseInt(message.data))){
        this.setState({ data: this.state.data.concat([message.data]) });
        if (this.state.data.length > 9){
          this.setState({ data: this.state.data.slice(1, this.state.data.length) });
      }
      }
      
    };
  }

  render() {
    return (
      <div>
        <button onClick={()=>this.buttonClick(97)}>tıkla</button>
        <button onClick={()=>this.buttonClick(98)}>tıkla</button>
        <Page data={this.state.data} />
      </div>
      
    );
  }
}

export default App;
