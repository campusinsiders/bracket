import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject( 'store' ) @observer
export default class RegionToggleComponent extends Component {
	constructor(props) {
		super(props);
		this.regionLabels = new Map();
	}

	asdfcomponentDidMount() {
		var regionToggles = document.getElementsByClassName('regionToggle__region');
		for (var i = regionToggles.length - 1; i >= 0; i--) {
			regionToggles[i].addEventListener('click', regionToggle);
		}

		function regionToggle(event) {
			console.log(event);

			var activeRegionToggle = document.getElementsByClassName('regionToggle__region--active')[0];
			activeRegionToggle.classList.remove('regionToggle__region--active');;

			var regionToggle = event.target;
			var newRegion = regionToggle.getAttribute('data-region');

			regionToggle.classList.add('regionToggle__region--active');

			var rounds = document.getElementsByClassName('rounds')[0];

			if ( newRegion == 'finalFour' )
				var ifRegion = '';
			else
				var ifRegion = 'Region';

			rounds.classList = 'rounds';
			rounds.classList.add('rounds--display' + ifRegion + capitalizeFirstLetter(newRegion));
		}


		function capitalizeFirstLetter(string) {
			return string[0].toUpperCase() + string.slice(1);
		}
	}

	setRegions() {
		let regions = this.props.store.getRound('fourth');
		if ( regions.length ) {
			regions.map( (region) => {
				let position = region.position.toUpperCase().slice(0,1).concat(region.position.slice(1));
				this.regionLabels.set(`top${position}`, region.quadrantTop);
				this.regionLabels.set(`bottom${position}`, region.quadrantBottom);
			});
		}
		console.log( this.regionLabels );
	}

	getRegions() {
		this.setRegions();
		let regions = [];
		for ( let [ key, value ] of this.regionLabels.entries() ) {
			let className = 'regionToggle__region ';
			className = ( 'topLeft' === key ) ? className.concat('regionToggle__region--active') : className;
			regions.push(
				<div key={key} data-region={key} className={className}>{value}</div>
			);
		}
		regions.push( <div key="finalFour" data-region="finalFour" className="regionToggle__region">Final 4</div> );
		return regions;
	}

	render() {
		return (
			<div className="regionToggle">
				{this.getRegions()}
			</div>
		);
	}
}
