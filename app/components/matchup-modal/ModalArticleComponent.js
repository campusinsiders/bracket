import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject( 'store' ) @observer
export default class ModalArticleComponent extends Component {
	constructor( props ) {
		super( props );
		this.content = '';

	}

	async componentWillMount() {
		await this.props.store.postsStore.getPost( this.props.articleId )
			.then( (post) => this.content = post.content.rendered );
		this.html = { __html: this.content }
	}

	render() {
		return(
			<div className="modal__matchupArticle" dangerouslySetInnerHTML={this.html}/>
		);
	}
}
