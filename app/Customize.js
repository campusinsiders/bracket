window.addEventListener( "message", (event) => {
	let parsedData = JSON.parse( event.data );
	if ( void 0 !== parsedData && parsedData.hasOwnProperty('actions') ) {
		console.log(event);
		console.log( parsedData);
		parsedData.actions.map( (action) => {
			wp.customize( action.target, ( object ) => object.set('') );
		})
	}
} );

wp.customize.bind( 'ready', function() {
var settingId = 'my_setting_id';
var settingValue = 'Test Setting';
wp.customize.create( settingId, settingId, settingValue, { transport: 'postMessage', previewer: wp.customize.previewer } );

var controlId = settingId;
var controlLabel = 'My Control Title.';
var controlType = 'text';
var controlDescription = 'Test control description';
var controlContent = `
<li id="customize-control-test-control" class="customize-control customize-control-text" style="display: list-item;">
	<label>
		<span class="customize-control-title">${controlLabel}</span>
		<div class="customize-control-notifications-container" style="">
			<ul></ul>
		</div>
		<input type="text" value="" data-customize-setting-link="blogdescription" />
	</label>
</li>
`;
controlData = {
	content: controlContent,
	description: controlDescription,
	label: controlLabel,
	settings: { 'default': 'new_blogname' },
	type: controlType,
    active: true // @todo This should default to true
};

myControl = new wp.customize.Control( controlId, {
	params: controlData,
	previewer: wp.customize.previewer
});
wp.customize.control.add(controlId, myControl);
myControl.section(wp.customize.section('wp_bracket_main').id)
// console.log( wp.customize );
// console.log( window.wp.customize );
});

// var controlId, controlLabel, controlType, controlContent, controlDescription, controlData, mockControl,
// 	mockControlInstance, controlExpectedValues, sectionId, sectionContent, sectionData, mockSection,
// 	sectionInstance, sectionExpectedValues, panelId, panelTitle, panelDescription, panelContent, panelData,
// 	mockPanel, panelExpectedValues, testCustomizerModel, settingId, settingValue, mockSetting;

// settingId = 'new_blogname';
// settingValue = 'Hello World';

// mockSetting = wp.customize.create(
//     settingId,
//     settingId,
//     settingValue,
//     {
//         transport: 'refresh',
//         previewer: wp.customize.previewer
//     }
// );


// sectionId = 'mock_title_tagline';
// sectionContent = '<li id="accordion-section-mock_title_tagline" class="accordion-section control-section control-section-default"> <h3 class="accordion-section-title" tabindex="0"> Section Fixture <span class="screen-reader-text">Press return or enter to open</span> </h3> <ul class="accordion-section-content"> <li class="customize-section-description-container"> <div class="customize-section-title"> <button class="customize-section-back" tabindex="-1"> <span class="screen-reader-text">Back</span> </button> <h3> <span class="customize-action">Customizing &#9656; Fixture Panel</span> Section Fixture </h3> </div> </li> </ul> </li>';
// sectionData = {
// 	content: sectionContent,
// 	active: true,
// 	type: 'default'
// };

// mockSection = new wp.customize.Section( sectionId, { params: sectionData } );

// sectionExpectedValues = {
// 	type: 'Section',
// 	id: sectionId,
// 	content: sectionContent,
// 	priority: 100,
//         active: true // @todo This should default to true
//     };


//     // test( 'Section has been embedded', function () {
//     // 	equal( mockSection.deferred.embedded.state(), 'resolved' );
//     // } );

//     wp.customize.section.add( sectionId, mockSection );

//     // test( 'Section instance added to the wp.customize.section object', function () {
//     // 	ok( wp.customize.section.has( sectionId ) );
//     // });

//     sectionInstance = wp.customize.section( sectionId );

//     // test( 'Section instance has right content when accessed from wp.customize.section()', function () {
//     // 	equal( sectionInstance.params.content, sectionContent );
//     // });

//     // test( 'Section instance has no children yet', function () {
//     // 	equal( sectionInstance.controls().length, 0 );
//     // });

//     // module( 'Dynamically-created Customizer Control Model' );

    controlId = 'new_blogname';
    controlLabel = 'Site Title';
    controlType = 'text';
    controlContent = '<li id="customize-control-blogname" class="customize-control customize-control-text"></li>';
    controlDescription = 'Test control description';

    controlData = {
    	content: controlContent,
    	description: controlDescription,
    	label: controlLabel,
    	settings: { 'default': 'new_blogname' },
    	type: controlType,
        active: true // @todo This should default to true
    };

    mockControl = new wp.customize.Control( controlId, {
    	params: controlData,
    	previewer: wp.customize.previewer
    });

//     controlExpectedValues = {
//     	type: 'Control',
//     	content: controlContent,
//     	description: controlDescription,
//     	label: controlLabel,
//     	id: controlId,
//     	priority: 10
//     };

//     // testCustomizerModel( mockControl, controlExpectedValues );

//     // test( 'Control instance does not yet belong to a section.', function () {
//     // 	equal( mockControl.section(), undefined );
//     // });
//     // test( 'Control has not been embedded yet', function () {
//     // 	equal( mockControl.deferred.embedded.state(), 'pending' );
//     // } );

//     // test( 'Control instance has the right selector.', function () {
//     // 	equal( mockControl.selector, '#customize-control-new_blogname' );
//     // });

//     wp.customize.control.add( controlId, mockControl );

//     // test( 'Control instance was added to the control class.', function () {
//     // 	ok( wp.customize.control.has( controlId ) );
//     // });

//     mockControlInstance = wp.customize.control( controlId );

//     // test( 'Control instance has the right id when accessed from api.control().', function () {
//     // 	equal( mockControlInstance.id, controlId );
//     // });

//     // test( 'Control section can be set as expected', function () {
//     // 	mockControl.section( mockSection.id );
//     // 	equal( mockControl.section(), mockSection.id );
//     // });
//     // test( 'Associating a control with a section allows it to be embedded', function () {
//     // 	equal( mockControl.deferred.embedded.state(), 'resolved' );
//     // });

//     // test( 'Control is now available on section.controls()', function () {
//     // 	equal( sectionInstance.controls().length, 1 );
//     // 	equal( sectionInstance.controls()[0], mockControl );
//     // });

//     // module( 'Dynamically-created Customizer Panel Model' );

//     panelId = 'mockPanelId';
//     panelTitle = 'Mock Panel Title';
//     panelDescription = 'Mock panel description';
//     panelContent = '<li id="accordion-panel-mockPanelId" class="accordion-section control-section control-panel control-panel-default"> <h3 class="accordion-section-title" tabindex="0"> Fixture Panel <span class="screen-reader-text">Press return or enter to open this panel</span> </h3> <ul class="accordion-sub-container control-panel-content"> <li class="panel-meta customize-info accordion-section cannot-expand"> <button class="customize-panel-back" tabindex="-1"><span class="screen-reader-text">Back</span></button> <div class="accordion-section-title"> <span class="preview-notice">You are customizing <strong class="panel-title">Fixture Panel</strong></span> <button class="customize-help-toggle dashicons dashicons-editor-help" tabindex="0" aria-expanded="false"><span class="screen-reader-text">Help</span></button> </div> </li> </ul> </li>';
//     panelData = {
//     	content: panelContent,
//     	title: panelTitle,
//     	description: panelDescription,
//         active: true, // @todo This should default to true
//         type: 'default'
//     };

//     mockPanel = new wp.customize.Panel( panelId, { params: panelData } );

//     panelExpectedValues = {
//     	type: 'Panel',
//     	id: panelId,
//     	title: panelTitle,
//     	description: panelDescription,
//     	content: panelContent,
//     	priority: 100,
//     	active: true
//     };

//     // testCustomizerModel( mockPanel, panelExpectedValues );

//     // test( 'Panel instance is not contextuallyActive', function () {
//     // 	equal( mockPanel.isContextuallyActive(), false );
//     // });
