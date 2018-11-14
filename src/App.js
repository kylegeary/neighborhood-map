
import React, { Component } from 'react';
import './App.css';
import MapWrapper from './Components/MapWrapper';
import MapMenu from "./Components/MapMenu";
import * as FourSquareAPI from './APIs/FourSquare';

class App extends Component {
  state = {
    places: [
      {
        name: "The Ship",
        pos: {
          lat: 39.102021,
          lng: -94.599111,
          latlng: "39.102021,-94.599111"
        },
        street: "1217 Union Ave",
        area: "Kansas City, MO 64101",
        url: "https://www.theshipkc.com",
        img:''
      },
      {
        name: "Lucky Boys",
        pos: {
          lat: 39.094003,
          lng: -94.604622
        },
        street: "1615 Genessee St",
        area: "Kansas City, MO 64102",
        url: "https://www.facebook.com/Lucky-Boys-1659892430924006/",
        img: ''
      },
      {
        name: "The Colonial Club",
        pos: {
          lat: 39.109244,
          lng: -94.624020
        },
        street: "322 N 6th St",
        area: "Kansas City, KS 66101",
        url: "https://colonial-club.business.site",
        img: ''
      },
      {
        name: "Caddy Shack",
        pos: {
          lat: 39.111440,
          lng: -94.576201
        },
        street: "700 E 3rd St",
        area: "Kansas City, MO 64106",
        url: "http://caddyshackkc.com/Home_Page.php",
        img: ''
      },
      {
        name: "Quaff Bar & Grill",
        pos: {
          lat: 39.102017,
          lng: -94.588582
        },
        street: "1010 Broadway Blvd",
        area: "Kansas City, MO 64105",
        url: "https://www.facebook.com/The-Quaff-169145395138/",
        img: ''
      }
    ],
    existingPlaces: [],
    requestAvailable: true
  };

  componentDidMount() {
    this.getFourSquareData();
  }

  //foursquare call for data (if exceeded quota, will fallback to hardcoded places with message.)
  getFourSquareData = () => {
    const newPlaces = this.state.places.map((place) => {
      const size = 150
      FourSquareAPI.getFourSquareVenueID(place.pos.lat, place.pos.lng, place.name)
        .then((venueId) => {
          FourSquareAPI.getFourSquareVenueInfo(venueId)
            .then((venueInfo) => {
              place.img = venueInfo.bestPhoto.prefix + size + venueInfo.bestPhoto.suffix
            })
            .catch(() => this.setState({ requestAvailable: false })
            )
        })
        .catch((error) => console.log(error));
      return place;
    });
    this.setState({ existingPlaces: newPlaces });
  }

  filterPlaces = (query) => {
    if (!query) {
      this.setState({ existingPlaces: [] });
    }
    const filteredPlaces = this.state.places.filter((place) => place.name.toLowerCase().includes(query.toLowerCase()));
    this.setState({ existingPlaces: filteredPlaces });
  }

  // make marker active when clicked
  setActiveMarker = (marker) => {
    document.querySelector(`[title="${marker}"]`).click();
  }

  render() {
    return (
      <div className="App">
        <MapMenu places={this.state.existingPlaces} onQuery={this.filterPlaces} setActiveMarker={this.setActiveMarker} />
        <MapWrapper places={this.state.existingPlaces} centerCoords={this.state.places[0].pos.latlng} activeMarker={this.state.activeMarker} showingInfoWindow={this.state.showingInfoWindow} requestAvailable={this.state.requestAvailable} />
      </div>
    );
  }
}

export default App;