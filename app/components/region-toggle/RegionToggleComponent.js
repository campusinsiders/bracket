import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject( 'store' ) @observer
export default class RegionToggleComponent extends Component {
	constructor(props) {
		super(props);
		this.regionLabels = new Map();
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
	}

	getRegions() {
		this.setRegions();
		const { activeRegion } = this.props.store.roundStore;
		let regions = [];
		for ( let [ key, value ] of this.regionLabels.entries() ) {
			let className = 'regionToggle__region ';
			className = ( activeRegion === key ) ? className.concat('regionToggle__region--active') : className;
			regions.push(
				<div key={key} onClick={this.regionToggle.bind(this, key)} className={className}>{value}</div>
			);
		}
		let ffClassName = 'regionToggle__region ';
		ffClassName = ( 'finalFour' === activeRegion ) ? ffClassName.concat('regionToggle__region--active') : ffClassName;
		regions.push( <div key="finalFour" onClick={this.regionToggle.bind(this, 'finalFour')} className={ffClassName}>Final 4</div> );
		return regions;
	}

	regionToggle(region) {
		this.props.store.roundStore.activeRegion = region;
	}

	render() {
		return (
			<div className="regionToggle">
				{this.getRegions()}
			</div>
		);
	}
}
