import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import IdentifiedHighlightCommand from './identifiedhighlightcommand';
import RemoveHighlightCommand from './removehighlightcommand';
import ListHighlighsCommand from './listhighlightscommand';
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

		// Allow identified highlight attribute on text nodes.
		schema.extend( '$text', { allowAttributes: 'identifiedHighlight' } );
	}

	_defineConverters() {
		const editor = this.editor;
		const conversion = editor.conversion;

		conversion.for( 'downcast' ).attributeToElement( {
			model: 'identifiedHighlight',
			view: createIdentifiedHighlightElement
		} );

		conversion.for( 'upcast' ).elementToAttribute( {
			view: {
				name: 'mark',
				attributes: {
					'data-highlight-id': true
				}
			},
			model: {
				key: 'identifiedHighlight',
				value: viewElement => viewElement.getAttribute( 'data-highlight-id' )
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

		editor.commands.add(
			'identifiedHighlight:list',
			new ListHighlighsCommand( editor )
		);
	}
}
