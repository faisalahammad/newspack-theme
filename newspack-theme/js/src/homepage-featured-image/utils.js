/**
 * WordPress dependencies
 */
import { withSelect } from '@wordpress/data';

export const META_FIELD_NAME = 'newspack_homepage_featured_image';

export const connectWithSelect = withSelect( select => ( {
	homepageImageId: select( 'core/editor' ).getEditedPostAttribute( 'meta' )[ META_FIELD_NAME ],
} ) );
