import React, { Component } from 'react'
import { Statistic } from 'semantic-ui-react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getUserStats
} from "../../actions/authActions";

class Stats extends Component {
  componentDidMount() {
    this.props.getUserStats(this.props.auth.user.id);
  }

  render() {
    const { stats } = this.props.auth;
    const statsObject = stats[0];

    let userStats = {
      totalDonations: 0,
      volunteerHours: 0,
      eventsAttended: 0,
      rank: 0
    }
    if(statsObject) {
      userStats.totalDonations = statsObject.totalDonations
      userStats.volunteerHours = statsObject.volunteerHours
      userStats.eventsAttended = statsObject.eventsAttendance
      if(statsObject.contributionRank === '0') {
        userStats.rank = 'Beginner'
      }
    }


    return (
      <div>
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
        <h1>Altrue Stats</h1>
        <div style={{ maxWidth: '80%', margin: 'auto', textAlign: 'center' }}>
          <Statistic.Group style ={{ display: 'inline-block' }}>
            <Statistic label="Total Donations Saved" value={userStats.totalDonations}/>
            <Statistic label='Total Volunteer Hours' value={userStats.volunteerHours} />
            <Statistic label='Events Attended' value={userStats.eventsAttended} />
            <Statistic label='Contribution Rank' value={userStats.rank} />
          </Statistic.Group>
        </div>
      </div>
    )
  }
}

Stats.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { getUserStats }
)(Stats);