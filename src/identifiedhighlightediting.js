import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import IdentifiedHighlightCommand from './identifiedhighlightcommand';
import { createIdentifiedHighlightElement } from './utils';

export default class IdentifiedHighlightEditing extends Plugin {
	static get pluginName() {
		return 'IdentifiedHighlightEditing';
	}

	constructor( editor ) {
		super( editor );
	}

	init() {
		this._defineSchema();
		this._defineConverters();
		this._addComand();
	}

	_defineSchema() {
		const schema = this.editor.model.schema;

		// Allow identified highlight attribute on text nodes.
		schema.extend( '$text', { allowAttributes: 'identifiedHighlight' } );
	}

	_defineConverters() {
		const editor = this.editor;
		const conversion = editor.conversion;

		conversion.for( 'dataDowncast' )
			.attributeToElement( { model: 'identifiedHighlight', view: createIdentifiedHighlightElement } );

		conversion.for( 'editingDowncast' )
			.attributeToElement( { model: 'identifiedHighlight', view: ( id, writer ) => {
				return createIdentifiedHighlightElement( id, writer );
			} } );

		conversion.for( 'upcast' )
			.elementToAttribute( {
				view: {
					name: 'marker',
					attributes: {
						'data-highlight-id': true
					}
				},
				model: {
					key: 'identifiedHighlight',
					value: viewElement => viewElement.getAttribute( 'id' )
				}
			} );
	}

	_addComand() {
		const editor = this.editor;

		editor.commands.add( 'identifiedHighlight', new IdentifiedHighlightCommand( editor ) );
	}
}
