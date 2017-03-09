import { computed, observable } from 'mobx';

import MatchStore from '../stores/matchStore';
import Matchup from './Matchup';

export default class RoundInterface {

	uid:Number;

	postion:String;

	ordinal:String;

	matches:Number;

	@observable title:String;

	@observable subtitle:String;

	@observable promo:String;

	@observable sponsor:String;

	@observable sponsorLink:String;

	@observable editting:Boolean;

	@observable matchStore:MatchStore;

	@computed get matchups() {
		return this.matchStore.matchups;
	}

	constructor( data, uid ) {
		const defaults = {
			uid: Math.random() * 100,
			ordinal: '',
			title: `${this.ordinal} round`,
			subtitle: '',
			promo: '',
			sponsor: '',
			sponsorLink: '',
			editting: false,
			matchStore: this.getDefaultMatchStore()
		};
		Object.assign( this, defaults, data );
	}

	getDefaultMatchStore() {
		let store = new MatchStore;
		for ( let i = 0; i < this.matches; i++ ) {
			store.matchups.push( new Matchup( {
				roundId: this.uid,
				uid: i,
				region: this.getRegion( i, this.matches )
			} ) );
		}
		return store;
	}

	getRegion( index, matches ) {
		if ( index < ( matches / 2 ) ) {
			if( this.uid % 2 === 1 ) {
				return 'South';
			}
			return 'East';
		}
		if( this.uid % 2 === 1 ) {
			return 'West';
		}
		return 'Midwest';
	}

	getMatchupById( uid ) {
		return this.matchStore.getMatchupById( uid );
	}

	getMatchupBySeat( team ) {
		return this.matchStore.getMatchupBySeat( team );
	}
}
