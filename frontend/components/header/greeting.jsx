import React from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import SessionFormContainer from '../session/session_form_container';
import FeaturedGymsIndex from './featured_gyms_index';
import SearchContainer from '../search/search_container';

class Greeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: ''};
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
  }

  toggleDropdown() {
    if (this.state.active === 'active') {
      this.setState({ active: '' });
    } else {
      this.setState({ active: 'active'});
    }
  }

  closeDropdown(e) {
    setTimeout(() => this.setState({ active: ''}), 200);
  }

  sessionForm() {
    return(
      <SessionFormContainer />
    );
  }

  currUser() {
    if (this.props.currentUser) {
      return ` $<strong>{this.props.currentUser.username}!</strong>`
    } else {
      return "!"
    }
  }
  greeting(currentUser, logout) {
    // write a review goes between the div
    let pic = currentUser.profile_pic_url ? currentUser.profile_pic_url : currentUser.image_url
    return (
      <div className="login">
          <nav className="login-buttons">
            <div>

            </div>
            <div className="splash-buttons">
              <button className="other-login-buttons" onClick={logout}>Log Out</button>
              <button id="profile-button" onClick={this.toggleDropdown} onBlur={this.closeDropdown}>
                <img className="button-image" src={pic}/>
              </button>
              <ul className={`dropdown ${this.state.active}`}>
                <Link className="dropdown" to={`/users/${this.props.currentUser.id}`}>My Profile</Link>
              </ul>

            </div>
          </nav>
      </div>
    );
  }


  render() {
    return(
      <div className='header'>

        <div className='homepage'>
          {this.props.currentUser ? this.greeting(this.props.currentUser, this.props.logout) : this.sessionForm()};
          <div className="header-logo"><strong>OpenGym</strong>
            <br/><br/>
            Find a Volleyball Open Gym Near You!
          </div>
          <SearchContainer />
        </div>

      </div>
    )
  }

}


export default withRouter(Greeting);
