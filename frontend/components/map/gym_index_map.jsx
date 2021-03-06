import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import MarkerManager from '../../util/marker_manager';


class GymIndexMap extends React.Component {
  componentDidMount() {
    let center = { lat: 37.7758, lng: -122.435 }
    let zoom = 10;
    // if (Object.keys(this.props.gyms).length === 1) {
    //   center = { lat: this.props.gyms[0].lat,
    //               lng: this.props.gyms[0].lng};
    //   zoom = 14;
    // } else if (Object.keys(this.props.gyms).length === 2) {
    //   center = { lat: this.props.gyms[0].lat,
    //               lng: this.props.gyms[0].lng};
    //   zoom = 13;
    // } else if (this.props.gyms[0]) {
    //   center = { lat: this.props.gyms[0].lat,
    //               lng: this.props.gyms[0].lng}
    //   zoom = 11;
    // } else {
    //   center = { lat: 37.7758, lng: -122.435 }
    //   zoom = 10;
    // }
    // console.log(this.props.bounds);
    if (Object.keys(this.props.gyms).length === 1) {
      center = { lat: this.props.gyms[0].lat,
                  lng: this.props.gyms[0].lng};
      zoom = 12;
    } else if (this.props.bounds.geometry) {
      center = this.props.bounds.geometry.location;
      zoom = 11;
    }

    const mapOptions = {
      center: center,
      zoom: zoom
    };

    this.map = new google.maps.Map(this.mapNode, mapOptions);
    this.MarkerManager = new MarkerManager(this.map);
    this.MarkerManager.updateMarkers(this.props.gyms);

    this.props.gyms.forEach(gym => this.gymInfo(gym));
  }

  componentWillReceiveProps(nextProps) {

    let center;
    let zoom;
    // if (Object.keys(nextProps.gyms).length === 1) {
    //   center = { lat: nextProps.gyms[0].lat,
    //               lng: nextProps.gyms[0].lng};
    //   zoom = 14;
    // }  else if (Object.keys(nextProps.gyms).length === 2) {
    //   center = { lat: nextProps.gyms[0].lat,
    //               lng: nextProps.gyms[0].lng};
    //   zoom = 13;
    // } else if (nextProps.gyms[0]) {
    //   center = { lat: nextProps.gyms[0].lat,
    //               lng: nextProps.gyms[0].lng}
    //   zoom = 11;
    // } else {
    //   center = { lat: 37.7758, lng: -122.435 }
    //   zoom = 10;
    // }
    if (Object.keys(nextProps.gyms).length === 1) {
      center = { lat: nextProps.gyms[0].lat,
                  lng: nextProps.gyms[0].lng};
      zoom = 12;
    } else if (nextProps.bounds.geometry) {
      center = nextProps.bounds.geometry.location;
      zoom = 11;
    }

    const mapOptions = {
      center: center,
      zoom: zoom
    };

    this.map = new google.maps.Map(this.mapNode, mapOptions);
    this.MarkerManager = new MarkerManager(this.map)
    this.MarkerManager.updateMarkers(nextProps.gyms);

    nextProps.gyms.forEach(gym => this.gymInfo(gym));

  }

  gymInfo(gym) {
    let content =
      `<a href=/#/gyms/${gym.id}>${gym.name}</a>
      <div>${gym.address}</div>
      <div>${gym.city}, ${gym.state} ${gym.zip}</div>`;
    let window = new google.maps.InfoWindow({
      content: content
    });
    var marker = new google.maps.Marker({
      position: { lat: gym.lat, lng: gym.lng},
      map: this.map
    });

    // marker.addListener('mouseover', () => window.open(this.map, marker));
    // marker.addListener('mouseout', () => window.close(this.map, marker));
    marker.addListener('click', () => window.open(this.map, marker));

  }

  render() {
    return (
      <div id="map-container" ref={ map => this.mapNode = map }>
      </div>
    )
  }
}

export default GymIndexMap;
