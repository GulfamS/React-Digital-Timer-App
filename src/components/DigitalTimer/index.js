import {Component} from 'react'
import './index.css'

const initialState = {
  isTimeRunning: false,
  timeInSeconds: 0,
  timeInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnamount = () => {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseTimerLimitInMin = () => {
    const {timeInMinutes} = this.state
    if (timeInMinutes > 1) {
      this.setState(prevState => ({timeInMinutes: prevState.timeInMinutes - 1}))
    }
  }

  onIncreaseTimerLimitInMin = () => {
    this.setState(prevState => ({timeInMinutes: prevState.timeInMinutes + 1}))
  }

  renderTimeLimitController = () => {
    const {timeInSeconds, timeInMinutes} = this.state
    const isButtonDisable = timeInSeconds > 0

    return (
      <div className="timer-limit-controller">
        <p className="limit-title">Set Timer Limit</p>
        <div className="timer-controller-container">
          <button
            className="time-limit-btn"
            type="button"
            disabled={isButtonDisable}
            onClick={this.onDecreaseTimerLimitInMin}
          >
            -
          </button>
          <div className="limit-label-value-container">
            <p className="limit-value">{timeInMinutes}</p>
          </div>
          <button
            className="time-limit-btn"
            type="button"
            disabled={isButtonDisable}
            onClick={this.onIncreaseTimerLimitInMin}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  increamentTimeInSeconds = () => {
    const {timeInMinutes, timeInSeconds} = this.state
    const isTimeCompleted = timeInSeconds === timeInMinutes * 60

    if (isTimeCompleted) {
      this.clearTimerInterval()
      this.setState({isTimeRunning: false})
    } else {
      this.setState(prevState => ({timeInSeconds: prevState.timeInSeconds + 1}))
    }
  }

  onStartOrPauseTime = () => {
    const {isTimeRunning, timeInSeconds, timeInMinutes} = this.state
    const isTimeCompleted = timeInSeconds === timeInMinutes * 60

    if (isTimeCompleted) {
      this.setState({timeInSeconds: 0})
    }
    if (isTimeRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.increamentTimeInSeconds, 1000)
    }
    this.setState(prevState => ({isTimeRunning: !prevState.isTimeRunning}))
  }

  renderTimeController = () => {
    const {isTimeRunning} = this.state
    const startOrPauseImgUrl = isTimeRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimeRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-controller">
        <button
          type="button"
          className="time-control-btn"
          onClick={this.onStartOrPauseTime}
        >
          <img
            src={startOrPauseImgUrl}
            alt={startOrPauseAltText}
            className="time-control-icon"
          />
          <p className="time-control-label">
            {isTimeRunning ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          type="button"
          className="time-control-btn"
          onClick={this.onResetTimer}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            className="time-control-icon"
            alt="reset icon"
          />
          <p className="time-control-label">Reset</p>
        </button>
      </div>
    )
  }

  getSecondsInTimeFormat = () => {
    const {timeInMinutes, timeInSeconds} = this.state
    const totalRemainingSeconds = timeInMinutes * 60 - timeInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimeRunning} = this.state
    const labelText = isTimeRunning ? 'Running' : 'Paused'

    return (
      <div className="app-container">
        <h1 className="timer-heading">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-display-container">
            <div className="elapsed-time-container">
              <h1 className="elapsed-time">{this.getSecondsInTimeFormat()}</h1>
              <p className="timer-state">{labelText}</p>
            </div>
          </div>
          <div className="controls-container">
            {this.renderTimeController()}
            {this.renderTimeLimitController()}
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
