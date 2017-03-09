export default class DividerInterface {

	uid:Number;

	count:Number;

	position:String;

	constructor( data ) {
		Object.assign( this, { count: 0 }, data );
		this.position = 'string' === typeof data.position ? data.position : 'left';
	}
}
