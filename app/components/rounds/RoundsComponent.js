import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import { Round, RoundDividers } from '..';
import { bracketUrl } from '../utils';
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

	sponsor() {
		return(
			<div key={1000} className="sponsor">
				<div className="sponsor__6860Graphic">
					<img src={bracketUrl( "/app/assets/6860.svg" )}/>
				</div>
				<div className="sponsor__yahoo">
					<a href="http://yahoo.com/tourney" target="_blank">
						<img src={bracketUrl( "/app/assets/yahoo-sports.svg" )}/>
					</a>
				</div>
				<div className="sponsor__6860Content">
					<div className="sponsor__6860ContentContainer">
						<span className="sponsor__6860Content--short">Fill out your bracket now at </span>
						<span className="sponsor__6860Content--long">Get into the madness with Tourney Pick'em from Yahoo Sports. Fill out your bracket now at </span>
						<a href="http://yahoo.com/tourney" target="_blank">http://yahoo.com/tourney</a>
					</div>
				</div>
			</div>
		);
	}

	rounds() {
		let rounds = [];
		rounds.push( this.sponsor() );
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
			<div className="rounds rounds--displayRegionSouth">
				{this.rounds()}
			</div>
		);
	}
}
