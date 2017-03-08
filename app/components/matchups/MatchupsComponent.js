import React, { Component } from 'react';
import { observer } from 'mobx-react';

// Internal.
import { Matchup } from '..';

@observer
export default class MatchupsComponent extends Component {

	constructor( props ) {
		super( props );

		this.round = this.props.round;

		this.store = this.round.matchStore;
	}

	render() {
		let key = 0;
		const matchups = this.store.matchups.map( (match) => {
			key++;
			return (
				<Matchup key={key} match={match}/>
			);
		} );
		return (
			<div className="matchups">
				{matchups}
			</div>
		);
	}
}
