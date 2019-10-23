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

		const fpos = model.createPositionAt( root, 0 );

		const walker = new TreeWalker( { startPosition: fpos } );
		console.log( walker );

		model.change( writer => {
			console.log("writer", writer);
			const firstPosition = writer.createPositionAt( root, 0 );

			const highlightStart = firstPosition.getLastMatchingPosition( value => value.item.getAttribute( 'identifiedHighlight' ) !== highlightId );
			const highlightEnd = highlightStart.getLastMatchingPosition( value => value.item.getAttribute( 'identifiedHighlight' ) === highlightId );
			console.log("start", highlightStart);
			console.log("end", highlightEnd);

			const highlightRange = writer.createRange( highlightStart, highlightEnd );
			console.log("range", highlightRange);
			const highlightSelection = writer.createSelection( highlightRange );
			console.log("selection", highlightSelection);

			if ( !highlightSelection.isCollapsed ) {
				highlightSelection.removeAttribute( highlightId );
			}
		} );
	}
}
