<?php
/**
 * Plugin Name: WP Bracket
 * Description: Custom bracket functionality built for Campus Insiders
 * Author: Christian Chung <christian@liftux.com>
 * Author URI: https://liftux.com
 * Version: 0.1.0
 */


add_action( 'wp_enqueue_scripts', function() {
	wp_register_script( 'bracket-manifest', plugins_url( 'dist/manifest.bundle.js', __FILE__ ), [], false, true );
	wp_register_script( 'bracket-vendor', plugins_url( 'dist/vendor.bundle.js', __FILE__ ), ['bracket-manifest'], false, true );
	wp_enqueue_script( 'bracket', plugins_url( 'dist/main.bundle.js', __FILE__ ), ['bracket-vendor'], false, true );
	wp_enqueue_style( 'bracket', plugins_url( 'dist/bundle.css', __FILE__ ), [] );
	wp_localize_script( 'bracket', 'wp_bracket', array(
		'queriedObjectId' => get_queried_object_id(),
		'bracketData' => wp_bracket_data( get_queried_object_id() ),
		'endpoint' => home_url( '/wp-json/wp/v2/posts' )
	) );
	add_filter( 'playbook_should_enqueue_js', '__return_false' );
}, 1 );

function wp_bracket_data( $post_id ) {
	if ( ! ( $data = get_post_meta( $post_id, 'wp_bracket_data', true ) ) ) {
		$object = new \stdClass;
		$object->postId = $post_id;
		$object->depth = 6;
		$data = json_encode( $object );
		update_post_meta( $post_id, 'wp_bracket_data', $data );
	}
	error_log( $data );
	return $data;
}

add_action( 'admin_enqueue_scripts', function() {
	wp_register_script( 'bracket-manifest', plugins_url( 'dist/manifest.bundle.js', __FILE__ ), [], false, true );
	wp_register_script( 'bracket-vendor', plugins_url( 'dist/vendor.bundle.js', __FILE__ ), ['bracket-manifest'], false, true );
	wp_enqueue_script( 'admin-bracket', plugins_url( 'dist/admin.bundle.js', __FILE__ ), ['bracket-vendor'], false, true );
	wp_localize_script( 'admin-bracket', 'wp_bracket', array(
		'dropdownPosts' => array_map( function( $post ) {
				return (object) [ 'value' => $post->ID, 'name' => $post->post_title ];
			}, get_posts() )
	) );
	add_filter( 'playbook_should_enqueue_js', '__return_false' );
}, 1 );

function wp_bracket_customizer( $wp_customize ) {
	$wp_customize->add_panel( 'wp_bracket', array(
		'title' => __( 'Bracket', 'wp-bracket' ),
		'priority' => 160
	) );
	$wp_customize->add_section( 'wp_bracket_main', array(
		'title' => __( 'Bracket Customizations', 'wp-bracket' ),
		'panel' => 'wp_bracket',
		'priority' => 10
	) );
	$wp_customize->add_section( 'wp_bracket_round', array(
		'title' => __( 'Round Customizations', 'wp-bracket' ),
		'panel' => 'wp_bracket',
		'priority' => 50
	) );
	$wp_customize->add_section( 'wp_bracket_matchup', array(
		'title' => __( 'Matchup Customizations', 'wp-bracket' ),
		'panel' => 'wp_bracket',
		'priority' => 100
	) );
	$wp_customize->add_setting( 'wp_bracket_data', array(
		'type' => 'wp_bracket',
		'capability' => 'edit_theme_options',
		'default' => '',
		'transport' => 'postMessage'
	) );
	$wp_customize->add_control( 'wp_bracket_data', array(
		'section' => 'wp_bracket_main',
		'type' => 'textarea',
		'setting' => 'wp_bracket_data'
	) );
}
add_action( 'customize_register', 'wp_bracket_customizer', 10, 1 );

function wp_bracket_customize_changeset_save_data( $data, $context ) {
	//error_log( print_r( $data, true ) );
	//error_log( print_r( $context['previous_data'], true ) );
	return $data;
}
add_action( 'customize_changeset_save_data', 'wp_bracket_customize_changeset_save_data', 10, 2 );

function wp_bracket_customize_save( \WP_Customize_Manager $wp_customize ) {
	error_log( print_r( $wp_customize, true ) );
	return $wp_customize;
}
//add_action( 'customize_save', 'wp_bracket_customize_save', 10, 1 );

// add_action( 'customize_update_wp_bracket', function( $value, $WP_Customize_Setting ) {
// 	error_log( 'hello world');
// 	error_log( print_r( $value, true ) );
// 	error_log( print_r( $WP_Customize_Setting, true ) );
// }, 10, 2 );

function customize_update_wp_bracket( $value, $setting ) {
	error_log( 'value:' );
	error_log( print_r( $value, true ) );
	error_log( 'setting:');
	$new_setting = $setting;
	$new_setting->manager = null;
	error_log( print_r( $new_setting, true ) );
	if ( 'wp_bracket_data' === $setting->id ) {
		$data = json_decode( $value );
		error_log( print_r( $data, true ) );
		if ( isset( $data->postId ) ) {
			update_post_meta( absint( $data->postId ), 'wp_bracket_data', wp_slash(wp_json_encode($value)) );
		}
	}
}
add_action( 'customize_update_wp_bracket', 'customize_update_wp_bracket', 10, 2 );

function wp_bracket_customize_dynamic_setting_args( $args, $setting_id ) {
	if ( false !== strpos( $setting_id, 'wp_bracket' ) ) {
		$args['type'] = 'wp_bracket';
	}
	return $args;
}
add_action( 'customize_dynamic_setting_args', 'wp_bracket_customize_dynamic_setting_args', 10, 2 );
