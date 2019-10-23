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

			walker.skip(value => value.item.getAttribute("identifiedHighlight") !== highlightId)
			const highlightStart = walker.position;
			walker.skip(value => value.item.getAttribute("identifiedHighlight") === highlightId)
			const highlightEnd = walker.position;

			const highlightRange = writer.createRange( highlightStart, highlightEnd );
			const highlightSelection = writer.createSelection( highlightRange );

			if ( !highlightSelection.isCollapsed ) {
				highlightSelection.removeAttribute( highlightId );
			}
		} );
	}
}
