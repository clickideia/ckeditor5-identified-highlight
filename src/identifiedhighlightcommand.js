import Command from '@ckeditor/ckeditor5-core/src/command';

export default class IdentifiedHighlightCommand extends Command {
	refresh() {
		const model = this.editor.model;
		const selection = model.document.selection;

		this.value = selection.getAttribute( 'identifiedHighlight' );

		this.isEnabled = model.schema.checkAttributeInSelection(
			selection,
			'identifiedHighlight'
		);
	}

	execute() {
		const editor = this.editor;
		const model = editor.model;
		const selection = model.document.selection;
		const options = editor.config.get( 'identifiedHighlight.options' );
		const id = options.generateId();
		const returnObj = {
			id,
			success: false
		};

		model.change( writer => {
			const ranges = model.schema.getValidRanges(
				selection.getRanges(),
				'identifiedHighlight'
			);

			for ( const range of ranges ) {
				returnObj.success = true;
				writer.setAttribute( 'identifiedHighlight', id, range );
			}
		} );

		return returnObj;
	}
}
