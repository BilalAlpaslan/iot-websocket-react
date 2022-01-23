import React, { Component } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Model from "./model";

var client = new W3CWebSocket("ws://localhost:8008");

class App extends Component {
  state = {
    data: [],
  };

  buttonClick = (data) => client.send(data)

  componentDidMount() {
    client.onopen = () => console.log("WebSocket Connected");

    client.onmessage = (message) => {
      if (Number.isInteger(parseInt(message.data))) {
        this.setState({ data: this.state.data.concat([message.data]) });

        if (this.state.data.length > 9)
          this.setState({ data: this.state.data.slice(1, this.state.data.length) });

      }
    };
  }

  render() {
    return (
      <div>
        <button onClick={() => this.buttonClick(97)}>aç</button>
        <button onClick={() => this.buttonClick(98)}>kapa</button>
        <div className={"row"} style={{ backgroundColor: "#404040", height: "95vh", width: "200vh" }}>
          <div className={"col-md-6"} style={{ padding: 40 }}>
            {this.state.data.map(data =>
              <div key={data} style={{ color: "white", fontSize: 40 }}>  {data}  </div>
            )}
          </div>
          <div className={"col-md-6"} style={{ backgroundColor: "#808080", padding: 40 }}>
            <div style={{ height: "200", width: "200" }}>
              {/* <Model angle={data%180}/> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
