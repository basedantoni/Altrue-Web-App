import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));


class CreateEvents extends Component {

    constructor() {
        super()
        //Updated from onChange changes
        this.state = {
          eventName: "",
          location: "",
          date: "",
          time: "",
          toDashboard: false,
          //errors: {}
        };
    }

      /*componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth) {
          this.props.history.push("/events");
        }
      }

      componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }*/

      //Displays text from text field, changing everything in initial state
      onChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        });
      }

      //Submit button for register created
      onSubmit = (e) => {
        e.preventDefault();

        const newEvent = {
          eventName: this.state.eventName,
          location: this.state.location,
          date: this.state.date,
          time: this.state.time,
        }

        this.props.createEvent(newEvent, this.props.history); 
    };



    render() {
        // + toDashboard, errors 
        const { eventName, location, date, time, toDashboard} = this.state

        if (toDashboard === true) {
          return <Redirect to='/display-events' />
        }
      

        return (
          <div>
            <Link 
            to="/managerDashboard">Back to Manager Dashboard
            </Link>
            <form className={useStyles.root} noValidate autoComplete="off" onSubmit={this.onSubmit}>
            <div>
              <TextField
              label="Event Name"
              id="eventName"
              type="text"
              value={eventName}
              onChange={this.onChange}/>
              </div>
              <div>
                <TextField
                label="Location"
                id="location"
                type="text" 
                value={location} 
                onChange={this.onChange}/>
              </div>
              <div>
                <TextField
                label="Date "
                id="date" 
                type="date" 
                value={date}
                onChange={this.onChange}/>
              </div>
              <div>
                <TextField
                label="Time"
                id="time"
                type="time" 
                value={time} 
                onChange={this.onChange}/>
              </div>
              <br/>
              <br/>
              <button type="submit">Create Event</button></form>
          </div>
        )
    }
}
    /*
    CreateEvents.propTypes = {
        createEvent: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired,
        //errors: PropTypes.object.isRequired
      }
      
      const mapStateToProps = state => ({
        auth: state.auth,
        errors: state.errors
      });
      
      export default connect(
        mapStateToProps,
        { createEvent }
      )(withRouter(CreateEvents));
      */

      export default CreateEvents;
