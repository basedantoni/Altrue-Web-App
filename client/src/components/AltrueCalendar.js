import React, { Component } from 'react'
import { Calendar } from 'react-calendar'

class AltrueCalendar extends Component {

  state = {
    date: new Date(),
  }

  onChange = date => this.setState({ date })

  render() {
    console.log(this.state.date)

    return (
      <div>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />
      </div>
    )
  }

}

export default AltrueCalendar;