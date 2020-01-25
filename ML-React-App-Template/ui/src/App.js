import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        drillbit_size: "",
        min_depth: "",
        max_depth: ""
      },
      result: ""
    };
  }

  handleChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    var formData = this.state.formData;
    formData[name] = value;
    this.setState({
      formData
    });
  };

  handlePredictClick = event => {
    const formData = this.state.formData;
    console.log("Reached form" + str(this.state.formData))
    fetch("http://127.0.0.1:3001", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(formData)
    })
      .then(response => {response.json(); console.log(response.json())})
      .then(response => {
        this.setState({
          result: response.result
        });
})
console.log("Console is here");
console.log(this.state.result);
};

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="drillbit_size"
          type="number"
          id="first"
          onKeyUp={this.handleChange}
        />
        <input
          name="min_depth"
          type="number"
          id="second"
          onKeyUp={this.handleChange}
        />
        <input
          name="max_depth"
          type="number"
          id="third"
          onKeyUp={this.handleChange}
        />
        <button onClick={this.handlePredictClick}>Predict</button>
      </form>
    );
  }
}

export default App;
