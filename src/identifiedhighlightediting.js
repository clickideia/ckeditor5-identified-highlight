import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import IdentifiedHighlightCommand from './identifiedhighlightcommand';
import RemoveHighlightCommand from './removehighlightcommand';
import { createIdentifiedHighlightElement } from './utils';

export default class IdentifiedHighlightEditing extends Plugin {
	static get pluginName() {
		return 'IdentifiedHighlightEditing';
	}

	init() {
		this._defineSchema();
		this._defineConverters();
		this._addComands();
	}

	_defineSchema() {
		const schema = this.editor.model.schema;

		// Allow identified highlight attribute on text and block nodes.
		schema.extend( '$text', { allowAttributes: 'identifiedHighlight' } );
		schema.extend( '$block', { allowAttributes: 'identifiedHighlight' } );
	}

	_defineConverters() {
		const editor = this.editor;
		const conversion = editor.conversion;

		conversion
			.for( 'dataDowncast' )
			.attributeToElement( {
				model: 'identifiedHighlight',
				view: createIdentifiedHighlightElement
			} );

		conversion.for( 'editingDowncast' ).attributeToElement( {
			model: 'identifiedHighlight',
			view: ( id, writer ) => {
				return createIdentifiedHighlightElement( id, writer );
			}
		} );

		conversion.for( 'upcast' ).elementToAttribute( {
			view: {
				name: 'marker',
				attributes: {
					'data-highlight-id': true
				}
			},
			model: {
				key: 'identifiedHighlight',
				value: viewElement => {
					const id = viewElement.getAttribute( 'data-highlight-id' );
					console.log( viewElement );
					console.log( 'upcast id value:', id );
					return id;
				}
			}
		} );
	}

	_addComands() {
		const editor = this.editor;

		editor.commands.add(
			'identifiedHighlight:add',
			new IdentifiedHighlightCommand( editor )
		);

		editor.commands.add(
			'identifiedHighlight:remove',
			new RemoveHighlightCommand( editor )
		);
	}
}
