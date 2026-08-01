# Testing instructions - full-width Group blocks in widget areas

Issue #1800: Widgets - Better handling of full-width widget spaces.

## What changed

- A Group block placed in the Above Header, Below Header, or Above Footer
  widget area now stretches full-width automatically. No manual `alignfull`
  class needed.
- The special case in the Joseph child theme (`overflow-x: clip` instead of
  `overflow: hidden`) lets the full-width content bleed to the viewport edge.

## Prerequisites

- WordPress 5.8+ with block-based widgets enabled.
- Built CSS: `npm run build:scss`.

## Test steps

1. Appearance > Widgets.
2. In the Above Header area, add a Group block (with a background color so the
   full-width effect is visible) and put any content in it.
3. Save and view the front end.
4. Confirm the Group block stretches the full width of the viewport section,
   with no gap on the left and right edges.
5. Repeat with the Below Header and Above Footer areas.
6. Add a second widget to the same area and confirm the Group block no longer
   stretches full-width (multi-widget areas keep normal content width).
7. Add a normal (non-Group) block and confirm it renders at standard content
   width, unchanged.
8. If testing the Joseph child theme, confirm the full-width Group block still
   bleeds to the viewport edge and that the sticky header still works.

## Expected

- Single Group block in a header/footer widget area fills the viewport width.
- All other widget layouts are unchanged.
