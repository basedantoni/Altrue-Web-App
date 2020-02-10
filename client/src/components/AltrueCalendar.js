import React, { Component } from 'react'
import { Calendar } from 'react-calendar'
import MaterialTable from "material-table"; // https://mbrn.github.io/material-table/#/
import { getCalendarEvents } from "../actions/eventActions";
import { connect } from "react-redux";

class AltrueCalendar extends Component {
  componentDidMount() {
    this.props.getCalendarEvents(new Date());
  }

  onChange = date => {
    this.props.getCalendarEvents(date);
  }

  render() {
    const { calendarEvents } = this.props.events

    const eventColumns = [
      { title: "Event Name", field: "name" },
      { title: "Date", field: "date", type: "date", defaultSort: "desc" },
      { title: "Location", field: "location" },
    ];

    let calendarData = []

    for(const entry in calendarEvents) {
      calendarData.push({
        event: calendarEvents[entry].name,
        date: calendarEvents[entry].date,
        location: calendarEvents[entry].location,
      })
    }

    return (
      <div style={{ maxWidth: '80%', margin: '30px auto' }}>
        <Calendar
          onChange={this.onChange}
          value={new Date()}
        />
        <MaterialTable
          title="Events"
          data={calendarEvents}
          columns={eventColumns}
        />
      </div>
    )
  }

}

const mapStateToProps = state => ({
  events: state.events
});

export default connect(mapStateToProps, { getCalendarEvents })(AltrueCalendar);