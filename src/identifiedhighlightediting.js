import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import IdentifiedHighlightCommand from './identifiedhighlightcommand';

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
		const options = editor.config.get( 'identifiedHighlight.options' );

		// Set-up the two-way conversion.
		conversion.attributeToElement( this._buildDefinition( options ) );
	}

	_buildDefinition( options ) {
		const definition = {
			model: 'identifiedHighlight',
			view: {
				name: 'span',
				class: 'mark'
			}
		};

		return definition;
	}

	_addComand() {
		const editor = this.editor;

		editor.commands.add( 'identifiedHighlight', new IdentifiedHighlightCommand( editor ) );
	}
}
