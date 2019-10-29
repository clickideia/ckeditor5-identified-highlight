import Command from '@ckeditor/ckeditor5-core/src/command';

export default class IdentifiedHighlightCommand extends Command {
	constructor( editor ) {
		super( editor );

		const options = editor.config.get( 'identifiedHighlight.options' ) || {};
		const document = editor.editing.view.document;

		this.listenTo( document, 'change:isFocused', ( _evt, _name, isFocused, wasFocused ) => {
			if ( options.onHighlightChange && isFocused !== wasFocused ) {
				if ( !isFocused ) {
					this.value = undefined;
				}
				options.onHighlightChange( this.value );
			}
		} );
	}

	refresh() {
		const editor = this.editor;
		const model = editor.model;
		const selection = model.document.selection;
		const options = editor.config.get( 'identifiedHighlight.options' ) || {};

		let newValue = undefined;
		if ( selection.isCollapsed ) {
			newValue = selection.getAttribute( 'identifiedHighlight' );
		} else {
			const start = model.createSelection( selection.getFirstPosition() );
			const end = model.createSelection( selection.getLastPosition() );

			const startValue = start.getAttribute( 'identifiedHighlight' );
			const endValue = end.getAttribute( 'identifiedHighlight' );

			console.log( start, end, startValue, endValue );

			if ( startValue === endValue ) {
				newValue = startValue;
			}
		}
		if ( this.value !== newValue ) {
			this.value = newValue;
			if ( options.onHighlightChange ) {
				options.onHighlightChange( newValue );
			}
		}

		this.isEnabled = model.schema.checkAttributeInSelection(
			selection,
			'identifiedHighlight'
		) && !selection.isCollapsed;
	}

	execute() {
		const editor = this.editor;
		const model = editor.model;
		const selection = model.document.selection;

		model.change( writer => {
			const options = editor.config.get( 'identifiedHighlight.options' );
			const id = options.generateId();
			const ranges = model.schema.getValidRanges(
				selection.getRanges(),
				'identifiedHighlight'
			);

			for ( const range of ranges ) {
				writer.setAttribute( 'identifiedHighlight', id, range );
				options.onHighlightAdd( id );
			}
		} );
	}
}
