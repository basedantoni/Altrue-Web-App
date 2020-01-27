import React, { Component } from "react";
<<<<<<< HEAD
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter, Redirect } from "react-router-dom";


class Events extends Component {
    
=======

class Events extends Component {

>>>>>>> af249a45e2d20637f2b1f9d0609b968b4425780a
    //Collect event data from API
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            isLoaded: false,
        }
    };
<<<<<<< HEAD
    
=======

>>>>>>> af249a45e2d20637f2b1f9d0609b968b4425780a
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
<<<<<<< HEAD
    
=======

>>>>>>> af249a45e2d20637f2b1f9d0609b968b4425780a
    //Display events
    render() {

        var { isLoaded, items } = this.state;

        if (!isLoaded) {
            return <div>Loading events...</div>;
        }
        else {
            return (
                <div className="Events">
<<<<<<< HEAD
                   
=======

>>>>>>> af249a45e2d20637f2b1f9d0609b968b4425780a
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

export default Events;