export function bracketUrl( $path ) {
	if ( window.hasOwnProperty( 'wp_bracket' ) && wp_bracket.hasOwnProperty('bracketUrl') ) {
		return wp_bracket.bracketUrl.concat( $path );
	}
	return window.location.origin.concat( $path );
}
