import React from 'react';
import './App.css';
import Axios from 'axios';

export default class App extends React.Component {

  state = {
    results: [],
    result: "",
    number: ""
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    Axios.post("/api/results", {
      number: this.state.number
    }).then(response => {
      console.log(response);
      this.setState({
        result: "Wynik: " + response.data.result
      })
    }).catch(error => {
      console.log(error);
    })
  };

  handleFormChange = (event) => {
    this.setState({
      number: event.target.value
    });
  };

  handleShowResults = (event) => {
    event.preventDefault();

    Axios.get("/api/results")
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
        <p>
          Aplikacja umożliwia obliczanie
          wartości ciągu Fibonacciego.
          Należy podać liczbę n oraz kliknąć
          "Wyślij", a zostanie obliczona
          n-ta liczba ciągu Fibonacciego.
          Obliczone dotychczas wartości
          można obejrzeć po kliknięciu
          "Aktualizuj historię".
        </p>
        <div class="mainCalc">
          <form onSubmit={this.handleFormSubmit}>
            <label>
              Podaj liczbę:
            </label>
            <input type="number"
                   name="number"
                   min="0"
                   onChange={this.handleFormChange}
                   required />
            <button type="submit">
              Wyślij
            </button>
          </form>
          <label>
            {this.state.result}
          </label>
        </div>
        <div class="history">
          <form>
            <button onClick={this.handleShowResults}>
              Aktualizuj Historię
            </button>
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
