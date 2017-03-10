<?php
/**
 * WP Bracket Options Page
 *
 * Creates an options page where administrators can set the source url for the externally hosted assets.
 *
 * @package  WP_Bracket
 */

namespace Lift\Campus_Insiders\WP_Bracket;

/**
 * WP_Bracket Options
 *
 * Sets up the Options available on the WP Bracket Options Page.  Requires Fieldmanager, won't load
 * if that plugin isn't activated.
 *
 * @return void
 */
function wp_bracket_options() {

	$fields = new \Fieldmanager_Group( array(
		'name' => 'wp_bracket_options',
		'children' => array(
			'source_url' => new \Fieldmanager_TextField( 'Source Url for external assets' ),
		),
	) );
	$fields->activate_submenu_page();
}

/*
 * Load the Submenu Page and Options
 */
add_action( 'plugins_loaded', function() {
	// Ensure Fieldmanager is Activated.
	if ( ! function_exists( 'fm_register_submenu_page' ) ) {
		return;
	}

	// Hook up our fields.
	add_action( 'fm_submenu_wp_bracket_options', __NAMESPACE__ . '\\wp_bracket_options' );

	// Register the Submenu Page.
	\fm_register_submenu_page( 'wp_bracket_options', 'options-general.php', 'Bracket Options' );
});
