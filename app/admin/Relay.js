export default class Relay {

	channel:String;

	callback:String;

	constructor() {
		window.addEventListener( 'message', this.receive.bind( this ) );
	}

	receive( event ) {

	}

	respond() {

	}

	send() {

	}

	listenOn( channel ) {

	}

	andRespondWith( func ) {

	}
}
