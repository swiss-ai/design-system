export default { title: 'Bootstrap Components/Buttons' };

export const Solid = () => `
  <div class="d-flex flex-wrap gap-2">
    <button type="button" class="btn btn-primary">Primary</button>
    <button type="button" class="btn btn-secondary">Secondary</button>
    <button type="button" class="btn btn-success">Success</button>
    <button type="button" class="btn btn-danger">Danger</button>
    <button type="button" class="btn btn-warning">Warning</button>
    <button type="button" class="btn btn-info">Info</button>
    <button type="button" class="btn btn-light">Light</button>
    <button type="button" class="btn btn-dark">Dark</button>
    <button type="button" class="btn btn-link">Link</button>
  </div>
`;

export const Outline = () => `
  <div class="d-flex flex-wrap gap-2">
    <button type="button" class="btn btn-outline-primary">Primary</button>
    <button type="button" class="btn btn-outline-secondary">Secondary</button>
    <button type="button" class="btn btn-outline-success">Success</button>
    <button type="button" class="btn btn-outline-danger">Danger</button>
    <button type="button" class="btn btn-outline-warning">Warning</button>
    <button type="button" class="btn btn-outline-info">Info</button>
    <button type="button" class="btn btn-outline-dark">Dark</button>
  </div>
`;

export const SizesAndGroups = () => `
  <div class="d-flex flex-wrap align-items-center gap-2 mb-4">
    <button type="button" class="btn btn-primary btn-lg">Large</button>
    <button type="button" class="btn btn-primary">Default</button>
    <button type="button" class="btn btn-primary btn-sm">Small</button>
  </div>
  <div class="btn-group" role="group" aria-label="Demo button group">
    <button type="button" class="btn btn-outline-secondary active">Left</button>
    <button type="button" class="btn btn-outline-secondary">Middle</button>
    <button type="button" class="btn btn-outline-secondary">Right</button>
  </div>
`;
