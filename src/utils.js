export function isIdentifiedHighlightElement( node ) {
	return node.is( 'attributeElement' ) && !!node.getCustomProperty( 'identifiedHighlight' );
}

export function createIdentifiedHighlightElement( id, writer ) {
	const identifiedHighlightElement = writer.createAttributeElement( 'mark', {
		class: 'mark',
		id
	}, { id: `highlightId:${ id }`, priority: 5 } );
	writer.setCustomProperty( 'identifiedHighlight', id, identifiedHighlightElement );

	return identifiedHighlightElement;
}
