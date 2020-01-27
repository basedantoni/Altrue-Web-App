import React, { Component } from "react";

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

export default Events;