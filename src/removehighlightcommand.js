import Command from '@ckeditor/ckeditor5-core/src/command';

export default class RemoveHighlightCommand extends Command {
	refresh() {
		const editor = this.editor;
		const selection = editor.model.document.selection;

		this.value = selection.getAttribute('identifiedHighlight');
		this.isEnabled = !!this.value;
	}

	execute({ highlightId }) {
		const editor = this.editor;
		const root =
	}
}
