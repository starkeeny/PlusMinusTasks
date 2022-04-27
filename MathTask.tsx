import React from 'react';

interface MathTaskProps {}
interface MathTaskState {
  points: number;
  n1: number;
  n2: number;
  myResult: number;
  result: number;
  correct: string;
}

/**
 * @extends {Component<MathTaskProps, MathTaskState>}}
 */
export default class MathTask extends React.Component<
  MathTaskProps,
  MathTaskState
> {
  constructor(props: MathTaskProps) {
    super(props);

    this.state = {
      points: 0,
      n1: 0,
      n2: 0,
      operator: '',
      myResult: 0,
      result: 0,
      correct: '',
      calculated: false,
    };

    this.handleResultChange = this.handleResultChange.bind(this);
    this.generateNew = this.generateNew.bind(this);
  }

  componentDidMount() {
    this.generateNew('plus');
  }

  generateNew(operation) {
    let number1 = Math.min(Math.round((Math.random() * 10000) % 31), 30);
    let number2 = 30;

    if (number1 >= 30) {
      number1 = 30;
      number2 = 0;
    } else {
      while (number1 + number2 > 30) {
        number2 = Math.floor(Math.random() * 10000) % (31 - number1);
      }
    }

    if (operation === 'plus') {
      this.setState({
        points: this.state.points,
        n1: number1,
        n2: number2,
        operator: '+',
        myResult: 0,
        result: number1 + number2,
        correct: '',
        calculated: false,
      });
    } else {
      this.setState({
        points: this.state.points,

        n1: number1 + number2,
        n2: number1,
        operator: '-',
        myResult: 0,
        result: number2,

        correct: '',
        calculated: false,
      });
    }
  }

  handleResultChange(event) {
    var myNewResult = parseInt(event.target.value);
    var calculated = this.state.calculated;
    var points = this.state.points;
    if (isNaN(myNewResult)) {
      myNewResult = 0;
    }

    var correctString = '';
    if (myNewResult === this.state.result) {
      correctString = 'korrekt';
      if (!this.state.calculated) {
        calculated = true;
        points++;
      }
    }

    this.setState({
      myResult: myNewResult,
      correct: correctString,
      calculated: calculated,
      points: points,
    });
  }

  render() {
    return (
      <div>
        <div>Punkte: {this.state.points}</div>
        <div>&nbsp;</div>
        <div>
          {this.state.n1} {this.state.operator} {this.state.n2} =
          <input
            type="text"
            value={this.state.myResult}
            onChange={this.handleResultChange}
            onInput={this.handleResultChange}
          />{' '}
          {this.state.correct}
        </div>
        <div>&nbsp;</div>
        <div>
          <button onClick={() => this.generateNew('plus')}>
            nächste + Aufgabe
          </button>
        </div>
        <div>
          <button onClick={() => this.generateNew('minus')}>
            nächste - Aufgabe
          </button>
        </div>
      </div>
    );
  }
}
