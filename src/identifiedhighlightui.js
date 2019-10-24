import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

import commentIcon from './../theme/icons/comment.svg';

import './../theme/identifiedhighlight.css';

export default class IdentifiedHighlightUI extends Plugin {
	static get pluginName() {
		return 'IdentifiedHighlightUI';
	}

	init() {
		const options = this.editor.config.get( 'identifiedHighlight.options' );

		this._addButton( options );
	}

	_addButton( options ) {
		const editor = this.editor;
		const t = editor.t;

		editor.ui.componentFactory.add( 'identifiedHighlight:add', locale => {
			const buttonView = new ButtonView( locale );
			const command = editor.commands.get( 'identifiedHighlight:add' );

			buttonView.set( {
				label: t( options.label ),
				icon: options.withText ? undefined : commentIcon,
				tooltip: !options.withText,
				withText: options.withText
			} );

			buttonView.on( 'execute', () => {
				editor.execute( 'identifiedHighlight:add' );
				editor.editing.view.focus();
			} );

			buttonView.bind( 'isEnabled' ).to( command, 'isEnabled' );
			buttonView.bind( 'isOn' ).to( command, 'value', value => !!value );
			buttonView.isToggleable = true;

			return buttonView;
		} );
	}
}
