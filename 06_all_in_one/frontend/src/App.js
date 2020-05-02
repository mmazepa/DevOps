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
        <div class="mainCalc">
          <form onSubmit={this.handleForSubmit}>
            <label>
              Podaj liczbę:
            </label>
            <input type="number" name="number" min="0" onChange={this.handleFormChange} required />
            <button type="submit">Wyślij!</button>
          </form>
          <label>{this.state.wynik}</label>
        </div>
        <div class="history">
          <form>
            <button onClick={this.handleShowResult}>Historia</button>
            <table>
              <tr>
                <th>n</th>
                <th>n-ta liczba Fibonacciego</th>
              </tr>
              {this.state.results.map((result) =>
                <tr key={result.key}>
                  <td>{result.key}</td>
                  <td>{result.value}</td>
                </tr>
              )}
            </table>
          </form>
        </div>
      </div>
    )
  }
}
