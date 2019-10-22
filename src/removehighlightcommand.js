import Command from '@ckeditor/ckeditor5-core/src/command';

export default class RemoveHighlightCommand extends Command {
	refresh() {
		this.isEnabled = true;
	}

	execute({ highlightId }) {
		const editor = this.editor;
		const model = editor.model;
		const root = model.document.getRoot();

		const walker = new TreeWalker({ startPosition: position });
		console.log(walker);

		model.change(writer => {
			const firstPosition = writer.createPositionAt(root, [0]);

			const highlightStart = firstPosition.getLastMatchingPosition(value => value.item.getAttribute("identifiedHighlight") !== highlightId);
			const highlightEnd = highlightEnd.getLastMatchingPosition(value => value.item.getAttribute("identifiedHighlight") === highlightId);

			const highlightRange = writer.createRange(highlightStart, highlightEnd);
			const highlightSelection = writer.createSelection(highlightRange);

			if (!highlightSelection.isCollapsed) {
				highlightSelection.removeAttribute(highlightId)
			}
		})
	}
}
