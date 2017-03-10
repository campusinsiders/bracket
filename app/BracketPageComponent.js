import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router';
import { inject, observer } from 'mobx-react';
// Internal.
import BracketComponent from './BracketComponent';

if ( window.hasOwnProperty( '_gaq' ) && _gaq.hasOwnProperty('push') ) {
	hashHistory.listen((location) => {
		_gaq.push(['_trackPageview', location.pathname]);
	} );
} else {
	console.warn( 'Google analytics is not configured, pageviews will not be sent to analytics!' );
}
/**
 * React Component: BracketComponent
 */
@inject('store') @observer
export default class BracketPageComponent extends Component {
	render() {
		return(
			<div className="bracket__wrap">
				<Router history={hashHistory}
				createElement={ (component, props ) => {
					const { location } = props;
					const key = `${location.pathname}${location.search}`;
					props = { ...props, key };
					return React.createElement( component, props );
					}}
				>
					<Route path="/" component={BracketComponent}/>
					<Route path="/matchup/:round/:matchup" component={BracketComponent}/>
				</Router>
			</div>
		);
	}
}
