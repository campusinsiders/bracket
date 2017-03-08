/**
 * Entry: Advice
 */

// Vendor modules.
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

// Internal modules.
import BracketPageComponent from './BracketPageComponent';
import Bracket from './interfaces/bracket';
import AppStore from './stores/appStore';

let serverData = '{"depth":6, "firstFour":true, "postId":0}'

// Get data sent from the server.
let wp_bracket = window.wp_bracket || {};

if ( wp_bracket.hasOwnProperty( 'bracketData' ) ) {
	serverData = wp_bracket.bracketData;
}

const appStore = window.appStore = new AppStore( 6, serverData );

//Provide the adviceStore MobX Store to the main BracketComponent and render it.
window.BracketApp = function() {
	ReactDOM.render(
		<Provider store={appStore}><BracketPageComponent/></Provider>,
		 document.getElementsByClassName( 'frame__react-mount' )[0]
	);
}

// Simple DOM conditional so this will only fire on appropriate pages.
if ( document.querySelectorAll( 'body.frame>.frame__react-mount').length ) {
	BracketApp();
}
