import Command from '@ckeditor/ckeditor5-core/src/command';
import TreeWalker from '@ckeditor/ckeditor5-engine/src/model/treewalker';

export default class RemoveHighlightCommand extends Command {
	refresh() {
		this.isEnabled = true;
	}

	execute( { highlightId } ) {
		const editor = this.editor;
		const model = editor.model;
		const root = model.document.getRoot();

		model.change( writer => {
			const firstPosition = model.createPositionAt( root, 0 );
			const walker = new TreeWalker( { startPosition: firstPosition } );
			const options = editor.config.get( 'identifiedHighlight.options' );

			const ranges = [];
			while ( !walker.next().done ) {
				walker.skip( value => value.item.getAttribute( 'identifiedHighlight' ) !== highlightId );
				const highlightStart = walker.position;
				walker.skip( value => value.item.getAttribute( 'identifiedHighlight' ) === highlightId );
				const highlightEnd = walker.position;

				const highlightRange = writer.createRange( highlightStart, highlightEnd );
				if ( !highlightRange.isCollapsed ) {
					ranges.push( highlightRange );
				}
			}

			for ( const range of ranges ) {
				writer.removeAttribute( 'identifiedHighlight', range );
				options.onHighlightRemove( highlightId );
			}
		} );
	}
}
