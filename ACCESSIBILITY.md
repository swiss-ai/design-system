# Accessibility Guidelines

## Overview

The Apertus Web Style Guide follows WCAG 2.2 AA standards to ensure digital accessibility for all users, including those with disabilities.

## Key Accessibility Features

### Semantic HTML
- Use semantic HTML elements (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`)
- Ensure one `<h1>` per page
- Proper heading hierarchy (`h1` → `h2` → `h3` → etc.)

### Skip Navigation
- A skip link is positioned as the first focusable element on each page
- Allows keyboard users to bypass navigation and go directly to main content
- Visible focus state when focused

### Color Contrast
- All text meets WCAG AA contrast ratios:
  - **Anthracite on White**: 19.2:1 ✓
  - **White on Sky Blue**: 4.5:1 ✓
  - **White on EPFL Red**: 7.6:1 ✓
  - **EPFL Red on White**: 7.6:1 ✓

### Focus Management
- Visible focus indicators using EPFL Red (#FF0000)
- Focus ring: 2px solid with 2px offset
- Focus is visible with `:focus-visible` pseudo-class

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Tab order follows logical reading order
- Enter and Space keys activate buttons and links
- Escape key closes modals and menus

### Screen Reader Support
- ARIA attributes used only when necessary
- Decorative SVGs marked with `aria-hidden="true"`
- Text alternatives for meaningful non-text content

## Reduced Motion

The style guide respects the `prefers-reduced-motion` media query:

```css
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
    }
}
```

## Testing Accessibility

### Manual Testing
1. **Keyboard Navigation**: Tab through all interactive elements
2. **Screen Reader**: Test with screen reader software
3. **Color Contrast**: Use contrast checker tools
4. **Focus Indicators**: Ensure focus is always visible

### Automated Testing
Use the following commands in the style guide repository:

```bash
npm run check:a11y
```

This runs axe accessibility tests against the style guide and example homepage.

## Component Accessibility

### Buttons
- Minimum 44px × 44px touch target
- Visible focus states
- Semantic `<button>` elements for actions
- Semantic `<a>` elements for link-style buttons

### Navigation
- Semantic `<nav>` element
- Proper heading structure
- Clear focus indicators

### Cards and Content
- Alt text for all meaningful images
- Proper heading hierarchy within cards
- Descriptive link text

## Compliance Checklist

- [ ] Semantic HTML structure
- [ ] One `<h1>` per page
- [ ] Skip link functionality
- [ ] Keyboard accessibility
- [ ] Focus indicators
- [ ] Color contrast compliance
- [ ] Screen reader support
- [ ] Reduced motion support
- [ ] No hover-only content
- [ ] Proper ARIA usage

## Resources

- [WCAG 2.2 Guidelines](https://www.w3.org/TR/WCAG22/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Web Content Accessibility Guidelines](https://www.w3.org/WAI/WCAG/)

## Contact

For accessibility issues or accommodations, please contact the Apertus accessibility team.
