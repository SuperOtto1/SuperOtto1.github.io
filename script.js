// the constructor method will initiate thecomponent state with timePassedInMilliSeconds property, this is where we will be storing the running time. 
// ---The LOGIC--- // 
// 1 START - calculate time since the user has clicked the start button AND store that time in this.state.timePassedInMilliSeconds.
// 2 STOP - Stop the stop watch, but DOES NOT reset the running time.
// 3 RESET - Reset the stop watch to 0.
class StopWatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timePassedInMilliSeconds : 0
    }

    this.timer = null;


    // we need to bind the methods to the object to use them in the callback functions.
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
  }


// 1- START - equation =  total elapsed time = start time - stop time + last total elapsed time
// Store the start time 
// get the current time and work out how much time has elapsed 
// then store the elapsed time in "this.state.timePassedInMilliSeconds" 
// set the start time to new current time
  start() {
    if (!this.timer) {
      let startTime = Date.now();
      this.timer = setInterval(() => {
      const stopTime = Date.now();
      const timePassedInMilliSeconds = stopTime - startTime + this.state.timePassedInMilliSeconds;

      this.setState({
        timePassedInMilliSeconds,
      });

      startTime = stopTime;
      }, 250);
    }
  }

// 2- STOP - clear the interval and set this.timer to "null". 
  stop() {
    window.clearInterval(this.timer);
    this.timer= null
  }  

// 3- RESET - Calls the stop() method
// resets this.state.timePassedInMilliSeconds back to 0.
  reset() {
    this.stop();
    this.setState({
      timePassedInMilliSeconds: 0
    })
  }



  render() {
    return (
      <div>
        <h2 className="border px-3 py-4 rounded my-3 mx-auto text-center" style = {{maxWidth: "300px"}}>
          {Math.floor(this.state.timePassedInMilliSeconds / 1000)} s
        </h2>
        <div className="d-flex justify-content-center">
          <button className="btn btn-outline-primary mr-2" onClick={this.start}>
            Start
          </button>
          <button className="btn btn-outline-danger mr-2" onClick={this.stop}>
            Stop
          </button>
          <button className="btn btn-outline-warning" onClick={this.reset}>
            Reset
          </button>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <StopWatch />,
  document.getElementById('root')
);