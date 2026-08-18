export default { title: 'Apertus Components/Buttons' };

export const Variants = () => `
  <div class="d-flex flex-wrap gap-2">
    <button class="btn btn-button btn-primary">Primary Action</button>
    <button class="btn btn-button btn-secondary">Technical Action</button>
    <button class="btn btn-button btn-tertiary">Supporting Action</button>
    <button class="btn btn-button btn-sky-blue">Technical CTA</button>
  </div>
`;

export const Disabled = () => `
  <div class="d-flex flex-wrap gap-2">
    <button class="btn btn-button btn-primary" disabled>Primary</button>
    <button class="btn btn-button btn-secondary" disabled>Secondary</button>
    <button class="btn btn-button btn-tertiary" disabled>Tertiary</button>
    <button class="btn btn-button btn-sky-blue" disabled>Sky Blue</button>
  </div>
`;
