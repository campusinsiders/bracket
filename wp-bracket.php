<?php
/**
 * Plugin Name: WP Bracket
 * Description: Custom bracket functionality built for Campus Insiders
 * Author: Christian Chung <christian@liftux.com> and Anthony Garand <garand@liftux.com>
 * Author URI: https://liftux.com
 * Version: 0.1.0
 */

namespace Lift\Campus_Insiders\WP_Bracket;
use Lift\Campus_Insiders\WP_Bracket\WP_Bracket;

// Require the WP_Bracket class.
require_once( plugin_dir_path( __FILE__ ) . 'class-wp-bracket.php' );

add_action( 'plugins_loaded', array( WP_Bracket::class, 'factory' ) );
