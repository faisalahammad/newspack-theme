<?php
/**
 * Displays sticky floating share buttons alongside article content.
 *
 * Only renders when:
 * - The 'share_buttons_sticky' Customizer setting is enabled.
 * - Jetpack Sharing is active (sharing_display function exists).
 * - Viewing a single post, or a page with share buttons enabled.
 *
 * @package Newspack
 */

$sticky_share_enabled = get_theme_mod( 'share_buttons_sticky', false );

// Bail early if the setting is not enabled or Jetpack Sharing is not available.
if ( ! $sticky_share_enabled || ! function_exists( 'sharing_display' ) ) {
	return;
}

// On pages, only show if the page-level share buttons meta is enabled.
if ( is_page() && empty( get_post_meta( get_the_ID(), 'newspack_show_share_buttons', true ) ) ) {
	return;
}
?>

<aside class="sticky-share-buttons" aria-label="<?php esc_attr_e( 'Share this article', 'newspack-theme' ); ?>">
	<?php sharing_display( '', true ); ?>
</aside>
