import { computed, observable } from 'mobx';

import Matchup from './Matchup.js';

export default class Bracket {
	title:String;

	name:String;

	final:MatchUp;

	rounds:Number;

	@observable logo;

	@observable promo;

	constructor( rounds ) {
		this.rounds = rounds;
		this.final = new Matchup( this.rounds );

		return this;
	}

	getRound( round ) {
		if ( round > this.rounds || round <= 0 ) {
			return false;
		}
		return this.final.winner();
	}
}
