import React, { Component } from 'react';

export default class RegionToggleComponent extends Component {

	render() {
		return (
			<div className="regionToggle">
				<div data-region="south" className="regionToggle__region regionToggle__region--active">South</div>
				<div data-region="east" className="regionToggle__region">East</div>
				<div data-region="west" className="regionToggle__region">West</div>
				<div data-region="midwest" className="regionToggle__region">Midwest</div>
				<div data-region="finalFour" className="regionToggle__region">Final 4</div>
			</div>
		);
	}
}
