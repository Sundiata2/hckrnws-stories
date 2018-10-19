import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';

class StoryItem extends Component {
  render() {
    const { by, title, kids, time, id } = this.props.result;
    const timeCreated = new Date(time*1000).toISOString();
    const formattedDate = DateTime.fromISO(timeCreated).toLocaleString(DateTime.DATETIME_MED);
    return (
      <div className="story-item-wrapper">

        <div className="title">{title}</div>

        <div className="middle">
          <div>{`User: ${by}`}</div>
          <div>{formattedDate}</div>
        </div>

        <div>
          {
            // Don't show the link if there's no comments
            kids ?
            <Link to={`/story/${id}`}>{'See Comments'}</Link>
            :
            'No Comments'
          }
        </div>
      </div>
    );
  }
}

export default StoryItem;
