import Command from '@ckeditor/ckeditor5-core/src/command';

export default class IdentifiedHighlightCommand extends Command {
	constructor( editor ) {
		super( editor );

		const options = editor.config.get( 'identifiedHighlight.options' ) || {};
		const document = editor.editing.view.document;

		this.listenTo( document, 'change:isFocused', ( _evt, _name, isFocused ) => {
			if ( !isFocused ) {
				this.value = undefined;
			} else {
				if ( options.onHighlightChange ) {
					options.onHighlightChange( this.value );
				}
				if ( options.onEnabledChange ) {
					options.onEnabledChange( this.isEnabled );
				}
			}
		} );

		this.listenTo( this, 'change:value', ( _evt, _name, value ) => {
			if ( options.onHighlightChange ) {
				options.onHighlightChange( value );
			}
		} );

		this.listenTo( this, 'change:isEnabled', ( _evt, _name, isEnabled ) => {
			if ( options.onEnabledChange ) {
				options.onEnabledChange( isEnabled );
			}
		} );
	}

	refresh() {
		const editor = this.editor;
		const model = editor.model;
		const selection = model.document.selection;

		const validRanges = model.schema.getValidRanges(
			selection.getRanges(),
			'identifiedHighlight'
		);
		const ranges = [];
		for ( const range of validRanges ) {
			ranges.push( range );
		}
		this.isEnabled = ranges.length > 0;

		let newValue = undefined;
		// console.log( selection );
		if ( selection.isCollapsed ) {
			newValue = selection.getAttribute( 'identifiedHighlight' );
			// console.log( 'collapsed', newValue );
		} else {
			const start = model.createSelection( selection.getFirstPosition() );
			const end = model.createSelection( selection.getLastPosition() );

			const startValue = start.getAttribute( 'identifiedHighlight' );
			const endValue = end.getAttribute( 'identifiedHighlight' );

			// console.log( 'not collapsed', start, end, startValue, endValue );

			if ( startValue === endValue ) {
				newValue = startValue;
			}
		}
		if ( this.value !== newValue ) {
			this.value = newValue;
		}
	}

	execute() {
		const editor = this.editor;
		const model = editor.model;
		const selection = model.document.selection;

		model.change( writer => {
			const options = editor.config.get( 'identifiedHighlight.options' ) || {};
			const id = options.generateId();
			const ranges = model.schema.getValidRanges(
				selection.getRanges(),
				'identifiedHighlight'
			);

			for ( const range of ranges ) {
				writer.setAttribute( 'identifiedHighlight', id, range );
				options.onHighlightAdd( id );
				if ( this.value !== id ) {
					this.value = id;
				}
			}
		} );
	}
}
