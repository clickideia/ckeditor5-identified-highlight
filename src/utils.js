export function isIdentifiedHighlightElement( node ) {
	return node.is( 'attributeElement' ) && !!node.getCustomProperty( 'identifiedHighlight' );
}

export function createIdentifiedHighlightElement( id, writer ) {
	const identifiedHighlightElement = writer.createAttributeElement( 'mark', {
		classes: 'mark',
		id
	}, { priority: 5 } );
	writer.setCustomProperty( 'identifiedHighlight', id, identifiedHighlightElement );

	return identifiedHighlightElement;
}
