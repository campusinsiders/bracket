import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

// Internal.
import { Matchups } from '..';

@inject( 'store' ) @observer
export default class RoundComponent extends Component {

	constructor( props ) {
		super( props );
		this.round = this.props.round;
	}

	className() {
		let base  = 'round round--';
		return base.concat(this.round.ordinal )
			.concat(this.round.position.charAt(0).toUpperCase() +this.round.position.slice(1) );
	}

	onClick() {
		console.log(this.round);
		this.props.store.editor.setTarget(this.props.round);
		console.log(this.props.store.editor);
	}

	render() {
		return (
			<div className={this.className()}>
				<div className="roundTitle" onClick={this.onClick.bind(this)}>
					<div className="roundTitle__name">{this.round.title}</div>
					<div className="roundTitle__dates">{this.round.subtitle}</div>
				</div>
				<div className="promo">
					<img src={this.round.promo}/>
				</div>
				<Matchups matchups={this.round.matchups} round={this.round}/>
			</div>
		);
	}
}
