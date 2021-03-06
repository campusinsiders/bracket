import React, { Component } from 'react';
import { Link } from 'react-router';
import { inject, observer } from 'mobx-react';

import { bracketUrl } from '../utils';

@inject("store") @observer
export default class MatchupModalComponent extends Component {

	constructor( props ) {
		super( props );
	}

	componentWillMount() {
		const { params } = this.props.router;
		let { activeMatchup, postsStore } = this.props.store;
		this.matchup = activeMatchup;

		if ( void 0 === this.matchup && ( params.round && params.matchup ) ) {
			this.round = params.round ? this.props.store.getRoundById(  parseInt( params.round ) ) : void 0;
			this.matchup = params.matchup ? this.round.getMatchupById( parseInt( params.matchup ) ) : void 0;
			activeMatchup = this.matchup;
		}

		// Only open the modal if the teams are set except if Editting is enabled.
		if ( void 0 === this.matchup || ( ! this.matchup.seat1Team && ! this.matchup.seat2Team ) ) {
			if ( ! this.props.store.edittingEnabled && '/' !== this.props.router.getCurrentLocation() ) {
				this.props.router.push( '/' );
				let bodyTag = document.getElementsByTagName('body')[0];
				bodyTag.classList.remove('frame--scrollLock');
				return;
			}
		}

		if ( this.matchup ) {
			this.props.store.setActiveMatchup( this.matchup );
			if ( void 0 !== this.matchup.article && ( ! this.matchup.article.hasOwnProperty('id') || this.matchup.article.id !== this.matchup.articleId ) ) {
				postsStore.getPost( this.matchup.articleId ).then( (post) => this.matchup.article = post ? post : this.matchup.article );
			}
		}

		window.setTimeout( () =>{
			let nodes = document.querySelectorAll('.modal__matchupArticle  .ooyala-container');
			let els = Array.prototype.slice.call(nodes);
			if ( els.length ) {
				els.map( (el) => { el.previousSibling.previousSibling.remove(); el.remove() });
			}

			let nodes2 = document.querySelectorAll('.modal__matchupArticle  .ooyala-video-wrapper');
			let els2 = Array.prototype.slice.call(nodes2);
			if ( els2.length ) {
				els2.map( (el) => {
					if ( el.previousElementSibling && el.previousElementSibling.previousElementSibling ) {
						el.previousElementSibling.previousElementSibling.remove();
					}
					el.remove()
				});
			}
		}, 500 );
	}

	componentWillUnmount() {
		this.props.store.setActiveMatchup( void 0 );
		let bodyTag = document.getElementsByTagName('body')[0];
		bodyTag.classList.remove('frame--scrollLock');
	}

	componentWillReact() {
		let { activeMatchup, postsStore } = this.props.store;

		if ( this.matchup ) {
			const { article, articleId } = this.matchup;
			if ( ( void 0 === article && articleId ) || ( article.hasOwnProperty('id') && ( article.id !== articleId ) ) ) {
				this.matchup.loading = true;
				postsStore.getPost( this.matchup.articleId ).then( (post) => {
					this.matchup.article = post ? post : this.matchup.article;
					this.matchup.loading = false;
				});
			}
		}
	}

	componentDidMount() {
		if ( void 0 !== this.matchup ) {
			let bodyTag = document.getElementsByTagName('body')[0];
			bodyTag.classList.add('frame--scrollLock');
		}
	}

	getSponsor() {
		const round = this.props.store.getRoundById( this.matchup.roundId );

		if ( round.sponsor ) {
			if ( round.sponsorLink ) {
				return(
					<a className="modal__matchupSponsor" href={round.sponsorLink}>
						<span>Sponsored by</span>
						<img src={ round.sponsor }/>
					</a>
				);
			}
			return(
				<div className="modal__matchupSponsor">
					<span>Sponsored by</span>
					<img src={round.sponsor}/>
				</div>
			);
		}
		return false;
	}

	getVideos() {
		if ( ! this.matchup.mainVideo && ! this.matchup.supplementalVideo1 && ! this.matchup.supplementalVideo2 ) {
			return;
		}

		const videos = [];
		if ( this.matchup.mainVideo ) {
			videos.push(
				<div key={'mainVideo'} className="modal__video modal__video--matchupVideo">
					<div><iframe width="560" height="315" src={this.matchup.mainVideo} frameBorder="0" allowFullScreen></iframe></div>
				</div>
				);
		}
		if ( this.matchup.supplementalVideo1 || this.matchup.supplementalVideo2 ) {
			videos.push(
				<div key={'teamVideos'} className="modal__teamVideos">
					<div className="modal__video modal__video--teamVideo">
						<div><iframe width="560" height="315" src={this.matchup.supplementalVideo1} frameBorder="0" allowFullScreen></iframe></div>
					</div>
					<div className="modal__video modal__video--teamVideo">
						<div><iframe width="560" height="315" src={this.matchup.supplementalVideo2} frameBorder="0" allowFullScreen></iframe></div>
					</div>
				</div>
			);
		}
		return(
			<div className="modal__videos">
				{videos}
			</div>
		)
	}

	render() {
		if ( void 0 === this.matchup ) {
			let bodyTag = document.getElementsByTagName('body')[0];
			bodyTag.classList.remove('frame--scrollLock');
			return ( <div className="modal"/> );
		}

		let html = {
			__html: ( void 0 !== this.matchup.article && this.matchup.article.hasOwnProperty('content') )
				? this.matchup.article.content
				: ( this.matchup.loading ) ? '<p>Loading Article</p>' : ''
			};
		return (
			<div className="modal modal--visible">
				<Link className="modal__close" to={'/'}>
					<img src={bracketUrl('/app/assets/arrow-left.svg')}/>
					Return to Bracket
				</Link>
				<div className="modal__content">
					<div className="modal__matchup">
						<div className="modal__matchupTeam">
							<span className="modal__matchupTeamName">
								<span className="modal__matchupTeamSeed">{this.matchup.seat1Seed}</span>
								{this.matchup.seat1Team}
							</span>
							<span className="modal__matchupTeamLogo">
								<img src={this.matchup.seat1Logo} />
							</span>
						</div>

						<div className="modal__matchupDivider">vs</div>

						<div className="modal__matchupTeam">
							<span className="modal__matchupTeamName">
								<span className="modal__matchupTeamSeed">{this.matchup.seat2Seed}</span>
								{this.matchup.seat2Team}
								</span>
							<span className="modal__matchupTeamLogo">
								<img src={this.matchup.seat2Logo} />
							</span>
						</div>
					</div>
					<div className="modal__matchupContent">
						<div className="modal__matchupSponsor">
							<div className="modal__matchupSponsor__6860Graphic">
								<img src={ bracketUrl('/app/assets/6860.svg')}/>
							</div>
							<div className="modal__matchupSponsor__yahoo">
								<a href="http://yahoo.com/tourney" target="_blank">
									<img src={bracketUrl('/app/assets/yahoo-sports.svg')}/>
								</a>
							</div>
							<div className="modal__matchupSponsor__6860Content">
								<div className="modal__matchupSponsor__6860ContentContainer">
									Fill out your bracket now at <a href="http://yahoo.com/tourney" target="_blank">http://yahoo.com/tourney</a>
								</div>
							</div>
						</div>
						{this.getVideos()}
						<div className="modal__matchupArticle" dangerouslySetInnerHTML={html}/>
					</div>
				</div>
			</div>
		);
	}
}
