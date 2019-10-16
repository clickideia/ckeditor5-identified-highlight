import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

import IdentifiedHighlightEditing from "./identifiedhighlightediting";
import IdentifiedHighlightUI from "./identifiedhighlightui";

export default class IdentifiedHighlight extends Plugin {
	static get requires() {
		return [IdentifiedHighlightEditing, IdentifiedHighlightUI];
	}
}
