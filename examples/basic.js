/* @jsx h */
'use strict';

const {h, render, Component, Text} = require('ink');
const ProgressBar = require('../src/progress-bar');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const TASKS = 30;

class ProgressApp extends Component {
  constructor() {
    super();

    this.state = {
      done: 0
    };
  }

  render() {
    const text = 'Running ';

    return (
      <div>
        <Text green>
          {text}
        </Text>

        <ProgressBar
          blue
          left={text.length}
          percent={this.state.done / TASKS}
        />
      </div>
    );
  }

  componentDidMount() {
    const promises = Array.from({length: TASKS}, () => {
      return delay(Math.floor(Math.random() * 1500))
        .then(() => {
          this.setState(state => ({
            done: state.done + 1
          }));
        });
    });

    Promise.all(promises)
      .then(() => delay(50))
      .then(() => process.exit(0)); // eslint-disable-line unicorn/no-process-exit
  }
}

render(<ProgressApp/>);
