import 'date-fns';
import React, { Component } from "react";
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
import { createEvent } from "../actions/eventActions"

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
        organization: "",
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
  }
  handleDateChange = date => {
    this.setState({
      date: date
    })
  };

  //Submit button for event created
  onSubmit = (e) => {

    const newEvent = {
      eventName: this.state.eventName,
      location: this.state.location,
      date: this.state.date,
      organization: this.state.organization
    }

    this.props.createEvent(newEvent);
  };

  render() {
    const {eventName, location, date, errors} = this.state

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
      </div>
    )
  }
}

CreateEvents.propTypes = {
  auth: PropTypes.object.isRequired,
  events: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  events: state.events
});

export default connect(
  mapStateToProps,
  { createEvent }
)(CreateEvents);