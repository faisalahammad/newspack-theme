'use strict';

/**
 * WordPress dependencies
 */
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { compose } from '@wordpress/compose';
import { withDispatch, withSelect, useSelect } from '@wordpress/data';
import { Button, Spinner } from '@wordpress/components';
import { Fragment, useCallback } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { META_FIELD_NAME } from './utils';

/**
 * Opens the WordPress media library and calls onSelect with the chosen image.
 *
 * @param {Function} onSelect Callback receiving the attachment ID.
 */
const openMediaLibrary = onSelect => {
	// eslint-disable-next-line no-undef
	const mediaFrame = wp.media( {
		title: __( 'Homepage Featured Image', 'newspack-theme' ),
		button: { text: __( 'Set homepage image', 'newspack-theme' ) },
		multiple: false,
		library: { type: 'image' },
	} );

	mediaFrame.on( 'select', () => {
		const attachment = mediaFrame.state().get( 'selection' ).first().toJSON();
		onSelect( attachment.id );
	} );

	mediaFrame.open();
};

const HomepageFeaturedImage = ( { homepageImageId, setImage, removeImage } ) => {
	const media = useSelect(
		select => {
			if ( ! homepageImageId ) {
				return null;
			}
			return select( 'core' ).getMedia( homepageImageId );
		},
		[ homepageImageId ]
	);

	const handleSelect = useCallback( () => {
		openMediaLibrary( setImage );
	}, [ setImage ] );

	return (
		<PluginDocumentSettingPanel
			name="newspack-homepage-featured-image"
			title={ __( 'Homepage Featured Image', 'newspack-theme' ) }
			className="newspack-homepage-featured-image"
		>
			<p>{ __( "Set an alternate image to display in the Homepage Posts block instead of the post's featured image.", 'newspack-theme' ) }</p>
			<div className="newspack-homepage-featured-image__container">
				{ homepageImageId ? (
					<Fragment>
						{ ! media ? (
							<Spinner />
						) : (
							<div className="newspack-homepage-featured-image__preview">
								<img
									src={ media.source_url }
									alt={ __( 'Homepage featured image', 'newspack-theme' ) }
									style={ { maxWidth: '100%', height: 'auto' } }
								/>
							</div>
						) }
						<div className="newspack-homepage-featured-image__actions" style={ { marginTop: '10px' } }>
							<Button variant="secondary" onClick={ handleSelect } style={ { marginRight: '8px' } }>
								{ __( 'Replace image', 'newspack-theme' ) }
							</Button>
							<Button variant="link" isDestructive onClick={ removeImage }>
								{ __( 'Remove image', 'newspack-theme' ) }
							</Button>
						</div>
					</Fragment>
				) : (
					<Button variant="secondary" onClick={ handleSelect }>
						{ __( 'Select homepage image', 'newspack-theme' ) }
					</Button>
				) }
			</div>
		</PluginDocumentSettingPanel>
	);
};

const composed = compose( [
	withSelect( select => ( {
		homepageImageId: select( 'core/editor' ).getEditedPostAttribute( 'meta' )[ META_FIELD_NAME ],
	} ) ),
	withDispatch( dispatch => ( {
		setImage: id => {
			dispatch( 'core/editor' ).editPost( {
				meta: { [ META_FIELD_NAME ]: id },
			} );
		},
		removeImage: () => {
			dispatch( 'core/editor' ).editPost( {
				meta: { [ META_FIELD_NAME ]: 0 },
			} );
		},
	} ) ),
] )( HomepageFeaturedImage );

registerPlugin( 'newspack-homepage-featured-image', {
	render: composed,
	icon: null,
} );
