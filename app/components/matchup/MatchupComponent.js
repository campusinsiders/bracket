import React, { Component } from 'react';
import { Link } from 'react-router';
import { inject, observer } from 'mobx-react';

@inject("store") @observer
export default class MatchupComponent extends Component {

	constructor( props ) {
		super( props );

		this.match = this.props.match;
	}

	onClick() {
		this.props.store.activeMatchup = this.match;
	}

	getLink() {
		return `/matchup/${this.match.roundId}/${this.match.uid}/`
	}

	getMatchupClass() {
		let className = 'matchup';

		if ( this.match.region ) {
			className = className.concat( ' matchup--region' + this.match.region );
		}

		if ( this.match.seat1Winner || this.match.seat2Winner ) {
			className = className.concat( ' matchup--complete' );
		}
		return className;
	}

	getTeamClass( teamWinner ) {
		return teamWinner ? 'team team--winner' : 'team';
	}

	render() {
		return (
			<Link className={this.getMatchupClass()} to={this.getLink()} onClick={this.onClick.bind(this)}>
				<div className={this.getTeamClass(this.match.seat1Winner)}>
					<span className="team__seed">{this.match.seat1Seed}</span>
					<span className="team__name">{this.match.seat1Team} &nbsp;</span>
					<span className="team__logo">
						<img src={this.match.seat1Logo}/>
					</span>
				</div>
				<div className="matchupPreview">Preview <span>Matchup</span></div>
				<div className={this.getTeamClass(this.match.seat2Winner)}>
					<span className="team__seed">{this.match.seat2Seed}</span>
					<span className="team__name">{this.match.seat2Team} &nbsp;</span>
					<span className="team__logo">
						<img src={this.match.seat2Logo}/>
					</span>
				</div>
			</Link>
		);
	}
}
