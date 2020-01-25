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
    console.log("value" + event.target.value);
    console.log("name" + event.target.name);
    var formData = this.state.formData;
    formData[name] = value;
    this.setState({
      formData
    });
  };

  handlePredictClick = event => {
    const formData = this.state.formData;
    fetch("localhost:8000/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          result: response.result
        });
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="drillbit_size"
          type="number"
          id="first"
          onChange={this.handleChange}
        />
        <input
          name="min_depth"
          type="number"
          id="second"
          onChange={this.handleChange}
        />
        <input
          name="max_depth"
          type="number"
          id="third"
          onChange={this.handleChange}
        />
        <button onClick={this.handlePredictClick}>Predict</button>
      </form>
    );
  }
}

export default App;
