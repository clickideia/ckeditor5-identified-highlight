import Command from '@ckeditor/ckeditor5-core/src/command';

export default class IdentifiedHighlightCommand extends Command {
	refresh() {
		const model = this.editor.model;
		const selection = model.document.selection;

		this.value = selection.getAttribute('identifiedHighlight');

		this.isEnabled = model.schema.checkAttributeInSelection(
			selection,
			'identifiedHighlight'
		);
		console.log(this.isEnabled, this.value);
	}

	execute() {
		const editor = this.editor;
		const model = editor.model;
		const selection = model.document.selection;
		const options = editor.config.get('identifiedHighlight.options');
		model.change(writer => {
			const ranges = model.schema.getValidRanges(
				selection.getRanges(),
				'identifiedHighlight'
			);
			const id = options.generateId();

			if (selection.isCollapsed) {
				const position = selection.getFirstPosition();

				if (selection.hasAttribute('identifiedHighlight')) {
					// const isSameHighlight = value => {
					// 	return value.item.hasAttribute( 'identifiedHighlight' ) && value.item.getAttribute( 'identifiedHighlight' ) === this.value;
					// };

					// const highlightStart = position.getLastMatchingPosition( isSameHighlight, { direction: 'backward' } );
					// const highlightEnd = position.getLastMatchingPosition( isSameHighlight );

					// const highlightRange = writer.createRange( highlightStart, highlightEnd );



				}
			}

			for (const range of ranges) {
				writer.setAttribute('identifiedHighlight', id, range);
			}
		});
	}
}
