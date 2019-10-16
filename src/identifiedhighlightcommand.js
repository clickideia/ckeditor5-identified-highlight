import Command from '@ckeditor/ckeditor5-core/src/command';

export default class IdentifiedHighlightCommand extends Command {
	refresh() {
		const model = this.editor.model;
		const selection = model.document.selection;

		this.value = selection.getAttribute( 'identifiedHighlight' );
		this.isEnabled = model.schema.checkAttributeInSelection( selection, 'identifiedHighlight' );
	}

	execute( options ) {
		const model = this.editor.model;
		const selection = model.document.selection;

		model.change( writer => {
			const ranges = model.schema.getValidRanges( selection.getRanges(), 'identifiedHighlight' );

			for ( const range of ranges ) {
				writer.setAttribute( 'identifiedHighlight', true, range );
			}
		} );
	}
}
