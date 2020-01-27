import React, { Component } from "react";
import { Link } from "react-router-dom";

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

      componentDidMount() {
      }

      componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }
    
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

        //this.props.registerUser(newUser, this.props.history); 
        this.props.createEvent(newEvent, this.props.history); 
    };



    render() {
        // + toDashboard, errors 
        const { eventName, location, date, time, errors } = this.state
    
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
                onChange={this.onChange}/>
              </div>
              <div>
                <label>Location: </label>
                <input 
                id="location"
                type="text" 
                value={location} 
                onChange={this.onChange}/>
              </div>
              <div>
                <label>Date: </label>
                <input
                id="date" 
                type="date" 
                value={date}
                onChange={this.onChange}/>
              </div>
              <div>
                <label>Time: </label>
                <input 
                id="time"
                type="time" 
                value={time} 
                onChange={this.onChange}/>
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
export default CreateEvents;