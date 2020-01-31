import React, { Component } from "react";
import MaterialTable from "material-table"; // https://mbrn.github.io/material-table/#/
import { getEvents } from "../actions/eventActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Events extends Component {
  componentDidMount() {
    this.props.getEvents()
  }

  //Display events
  render() {
    const { events } = this.props.events;

    // Setting up data table
    const eventColumns = [
      { title: "Event Name", field: "event" },
      { title: "Date", field: "date", type: "date", defaultSort: "desc" },
      { title: "Location", field: "location" },
      { title: "Time", field: "time" },
      //{ title: "Organization", field: "organization" }
    ];

    let eventData = [];
    
    const eventArray = Object.entries(events);
    for (const entry in eventArray) {
      eventData.push({
        event: events[entry].eventName,
        date: events[entry].date,
        location: events[entry].location,
        time: events[entry].time
      })
    }

    return (
      <div>
        <div style={{ maxWidth: '80%', margin: '30px auto' }}>
          <MaterialTable
          columns={eventColumns}
          data={eventData}
          title="Events"
          />
        </div>
      </div>
    )
  }
}

Events.propTypes = {
  getEvents: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  events: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  events: state.events
});

export default connect(
  mapStateToProps,
  { getEvents }
)(Events);