import { computed, observable } from 'mobx';

import Matchup from '../interfaces/Matchup';

export default class MatchStore {

	uid:Number;

	@observable matchups:Array = [];

	constructor( data ) {
		if ( data instanceof Object ) {
			return this.wakeup( data );
		}
		return this;
	}

	wakeup( data ) {
		if ( data.hasOwnProperty( 'matchups' ) && Array.isArray( data.matchups ) ) {
			data.matchups.map( (matchup ) => {
				this.matchups.push( new Matchup( matchup ) );
			} );
		}
	}

	getMatchupById( uid ) {
		return this.matchups.filter( (match) => uid === match.uid )[0] || void 0;
	}

	getMatchupBySeat( team ) {
		return this.matchups.filter( (match) => team === match.seat1 || team === match.seat2 )[0] || void 0;
	}
}
