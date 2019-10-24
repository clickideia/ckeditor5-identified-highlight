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

			ranges = [];
			while(!walker.next().done) {
				walker.skip(value => value.item.getAttribute("identifiedHighlight") !== highlightId)
				const highlightStart = walker.position;
				walker.skip(value => value.item.getAttribute("identifiedHighlight") === highlightId)
				const highlightEnd = walker.position;
				// console.log("editor", editor)
				// console.log("model", model)
				// console.log("highlightStart", highlightStart)
				// console.log("highlightEnd", highlightEnd)

				const highlightRange = writer.createRange( highlightStart, highlightEnd );
				ranges.push(highlightRange);
				// const highlightSelection = writer.createSelection( highlightRange );
			}
			console.log(ranges);


			// if ( !highlightSelection.isCollapsed ) {
			// 	highlightSelection.removeAttribute( highlightId );
			// }
		} );
	}
}
