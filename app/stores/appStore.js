import { computed, observable, toJS } from 'mobx';

import RoundStore from './roundStore';
import MatchStore from './matchStore';
import PostsStore from './postsStore';
import { Editor, DividerInterface, RoundInterface } from '../interfaces/';

export default class AppStore {
	@observable postId;

	@observable depth:Number;

	@observable firstFour:Boolean = true;

	@observable roundStore:RoundStore;

	@observable edittingEnabled:Boolean = false;

	@observable editor:Editor;

	@observable activeMatchup;

	@observable postsStore;

	@computed get ordinals() {
		return this.allOrdinals().slice( - this.depth );
	}

	@computed get roundStoreNodes() {
		return this.roundStore.nodes;
	}

	@computed get rounds() {
		return this.roundStore.rounds;
	}

	@computed get dividers() {
		return this.roundStore.dividers;
	}

	@computed get json() {
		let json = toJS( this );
		json.postsStore = void 0;
		json.editor = void 0;
		json.roundStore.nodes.map( (node) => {
			if ( node.hasOwnProperty('matchStore') ) {
				node.matchStore.matchups.map( (match) => {
					match.article = { content: "", id: "", title: "" };
				})
			}
		});
		return json;
	}

	@computed get stringified() {
		return JSON.stringify( this.json );
	}

	constructor( depth, data ) {
		let parsed = this.parse( data );
		if ( 'object' !== typeof parsed ) {
			parsed = this.parse( parsed );
		}
		this.postId = parsed.postId || 0;
		this.depth = parsed ? parsed.depth : depth || 1;
		let roundStore = parsed ? parsed.roundStore : void 0;
		this.roundStore = roundStore ? new RoundStore( roundStore ) : this.defaultRoundStore();
		this.editor = new Editor;
		this.postsStore = new PostsStore;
		this.postsStore.bootstrap();
		this.transmit('init').setupReceiver().setupTransmitter();
	}

	transmit( action ) {
		if ( window.parent ) {
			window.parent.postMessage( JSON.stringify({
				actions: [
					{
						action: action,
						data: this.json
					}
				]
			}), window.location.origin );
		}
		return this;
	}

	setupReceiver() {
		if ( window.parent ) {
			window.addEventListener( 'message', this.receive.bind(this) );
		}
		return this;
	}

	setupTransmitter() {
		if ( window.parent ) {
			//Christiathis.transmitter = window.setInterval( () => { this.transmit( 'update') }, 3000 );
		}
		return this;
	}

	receive( event ) {
		//console.log( 'Editor: ', event );
		let parsedData = ( 'string' === typeof(event.data) ) ? JSON.parse( event.data ) : event.data;
		if ( void 0 !== parsedData && parsedData.hasOwnProperty('id') && 'setting' === parsedData.id ) {
			let prop = this.parseProp( parsedData.data[0] );
			if ( this.editor.target ) {
				this.editor.change(prop).to( parsedData.data[1] ).from( parsedData.data[0]);
			}
		}

		if ( void 0 !== parsedData && parsedData.hasOwnProperty('id') && 'sync' === parsedData.id ) {
			this.edittingEnabled = true;
		}
	}

	parseProp( settingId ) {
		return settingId.split('__').slice(1);
	}

	parse( data ) {
		try {
			return ( void 0 === data ) ? data : JSON.parse( data );
		} catch ( e ) {
			console.error( e );
			console.error( data );
			return void 0;
		}
	}

	defaultRoundStore() {
		let rounds = [], roundKey = 0, dividerKey = 100, store = new RoundStore;
		const { nodes } = store;

		this.ordinals.slice(-1).map( (round) => {
			nodes.push( new RoundInterface( { uid: roundKey++, matches: round.matchups, ordinal: round.ordinal } ) );
		} );

		this.ordinals.reverse().slice(1).map( (round) => {
			const putQuadrant = ( [3,4].indexOf( roundKey ) > -1 ) ? 'Region' : void 0;
			nodes.unshift( new DividerInterface( { uid: dividerKey++, count: round.dividers, position: 'left' } ) );
			nodes.unshift( new RoundInterface( { uid: roundKey++, matches: round.matchups, ordinal: round.ordinal, position: "left", quadrantTop: putQuadrant, quadrantBottom: putQuadrant } ) );
			nodes.push( new DividerInterface( { uid: dividerKey++, count: round.dividers, position: 'right' } ) );
			nodes.push( new RoundInterface( { uid: roundKey++, matches: round.matchups, ordinal: round.ordinal, position: "right", quadrantTop: putQuadrant, quadrantBottom: putQuadrant } ) );
		});

		if ( this.firstFour ) {
			nodes.unshift( new RoundInterface( { uid: roundKey++, matches: 4, ordinal: 'first', position: 'Four' } ) );
		}

		return store;
	}

	getRoundById( uid ) {
		return this.roundStore.getRound( uid );
	}

	getRound( ordinal ) {
		return this.roundStore.getRoundBy( 'ordinal', ordinal );
	}

	setActiveMatchup( matchup ) {
		this.activeMatchup = matchup;
		this.editor.setTarget( this.activeMatchup );
	}

	allOrdinals() {
		return [
			{
				ordinal: 'first',
				matchups: 16,
				dividers: 8
			},
			{
				ordinal: 'second',
				matchups: 8,
				dividers: 4
			},
			{
				ordinal: 'third',
				matchups: 4,
				dividers: 2
			},
			{
				ordinal: 'fourth',
				matchups: 2,
				dividers: 1
			},
			{
				ordinal: 'fifth',
				matchups: 1,
				dividers: 0
			},
			{
				ordinal: 'sixth',
				matchups: 1,
				dividers: 0
			},
		];
	}
}
