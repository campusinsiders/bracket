import React, { Component } from 'react';

export default class RoundDividersComponent extends Component {

	constructor( props ) {
		super( props );
	}

	className() {
		let base = 'roundDividers roundDividers--';
		return base.concat( this.props.dividerPosition);
	}

	spacer() {
		return '<div class="roundDividerSpacer">';
	}

	divider() {
		return '</div><div class="roundDivider"></div>';
	}

	dividers() {
		let html = '';
		for ( let i = 0; i < this.props.dividerCount; i++ ) {
			html = html.concat( this.spacer() ).concat( this.divider() );
		}
		return { __html: html.concat(this.spacer()) };
	}

	render() {
		return(
			<div className={this.className()} dangerouslySetInnerHTML={ this.dividers() } />
		);
	}
}
