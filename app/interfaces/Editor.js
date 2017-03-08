import { toJS } from 'mobx';

export default class Editor {

	target;

	source;

	inFocus;

	currentValue;

	newValue;

	setTarget( target ) {
		this.unmount();
		this.target = this.mount(target);
	}

	change( prop ) {
		if ( 'string' === typeof( prop ) && this.target.hasOwnProperty( prop ) ) {
			this.inFocus = prop;
			this.currentValue = this.target[prop];
			return this;
		}

		if ( Array.isArray( prop ) && this.target.hasOwnProperty( prop[0] ) ) {
			this.inFocus = prop;
			//console.log(this);
			this.currentValue = this.target[prop[0]];
			return this;
		}
		this.inFocus = void 0;
		console.warn('Editor not focused.')
		return this;
	}

	to( value ) {
		let target = this.target;
		let property = this.inFocus;
		if ( Array.isArray( this.inFocus ) && this.inFocus.length >= 2 ) {
			target[property.shift()][property.shift()] = value;
			if ( property.length ) {
				throw new Exception( 'Editor::to() does not recurse, you should set a new target.' );
			}
			return this;
		}
		target[property] = ( void 0 !== property ) ? value : this.currentValue

		//console.log( 'EDITOR:', toJS( this ));
		return this;
	}

	from( source ) {
		this.source = source;
		return this;
	}

	mount( target ) {
		parent.postMessage( JSON.stringify({
			actions: [
				{
					action: 'focusOn',
					target: target
				}
			]
		}), window.location.origin );
		return target;
	}

	unmount() {
		this.target = void 0;
		parent.postMessage( JSON.stringify({
			actions: [
				{
					action: 'unmount',
					target: this.target
				}
			]
		}), window.location.origin );
	}
}
