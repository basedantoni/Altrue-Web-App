import React, { Component } from 'react'
import { Calendar } from 'react-calendar'
import MaterialTable from "material-table"; // https://mbrn.github.io/material-table/#/
import { getCalendarEvents } from "../actions/eventActions";

class AltrueCalendar extends Component {

  state = {
    date: getCalendarEvents(new Date()),
  }

  onChange = date => {
    this.setState({ date })
    getCalendarEvents(date);
  }

  render() {
    console.log(this.state)

    const eventColumns = [
      { title: "Event Name", field: "event" },
      { title: "Date", field: "date", type: "date", defaultSort: "desc" },
      { title: "Location", field: "location" },
      { title: "Time", field: "time" },
      //{ title: "Organization", field: "organization" }
    ];

    return (
      <div style={{ maxWidth: '80%', margin: '30px auto' }}>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />
        <MaterialTable
          title="Events"
          columns={eventColumns}
        />
      </div>
    )
  }

}

export default AltrueCalendar;