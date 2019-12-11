
import React, { Component } from 'react'
import { Statistic } from 'semantic-ui-react'

class Stats extends Component {
  render() {
    return (
      <div>
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
        <h1>Stats</h1>
        <div style={{ maxWidth: '80%', margin: 'auto', textAlign: 'center' }}>
          <Statistic.Group style ={{ display: 'inline-block' }}>
            <Statistic label="Total Donations Saved" value='$208'/>
            <Statistic label='Total Volunteer Hours' value='Twenty' text />
            <Statistic label='Events Attended' value='5' />
            <Statistic label='Contribution Rank' value='42' />
          </Statistic.Group>
        </div>
      </div>
    )
  }
}

export default Stats;