export default class DividerInterface {

	uid:Number;

	count:Number;

	position:String;

	constructor( data ) {
		this.uid = data.uid;
		this.count = data.count || 0;
		this.position = 'string' === typeof data.position ? data.position : 'left';
	}
}
