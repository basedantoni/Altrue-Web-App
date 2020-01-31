import 'date-fns';
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
    width: 200,
  },
}));

class CreateEvents extends Component {

  constructor() {
      super()
      //Updated from onChange changes
      this.state = {
        userId: "",
        eventName: "",
        location: "",
        toDashboard: false,
        date: new Date(),
        errors: {}
      };
  }
  //Displays text from text field, changing everything in initial state
  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
    console.log(this.state)
  }
  handleDateChange = date => {
    this.setState({
      date: date
    })
  };

  //Submit button for register created
  onSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      eventName: this.state.eventName,
      location: this.state.location,
      date: this.state.date
    }
  };

  render() {
    console.log(this.props.auth.user.id)
    const { eventName, location, date, time, errors, toDashboard} = this.state

    if (toDashboard === true) {
      return <Redirect to='/events' />
    }

    return (
      <div>
        <form className={useStyles.root} noValidate autoComplete="off" onSubmit={this.onSubmit}>
          <div>
            <TextField 
            label="Event Name" 
            id="eventName"
            type="text"
            value={eventName}
            onChange={this.onChange}
            error={errors.eventName}/>
          </div>
          <div>
            <TextField 
            label="Location" 
            id="location"
            type="text"
            value={location}
            onChange={this.onChange}
            error={errors.location}/>
          </div>
          <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date"
                  label="Date"
                  value={date}
                  onChange={this.handleDateChange}
                  error={errors.date}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                <KeyboardTimePicker
                  margin="normal"
                  id="time"
                  label="Time"
                  value={date}
                  onChange={this.handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </div>
          <Button variant="contained" type="submit">Create Event</Button>
        </form>

        <Link
        to="/events">
          <Button variant="contained" color="primary">Display Events</Button>
        </Link>
      </div>
    )
  }
}

CreateEvents.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { }
)(CreateEvents);