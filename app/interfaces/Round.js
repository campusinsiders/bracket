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

	@observable quadrantTop:String;

	@observable quadrantBottom:String;

	@observable sponsorLink:String;

	@observable editting:Boolean;

	@observable matchStore:MatchStore;

	@computed get matchups() {
		return this.matchStore.matchups;
	}

	constructor( data, uid ) {
		this.initialData = data;
		const defaults = {
			uid: Math.random() * 100,
			ordinal: '',
			title: `Round`,
			subtitle: '',
			position: '',
			promo: '',
			sponsor: '',
			sponsorLink: '',
			editting: false
		};
		Object.assign( this, defaults, data );
		this.matchStore = data.matchStore ? new MatchStore( data.matchStore ) : this.getDefaultMatchStore();
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
		if ( 'Four' === this.position ) {
			return this.getRegionFirstFour( index );
		}
		if ( index < ( matches / 2 ) ) {
			if( this.uid % 2 === 1 ) {
				return 'topRight';
			}
			return 'bottomRight';
		}
		if( this.uid % 2 === 1 ) {
			return 'topLeft';
		}
		return 'bottomLeft';
	}

	getRegionFirstFour( index ) {
		const regions = [ 'topRight', 'topLeft', 'bottomRight', 'bottomLeft' ];
		return regions[index];
	}

	getMatchupById( uid ) {
		return this.matchStore.getMatchupById( uid );
	}

	getMatchupBySeat( team ) {
		return this.matchStore.getMatchupBySeat( team );
	}
}
