<?php
/**
 * Template to display the mobile navigation, either AMP or fallback.
 *
 * @package Newspack
 */

$subpage_toggle_side = get_theme_mod( 'subpage_toggle_side', 'left' );

if ( newspack_is_amp() ) : ?>
	<amp-sidebar id="subpage-sidebar" layout="nodisplay" side="<?php echo esc_attr( $subpage_toggle_side ); ?>" class="subpage-sidebar">
		<button class="subpage-toggle" on='tap:subpage-sidebar.toggle'>
			<?php echo wp_kses( newspack_get_icon_svg( 'close', 20 ), newspack_sanitize_svgs() ); ?>
			<?php esc_html_e( 'Close', 'newspack-theme' ); ?>
		</button>
<?php else : ?>
	<aside id="subpage-sidebar-fallback" class="subpage-sidebar dir-<?php echo esc_attr( $subpage_toggle_side ); ?>">
		<button class="subpage-toggle">
			<?php echo wp_kses( newspack_get_icon_svg( 'close', 20 ), newspack_sanitize_svgs() ); ?>
			<?php esc_html_e( 'Close', 'newspack-theme' ); ?>
		</button>
<?php endif; ?>

		<?php
		newspack_tertiary_menu();

		newspack_primary_menu();

		newspack_secondary_menu();

		newspack_social_menu_header();

		if ( is_active_sidebar( 'header-1' ) ) {
			dynamic_sidebar( 'header-1' );
		}
		?>

<?php if ( newspack_is_amp() ) : ?>
	</amp-sidebar>
<?php else : ?>
	</aside>
<?php endif; ?>
