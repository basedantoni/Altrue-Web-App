/*import React, { Component } from "react";

class Events extends Component {

    //Collect event data from API
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            isLoaded: false,
        }
    };
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json,
                })
            })
    }

    //Display events
    render() {

        var { isLoaded, items } = this.state;

        if (!isLoaded) {
            return <div>Loading events...</div>;
        }
        else {
            return (
                <div className="Events">

                   <ul>
                       {items.map(item => (
                           <li key={item.id}>
                               Name: {item.name} | Email: {item.email} |
                           </li>
                       ))};
                   </ul>

                </div>
            )
    }
}
}

export default Events;*/

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

function createData(eventName, location, date, time) {
  return { eventName, location, date, time };
}

const rows = [
  createData('Climate March', 'Texas Capitol, Austin, TX', 'March 1st 2020', '10:00AM'),
];

export default function SimpleTable() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><b>Event Name</b></TableCell>
            <TableCell align="right"><b>Location</b></TableCell>
            <TableCell align="right"><b>Date</b></TableCell>
            <TableCell align="right"><b>Time</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.eventName}
              </TableCell>
              <TableCell align="right">{row.location}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
