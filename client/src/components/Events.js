import React, { Component } from "react";
import MaterialTable from "material-table"; // https://mbrn.github.io/material-table/#/

class Events extends Component {
  componentDidMount() {

  }

  //Display events
  render() {

    // Setting up data table
    const eventColumns = [
      { title: "Event Name", field: "event" },
      { title: "Date", field: "date", type: "date", defaultSort: "desc" },
      { title: "Location", field: "location" },
      { title: "Time", field: "time" },
      { title: "Organization", field: "organization" }
    ];

    let eventData = [];

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

export default Events;