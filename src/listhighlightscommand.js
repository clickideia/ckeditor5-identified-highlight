import Command from '@ckeditor/ckeditor5-core/src/command';
import TreeWalker from '@ckeditor/ckeditor5-engine/src/model/treewalker';
import { compareArrays } from './utils';

export default class ListHighlightsCommand extends Command {
	constructor( editor ) {
		super( editor );
		this.isEnabled = true;
		this.value = [];
	}

	refresh() {
		const editor = this.editor;
		const model = editor.model;
		const root = model.document.getRoot();
		const options = editor.config.get( 'identifiedHighlight.options' ) || {};

		const firstPosition = model.createPositionAt( root, 0 );
		const walker = new TreeWalker( { startPosition: firstPosition } );

		const highlights = [];
		walker.skip( value => {
			const id = value.item.getAttribute( 'identifiedHighlight' );
			if ( id && !highlights.includes( id ) ) {
				highlights.push( id );
			}
			return true;
		} );

		if ( !compareArrays( this.value, highlights ) ) {
			this.value = highlights;
			if ( options.listHighlights ) {
				options.listHighlights( highlights );
			}
		}
	}
}
