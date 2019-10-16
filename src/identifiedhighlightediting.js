import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

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
			model: {
				key: 'identifiedHighlight',
				values: []
			},
			view: {}
		};

		return definition;
	}
}
