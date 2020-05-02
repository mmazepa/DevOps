import React from 'react';
import './App.css';
import Axios from 'axios';

export default class App extends React.Component {

  state = {
    results: [],
    wynik: "",
    number: ""
  }

  handleForSubmit = (event) => {
    event.preventDefault();

    Axios
      .post(`/api/results`, {
        number: this.state.number
      }).then(response => {
        console.log(response);
        this.setState({
          wynik: response.data.wynik
        })
      }).catch(error => {
        console.log(error);
      })
  };

  handleFormChange = (event) => {
    this.setState({ number: event.target.value });
  };

  handleShowResult = (event) => {
    event.preventDefault();

    Axios
      .get(`/api/results`)
      .then(response => {
        console.log(response);
        this.setState({
          results: response.data
        })
    }).catch(error => {
      console.log(error);
    })
  };

  render() {
    return (
      <div className="App">
        <h1>Ciąg Fibonacciego</h1>
        <div style={{ padding: '25px' }}>
          <form onSubmit={this.handleForSubmit}>
            <label>
              Podaj liczbę:
              <br/>
              <input type="number" name="number" min="0" onChange={this.handleFormChange} />
            </label>
            <br/>
            <button type="submit">Wyślij!</button>
          </form>
          <label>{this.state.wynik}</label>
        </div>
        <div style={{ padding: '25px' }}>
          <form>
            <button onClick={this.handleShowResult}>Historia</button>
            <br/>
            <hr/>
            {this.state.results.map((result) =>
              <span key={result.key} style={{ display: "block" }}>
                fib({result.key}) = {result.value}
              </span>
            )}
            <hr/>
          </form>
        </div>
      </div>
    )
  }
}
