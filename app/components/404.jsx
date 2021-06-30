import React, { Component } from 'react';
import Treachery from 'resources/treachery.jpg';
import { withRouter } from 'react-router-dom';

class NotFound extends Component {
  render() {
    return(
      <div id="404">
        <h2>The requested pipeline or page could not be found.</h2>
        <div>
          <img
            src={Treachery}
            alt="The Treachery of Images: This is not a pipe nor a territory."
            id="treachery"
          />
        </div><div>
          <br/>
          <div id="image_credit">
            Image credit: "<a href="https://www.flickr.com/photos/10688882@N00/18658146046">The Treachery of Images</a>" by Bill Smith (<a href="https://creativecommons.org/licenses/by/2.0">CC BY 2.0</a>) alluding to <i>The Treachery of Images</i> by Ren&eacute; Magritte.
          </div>
        </div>
      </div>
    )
  }
}

export default NotFound;