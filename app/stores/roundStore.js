import { computed, observable }  from 'mobx';
import { DividerInterface, RoundInterface } from '../interfaces/';

export default class RoundStore {

	@observable nodes:Array = [];

	uid:Number;

	@observable activeRegion = 'topLeft';

	@computed get rounds() {
		return this.nodes.filter( (node) => node instanceof RoundInterface );
	}

	@computed get dividers() {
		return this.nodes.filter( (node) => node instanceof DividerInterface );
	}

	constructor( data ) {
		if ( data instanceof Object ) {
			return this.wakeup( data );
		}
	}

	wakeup( data ) {
		if ( data.hasOwnProperty( 'nodes' ) && Array.isArray( data.nodes ) ) {
			this.nodes = data.nodes.map( (node) => {
				if ( node.hasOwnProperty( 'matchStore' ) ) {
					return new RoundInterface( node );
				}
				if ( node.hasOwnProperty( 'count' ) && node.hasOwnProperty( 'position' ) ) {
					return new DividerInterface( node );
				}
				return void 0;
			});
		}
		return this;
	}

	filter( callback ) {
		if ( 'function' !== typeof callback ) {
			throw new TypeError( 'Filter expects a callable function.' );
		}
		return this.nodes.filter( callback );
	}

	getRound( uid ) {
		return this.rounds.filter( (round) => uid === round.uid)[0] || false;
	}

	getRoundBy( prop, value ) {
		return this.rounds.filter( (round) => round[prop] === value ) || false;
	}

}
