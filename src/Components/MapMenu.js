
import React, { Component } from 'react';
import '../App.css';

class MapMenu extends Component {
	state = {
		sideBarActive: false,
		query: ''
	}

	// Toggle sidebar
	onMenuClick = () => {
		const sidebar = document.querySelector('.map-sidebar');
		if (this.state.sideBarActive) {
			sidebar.style.transform = 'translateX(-250px)'
			this.setState({ sideBarActive: false });
		}
		else {
			sidebar.style.transform = 'translateX(0px)'
			this.setState({ sideBarActive: true });
		}
	}

	render() {
		return (
			<div>
				<div className="map-nav-container">
					<nav className="map-nav">
						<button aria-label='sidebar Menu' tabIndex='0' className="menu-icon-container" onClick={this.onMenuClick}>
							<div className="menu-icon-bar"></div>
							<div className="menu-icon-bar"></div>
							<div className="menu-icon-bar"></div>
						</button>
						<div className="nav-title">
							<h1>Dive Bars</h1>
							<h4>Kansas City, Missouri</h4>
						</div>
					</nav>
				</div>
				<div className="map-sidebar">
					<div className="map-sidebar__wrapper">
						<input type="text" aria-label='Search Filter' className="sidebar-input" placeholder="Which bar would you like?" onChange={(e) => this.props.onQuery(e.target.value)}></input>
					</div>
					<ul>
						{this.props.places.map((place, index) => {
							return <li
								tabIndex='0'
								role='button'
								aria-label='Place Location'
								key={index}
								onClick={() => this.props.setActiveMarker(place.name)}>{place.name}
							</li>
						})}
					</ul>
				</div>
			</div>
		)
	}
}

export default MapMenu;