import React, { Component } from "react";
<<<<<<< HEAD
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter, Redirect } from "react-router-dom";
=======
import { Link } from "react-router-dom";
>>>>>>> af249a45e2d20637f2b1f9d0609b968b4425780a

class CreateEvents extends Component {

    constructor() {
        super()
        //Updated from onChange changes
        this.state = {
          eventName: "",
          location: "",
          date: "",
          time: "",
          //toDashboard: false,
          //errors: {}
        };
    }
<<<<<<< HEAD
    
      componentDidMount() {
      }
    
=======

      componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth) {
          this.props.history.push("/events");
        }
      }

>>>>>>> af249a45e2d20637f2b1f9d0609b968b4425780a
      componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }
<<<<<<< HEAD
    
=======

>>>>>>> af249a45e2d20637f2b1f9d0609b968b4425780a
      //Displays text from text field, changing everything in initial state
      onChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        });
      }
<<<<<<< HEAD
    
      //Submit button for register created
      onSubmit = (e) => {
        e.preventDefault();
    
=======

      //Submit button for register created
      onSubmit = (e) => {
        e.preventDefault();

>>>>>>> af249a45e2d20637f2b1f9d0609b968b4425780a
        const newEvent = {
          eventName: this.state.eventName,
          location: this.state.location,
          date: this.state.date,
          time: this.state.time,
        }

        //this.props.registerUser(newUser, this.props.history); 
        this.props.createEvent(newEvent, this.props.history); 
    };



    render() {
        // + toDashboard, errors 
        const { eventName, location, date, time, errors } = this.state
<<<<<<< HEAD
    
=======

>>>>>>> af249a45e2d20637f2b1f9d0609b968b4425780a
        /*if (toDashboard === true) {
          return <Redirect to='/events' />
        }
        */

        return (
          <div>
            <Link 
            to="/">Create an Event!
            </Link>
            <form noValidate onSubmit={this.onSubmit}>
            <div>
                <label>Event Name: </label>
                <input 
                id="eventName"
                type="text" 
                value={eventName} 
<<<<<<< HEAD
                onChange={this.onChange}
                errors={errors.eventName}/>
=======
                onChange={this.onChange}/>
>>>>>>> af249a45e2d20637f2b1f9d0609b968b4425780a
              </div>
              <div>
                <label>Location: </label>
                <input 
                id="location"
                type="text" 
                value={location} 
<<<<<<< HEAD
                onChange={this.onChange}
                errors={errors.location}/>
=======
                onChange={this.onChange}/>
>>>>>>> af249a45e2d20637f2b1f9d0609b968b4425780a
              </div>
              <div>
                <label>Date: </label>
                <input
                id="date" 
                type="date" 
                value={date}
<<<<<<< HEAD
                onChange={this.onChange}
                errors={errors.date}/>
=======
                onChange={this.onChange}/>
>>>>>>> af249a45e2d20637f2b1f9d0609b968b4425780a
              </div>
              <div>
                <label>Time: </label>
                <input 
                id="time"
                type="time" 
                value={time} 
<<<<<<< HEAD
                onChange={this.onChange}
                errors={errors.time}/>
=======
                onChange={this.onChange}/>
>>>>>>> af249a45e2d20637f2b1f9d0609b968b4425780a
              </div>
              <button type="submit">Create Event</button>
            </form>
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
<<<<<<< HEAD
    
=======

>>>>>>> af249a45e2d20637f2b1f9d0609b968b4425780a
export default CreateEvents;