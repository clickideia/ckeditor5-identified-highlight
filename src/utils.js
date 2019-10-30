export function isIdentifiedHighlightElement( node ) {
	return node.is( 'attributeElement' ) && !!node.getCustomProperty( 'identifiedHighlight' );
}

export function createIdentifiedHighlightElement( id, writer ) {
	const identifiedHighlightElement = writer.createAttributeElement( 'mark', {
		class: 'marker',
		'data-highlight-id': id
	}, { id: `highlightId:${ id }`, priority: 5 } );
	writer.setCustomProperty( 'identifiedHighlight', id, identifiedHighlightElement );

	return identifiedHighlightElement;
}

export function compareArrays( array1, array2 ) {
	if ( array1.length !== array2.length ) {
		return false;
	}
	for ( const el of array1 ) {
		if ( !array2.includes( el ) ) {
			return false;
		}
	}
	for ( const el of array2 ) {
		if ( !array1.includes( el ) ) {
			return false;
		}
	}
	return true;
}
