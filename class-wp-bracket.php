<?php
/**
 * WP Bracket Class
 *
 * @package  WP_Bracket
 */

namespace Lift\Campus_Insiders\WP_Bracket;

/**
 * Class WP_Bracket
 *
 * This class handles the backend administration tasks related to bracket functionality. It
 * registers and enqueues both the public and admin scripts and styles. It sets up the
 * Customizer to support dynamic setting and control creation, and handles the saving of that
 * data. With the exception of main Bracket Customizer Panel and Section, this class will not
 * output to the screen.
 */
class WP_Bracket {
	/**
	 * Plugin Url
	 *
	 * @var  string Public url to this plugin directory.
	 */
	public $plugin_url;

	/**
	 * Plugin
	 *
	 * @var  string Path to this plugin.
	 */
	public $plugin_path;

	/**
	 * Constructor
	 */
	public function __construct() {
		$this->plugin_url = plugin_dir_url( __FILE__ );
		$this->plugin_path = dirname( __FILE__ );

		return $this;
	}

	/**
	 * Static Factory
	 *
	 * @return WP_Bracket Self instance.
	 */
	public static function factory() {
		$self = new self;
		return $self->setup();
	}

	/**
	 * Setup
	 *
	 * @return WP_Bracket Self Instance
	 */
	public function setup() {
		add_action( 'wp_enqueue_scripts', array( $this, 'register_dependencies' ), 1 );
		add_action( 'admin_enqueue_scripts', array( $this, 'register_dependencies' ), 1 );
		add_action( 'customize_register', array( $this, 'setup_customizer' ) );
		add_action( 'customize_update_wp_bracket', array( $this, 'customize_update' ), 10, 2 );
		add_action( 'customize_dynamic_setting_args', array( $this, 'customize_settings' ), 10, 2 );

		return $this;
	}

	/**
	 * Register Dependencies
	 *
	 * @return WP_Bracket Self instance.
	 */
	public function register_dependencies() {
		wp_register_script( 'bracket-manifest', plugins_url( 'dist/manifest.bundle.js', __FILE__ ), [], false, true );
		wp_register_script( 'bracket-vendor', plugins_url( 'dist/vendor.bundle.js', __FILE__ ), [ 'bracket-manifest' ], false, true );
		wp_register_script( 'bracket', plugins_url( 'dist/main.bundle.js', __FILE__ ), [ 'bracket-vendor' ], false, true );
		wp_register_script( 'admin-bracket', plugins_url( 'dist/admin.bundle.js', __FILE__ ), [ 'bracket-vendor' ], false, true );
		wp_register_style( 'bracket', plugins_url( 'dist/bundle.css', __FILE__ ), [] );

		return $this->enqueue_dependencies();
	}

	/**
	 * Enqueue Dependencies
	 *
	 * @return WP_Bracket Self instance.
	 */
	public function enqueue_dependencies() {
		if ( is_admin() ) {
			wp_enqueue_script( 'admin-bracket' );
		}

		if ( is_page_template( 'template-bracket.php' ) ) {
			wp_enqueue_script( 'bracket' );
			wp_enqueue_style( 'bracket' );
			add_filter( 'playbook_should_enqueue_js', '__return_false' );
			add_filter( 'playbook_should_enqueue_css', '__return_false' );
		}

		return $this->localize_scripts();
	}

	/**
	 * Localize Scripts
	 *
	 * @return WP_Bracket Self instance.
	 */
	public function localize_scripts() {
		if ( is_admin() ) {
			wp_localize_script( 'admin-bracket', 'wp_bracket', $this->get_admin_exports() );
		}
		if ( is_page_template( 'template-bracket.php' ) ) {
			wp_localize_script( 'bracket', 'wp_bracket', $this->get_public_exports() );
		}
		return $this;
	}

	/**
	 * Get Admin Exports
	 *
	 * @return array An array of key values to pass to wp_localize_script.
	 */
	public function get_admin_exports() {
		if ( ! is_admin() ) {
			return false;
		}

		$query = new \WP_Query( [
			'posts_per_page' => 100,
			'tag' => 'ncaa-tournament-predictions',
			'no_found_rows' => true,
			'update_post_term_cache' => false,
			'update_post_meta_cache' => false,
		] );

		$dropdown_posts = array_map( function( $post ) {
			return (object) array(
				'name' => esc_attr( $post->post_title ),
				'value' => esc_attr( absint( $post->ID ) ),
			);
		}, $query->posts );

		return array( 'dropdownPosts' => $dropdown_posts );
	}

	/**
	 * Get Public Exports
	 *
	 * @return array An array of key values to pass to wp_localize_script
	 */
	public function get_public_exports() {
		$bracket_id = get_queried_object_id();
		$posts_to_bootstrap = get_post_meta( $bracket_id, 'wp_bracket_bootstrap_posts', true );
		$bracket_to_bootstrap = $this->_get_bracket_data( $bracket_id );
		$clean_posts = [];
		if ( false !== $posts_to_bootstrap ) {
			$posts = maybe_unserialize( $posts_to_bootstrap );

			if ( $posts ) {
				$clean_post_ids = array_map( '\absint', $posts );
				$query = new \WP_Query([
					'post__in' => $clean_post_ids,
					'ignore_sticky_posts' => true,
					'no_found_rows' => true,
					'update_post_term_cache' => false,
					'update_post_meta_cache' => false,
				] );

				$clean_posts = array_map( function( $post ) {
					$post->post_content = apply_filters( 'the_content', $post->post_content );
					$post->post_title = apply_filters( 'the_title', $post->post_title );
					return $post;
				}, $query->posts );
			}
		}
		return [
			'queriedObjectId' => $bracket_id,
			'bracketData' => $bracket_to_bootstrap,
			'bootstrapPosts' => $clean_posts,
			'endpoint' => home_url( '/wp-json/wp/v2/posts' ),
			'bracketUrl' => $this->plugin_url,
		];
	}

	/**
	 * Get Bracket Data
	 *
	 * @access protected
	 * @param  integer $post_id A WP_Post id.
	 * @return string           Bracket data in JSON representation.
	 */
	protected function _get_bracket_data( $post_id ) {
		if ( ! ( $data = get_post_meta( $post_id, 'wp_bracket_data', true ) ) ) {
			$object = new \stdClass;
			$object->postId = $post_id;
			$object->depth = 6;
			$data = wp_slash( wp_json_encode( $object ) );
			update_post_meta( $post_id, 'wp_bracket_data', $data );
		}
		return $data;
	}

	/**
	 * Setup Customizer
	 *
	 * @param \WP_Customize_Manager $wp_customize WP_Customize_Manager instance.
	 * @return WP_Bracket                         Self instance.
	 */
	public function setup_customizer( $wp_customize ) {
		$wp_customize->add_panel( 'wp_bracket', array(
			'title' => __( 'Bracket', 'wp-bracket' ),
			'priority' => 160,
		) );

		$wp_customize->add_section( 'wp_bracket_main', array(
			'title' => __( 'Bracket Customizations', 'wp-bracket' ),
			'panel' => 'wp_bracket',
			'priority' => 10,
		) );

		$wp_customize->add_section( 'wp_bracket_round', array(
			'title' => __( 'Round Customizations', 'wp-bracket' ),
			'panel' => 'wp_bracket',
			'priority' => 50,
		) );
		$wp_customize->add_section( 'wp_bracket_matchup', array(
			'title' => __( 'Matchup Customizations', 'wp-bracket' ),
			'panel' => 'wp_bracket',
			'priority' => 100,
		) );

		$wp_customize->add_setting( 'wp_bracket_data', array(
			'type' => 'wp_bracket',
			'capability' => 'edit_posts',
			'default' => '',
			'transport' => 'postMessage',
		) );

		$wp_customize->add_control( 'wp_bracket_data', array(
			'section' => 'wp_bracket_main',
			'type' => 'textarea',
			'setting' => 'wp_bracket_data',
		) );

		return $this;
	}

	/**
	 * Customize Update
	 *
	 * @param  mixed                 $value   The value to set.
	 * @param  \WP_Customize_Setting $setting The setting object being referenced.
	 * @return void
	 */
	public function customize_update( $value, $setting ) {
		if ( 'wp_bracket_data' !== $setting->id ) {
			return;
		}
		$data = json_decode( $value );
		$post_id = isset( $data->postId ) ? absint( $data->postId ) : 0;
		$posts = isset( $data->postsStore ) ? $data->postsStore : array();
		$clean_posts = array_map( 'absint', $posts );

		if ( $post_id ) {
			update_post_meta( $post_id, 'wp_bracket_data', wp_slash( $value ) );
			update_post_meta( $post_id, 'wp_bracket_bootstrap_posts', maybe_serialize( $clean_posts ) );
		}
	}

	/**
	 * Customize Settings
	 *
	 * @param  array  $args       An array of setting arguments.
	 * @param  string $setting_id The setting id.
	 * @return array              The filtered array of setting arguments.
	 */
	public function customize_settings( $args, $setting_id ) {
		if ( false !== strpos( $setting_id, 'wp_bracket' ) ) {
			$args['type'] = 'wp_bracket';
		}
		return $args;
	}
}
