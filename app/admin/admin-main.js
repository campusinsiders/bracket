import Customizer from './Customizer';

wp.customize.bind( 'ready', function() {
	let bracket = window.bracket = { customizer: new Customizer( wp.customize ) };
	// Init the controls.
	bracket.customizer.initMainSection();

	wp.customize.previewer.bind( 'ready', () => {
		if ( ! wp.customize.previewer.targetWindow().hasOwnProperty('appStore' ) ) {
			return;
		}
		wp.customize.bind('change', () => wp.customize('wp_bracket_data')._dirty = true );
		wp.customize('wp_bracket_data').get = () => ( wp.customize.previewer.targetWindow().appStore.stringified );
	});

	// Listen for init on the bracket.
	window.addEventListener( "message", (event) => {
		let parsedData = JSON.parse( event.data );
		if ( void 0 !== parsedData && parsedData.hasOwnProperty('actions') ) {
			parsedData.actions.map( ( action ) => {
				//console.log( 'Frame Event: ', event );
				if ( 'init' === action.action ) {
					// Init rounds.
					const { nodes } = action.data.roundStore;
					nodes.map( (node) => {
						if ( node.hasOwnProperty( 'matchStore') ) {
							let roundSection = bracket.customizer.initRound( node );
							roundSection.createControls();
							roundSection.section.deactivate();

							node.matchStore.matchups.map( (match) => {
								let matchSection = bracket.customizer.initMatchup( match );
								matchSection.createControls();
								matchSection.section.deactivate();
							})
						}
					});
				}

				if ( 'update' === action.action ) {
					wp.customize( 'wp_bracket_data', ( object ) => object.set(JSON.stringify( action.data ) ) );
				}

				if ( 'focusOn' === action.action ) {
					if ( action.hasOwnProperty( 'target') && action.target.hasOwnProperty( 'matchStore' ) ) {
						let id = `wp_bracket_round_${action.target.uid}`;
						bracket.customizer.roundSections.map( (s) => s.section.deactivate() );
						wp.customize.section(id).activate();
						wp.customize.section(id).focus()
					}

					if ( action.hasOwnProperty( 'target') && action.target.hasOwnProperty( 'seat1Team' ) ) {
						let id = `wp_bracket_round_${action.target.roundId}_matchup_${action.target.uid}`;
						bracket.customizer.roundSections.map( (s) => s.section.deactivate() );
						wp.customize.section(id).activate();
						wp.customize.section(id).focus()
					}
				}

				if ( 'unmount' === action.action ) {
					wp.customize.panel(window.bracket.customizer.panelId).focus();
				}
			})
		}
	} );
});
