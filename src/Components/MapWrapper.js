import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class MapWrapper extends Component {
	state = {
		bounds: {},
		selectedPlace: {},
		img: '',
		activeMarker: {},
		showingInfoWindow: true,
		center: {}
	};

	componentDidMount() {
		this.setBounds();
		this.setState({ center: this.props.centerCoords.location })
	}

	// Set map bounds
	setBounds = () => {
		const bounds = new this.props.google.maps.LatLngBounds();
		for (let place of this.props.places) {
			bounds.extend(place.pos);
		}
		this.setState({ bounds });
	}

	// Display InfoWindow with marker data on click
	onMarkerClick = (props, marker) => {
		const place = this.props.places.filter((place) => place.name === props.title)
		this.setState({
			showingInfoWindow: true,
			activeMarker: marker,
			selectedPlace: place[0],
		});
	}

	render() {
		const mapStyle = {
			width: '100%',
			height: '100%'
		};
		return (
			<div>
				<Map
					google={this.props.google}
					zoom={4}
					style={mapStyle}
					center={this.state.center}
					bounds={this.state.bounds}
				>
					{this.props.places.map((place, index) =>
						<Marker
							key={index}
							name={place.name}
							title={place.name}
							street={place.street}
							area={place.area}
							position={{ lat: place.pos.lat, lng: place.pos.lng }}
							onClick={this.onMarkerClick}
							animation={this.state.activeMarker.name === place.name && this.props.google.maps.Animation.BOUNCE}
						/>
					)}
					<InfoWindow
						marker={this.state.activeMarker}
						visible={this.state.showingInfoWindow}

					>
						{!this.props.requestAvailable ? (
							<div className="marker-card">
								<h1><a href={this.state.selectedPlace.url} target="_blank" rel="noopener noreferrer">{this.state.selectedPlace.name}</a></h1>
								<p>{this.state.selectedPlace.street}</p>
								<p>{this.state.selectedPlace.area}</p>
								<h4>FourSquare API Request Limit Exceeded</h4>
							</div>
						) : (
								<div className="marker-card">
									<h1>{this.state.selectedPlace.name}</h1>
									<img src={this.state.selectedPlace.img} alt={this.state.selectedPlace.name} />
									<h3>Likes: {this.state.selectedPlace.likes}</h3>
								</div>
							)
						}
					</InfoWindow>
				</Map>
			</div>
		)
	}
}
export default GoogleApiWrapper({
	apiKey: 'AIzaSyClP-Lxzkj750LSMWpDJprfl6m7xNcOFuQ'
})(MapWrapper)