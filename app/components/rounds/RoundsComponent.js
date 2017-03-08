import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import { Round, RoundDividers } from '..';
import { DividerInterface, RoundInterface } from '../../interfaces/';

@inject( 'store' ) @observer
export default class RoundsComponent extends Component {

	round( round ) {
		return (
			<Round
				key={round.uid}
				round={round}
			/>
		);
	}

	divider( divider ) {
		return (
			<RoundDividers
				key={divider.uid}
				dividerCount={divider.count}
				dividerPosition={divider.position}
			/>
		);
	}

	rounds() {
		let rounds = [];
		const { store } = this.props;

		store.roundStoreNodes.map( (node) => {
			if ( node instanceof RoundInterface ) {
				rounds.push( this.round( node ) )
			}
			if ( node instanceof DividerInterface ) {
				rounds.push( this.divider( node ) );
			}
			return node;
		});

		return rounds;
	}

	render() {
		return(
			<div className="rounds">
				{this.rounds()}
			</div>
		);
	}
}
