import { computed, observable } from 'mobx';

export default class PostsStore {

	@observable posts;

	@observable fetching;

	constructor( posts ) {
		this.posts = [];
		if ( posts instanceof Array && posts.length ) {
			this.posts = posts;
		}
	}

	bootstrap() {
		if ( window.wp_bracket && wp_bracket.hasOwnProperty('bootstrapPosts') ) {
			wp_bracket.bootstrapPosts.map( (post) => {
				const boostrappedPost = { id: post.id, content: post.content, title: post.title }
				this.posts.push( boostrappedPost );
			} );
			return true;
		}
		return false;
	}

	async getPost( id ) {
		id = parseInt(id);
		let posts = this.posts.filter( (post) => id === post.id );
		if ( ! posts.length ) {
			await this.fetchPost( id );
		}
		let post = this.posts.filter( (post) => id === post.id )[0];
		return post;
	}

	async fetchPost( id ) {
		id = parseInt( id );
		if ( ! id ) {
			return void 0;
		}
		this.fetching = true;
		let post;
		await fetch( this.postEndpoint( id ) )
			.then( (response ) => response.json() )
			.then( (json) => {
				if ( json.hasOwnProperty( 'id' ) ) {
					post = { id: json.id, content: json.content.rendered, title: json.title.rendered }
					this.posts.push( post );
				}
				this.fetching = false;
			})
			.catch( (error) => console.error( error ) );
		return post;
	}

	postEndpoint( id ) {
		if ( window.hasOwnProperty( 'wp_bracket' ) && window.wp_bracket.hasOwnProperty( 'endpoint' ) ) {
			return window.wp_bracket.endpoint.concat( `/${id}` );
		}
		return ( `http://campusinsiders.local/wp-json/wp/v2/posts/${id}` );
	}
}
