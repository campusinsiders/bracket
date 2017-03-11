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
		if ( window.parent ) {}
		return this;
	}

	receive( event ) {
		let parsedData = ( 'string' === typeof(event.data) ) ? this.parse( event.data ) : event.data;
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

	debugBracket() {
		let regions = [ 'topLeft', 'bottomLeft', 'topRight', 'bottomRight'];
		this.roundStore.rounds.map( (round) =>{
			round.title = `Round UID: ${round.uid}`;
			round.subtitle = `Round ${round.uid} Subtitle`;
			round.quadrantTop = ( [3,4].indexOf( round.uid ) > -1 ) ? regions.shift() : void 0;
			round.quadrantBottom = ( [3,4].indexOf( round.uid ) > -1 ) ? regions.shift() : void 0;
			round.matchStore.matchups.map( (match) => {
				match.seat1Team = `Rd: ${match.roundId} | Rg: ${match.region} | Team: Top`;
				match.seat2Team = `Rd: ${match.roundId} | Rg: ${match.region} | Team: Bottom`;
				match.seat1Winner = Math.random() < 0.5 ? true : false;
				match.seat2Winner = !match.seat1Winner;
				match.seat1Seed = 1;
				match.seat2Seed = 2;
				match.articleId = 0;
				match.article = {title: 'Test Title', content: this.getDevContent(), id: 0 };
				match.mainVideo = 'https://campusinsiders.com/videos/purdues-p-j-thompson-nails-another-half-court-buzzer-beater/video-embed/';
				match.supplementalVideo2 = match.supplementalVideo1 = match.mainVideo;
			});
		});
	}

	getDevContent() {
		return(`
			<h1>HTML Ipsum Presents</h1>

			<p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>

			<h2>Header Level 2</h2>

			<ol>
			   <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
			   <li>Aliquam tincidunt mauris eu risus.</li>
			</ol>

			<blockquote><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna. Cras in mi at felis aliquet congue. Ut a est eget ligula molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis mollis, tellus est malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.</p></blockquote>

			<h3>Header Level 3</h3>

			<ul>
			   <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
			   <li>Aliquam tincidunt mauris eu risus.</li>
			</ul>

			<pre><code>
			#header h1 a {
			  display: block;
			  width: 300px;
			  height: 80px;
			}
			</code></pre>
		`)
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
