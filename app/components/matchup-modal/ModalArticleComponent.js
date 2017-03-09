import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject( 'store' ) @observer
export default class ModalArticleComponent extends Component {
	constructor( props ) {
		super( props );
		console.log(this.props);
	}

	render() {
		if ( void 0 === this.article || ! this.article.hasOwnPropert('content') || '' === this.article.content ) {
			return false;
		}

		return(
			<div className="modal__matchupArticle" dangerouslySetInnerHTML={content}/>
		);
	}
}
