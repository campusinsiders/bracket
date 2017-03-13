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
		const { promo, quadrantTop, quadrantBottom, uid } = this.round;
		const promoImage = () => {
			return promo ? (
				<div className="promo">
					<img src={promo}/>
				</div>
			) : false;
		}
		let quadrants = [];
		if ( quadrantTop ) {
			let modifier = ( ( uid % 2 ) === 0) ? 'topRight' : 'topLeft';
			quadrants.push(
				<div key={0} className={`quadrantLabel quadrantLabel--${modifier}`} onClick={this.onClick.bind(this)}>
					{quadrantTop}
				</div>
			);
		}

		if ( quadrantBottom ) {
			let modifier = ( ( uid % 2 ) === 0) ? 'bottomRight' : 'bottomLeft';
			quadrants.push(
				<div key={1} className={`quadrantLabel quadrantLabel--${modifier}`} onClick={this.onClick.bind(this)}>
					{quadrantBottom}
				</div>
			);
		}

		return (
			<div className={this.className()}>
				<div className="roundTitle" onClick={this.onClick.bind(this)}>
					<div className="roundTitle__name">{this.round.title}</div>
					<div className="roundTitle__dates">{this.round.subtitle}</div>
				</div>
				{quadrants}
				<Matchups matchups={this.round.matchups} round={this.round}/>
				{promoImage()}
			</div>
		);
	}
}
