import React, { Component } from 'react';
import { observer } from 'mobx-react';
// Internal.
import { Header, MatchupModal, RegionToggle, Rounds } from './components';

/**
 * React Component: BracketComponent
 */
@observer
export default class BracketComponent extends Component {
	render() {
		return(
			<div className="bracket__wrap">
				<Header/>
				<div className="bracket">
					<RegionToggle/>
					<Rounds/>
				</div>
				<MatchupModal router={this.props.router}/>
			</div>
		);
	}
}
