// Vendor imports.
import React, { Component } from 'react';
import { Link } from 'react-router';
import { inject, observer } from 'mobx-react';

/**
 * Component: MatchupComponent
 *
 * Renders an individual matchup on the Bracket.
 *
 * @extends   React.Component
 * @decorator inject   AppStore
 * @decorator observer mobx.observer
 */
@inject("store") @observer
export default class MatchupComponent extends Component {
	/**
	 * Constructor
	 * @param  {Object} props Object props.
	 * @return {this}         Instance of self.
	 */
	constructor( props ) {
		super( props );

		this.match = this.props.match;
	}

	/**
	 * On Click Handler
	 * @return {void}
	 */
	onClick() {
		this.props.store.activeMatchup = this.match;
	}

	/**
	 * Get Link
	 * @return {String} Returns the link to the match up view.
	 */
	getLink() {
		return `/matchup/${this.match.roundId}/${this.match.uid}/`
	}

	/**
	 * Get Matchup Class
	 * @return {String} Returns the classname for the matchup.
	 */
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

	/**
	 * Get Team Class
	 * @param  {Boolean} teamWinner Returns the classname for the team depending on if they won or not.
	 * @return {String}             ClassName
	 */
	getTeamClass( teamWinner ) {
		return teamWinner ? 'team team--winner' : 'team';
	}

	/**
	 * Lifecycle: Render
	 * @return {React$Element} JSX desugar.
	 */
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
