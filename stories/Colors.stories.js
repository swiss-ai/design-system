export default { title: 'Foundations/Colors' };

const swatch = (token, label) => `
  <div style="display:flex; align-items:center; gap:1rem; margin-bottom:0.75rem;">
    <div style="width:64px; height:40px; border-radius:var(--radius-sm); border:1px solid var(--border-subtle); background:var(${token});"></div>
    <div>
      <div style="font-weight:600;">${label}</div>
      <code>${token}</code>
    </div>
  </div>`;

export const CoreColors = () => `
  ${swatch('--apertus-sky-blue-15', 'Sky Blue 1.5')}
  ${swatch('--apertus-sky-blue-15-1', 'Sky Blue 1.5.1')}
  ${swatch('--apertus-sky-blue-15-2', 'Sky Blue 1.5.2')}
  ${swatch('--apertus-anthracite', 'Anthracite')}
  ${swatch('--epfl-red', 'EPFL Red')}
`;

export const DerivedColors = () => `
  ${swatch('--pale-technical-panel', 'Pale Technical Panel')}
  ${swatch('--pale-blue-wash', 'Pale Blue Wash')}
  ${swatch('--border-blue', 'Border Blue')}
  ${swatch('--border-subtle', 'Border Subtle')}
  ${swatch('--disabled-surface', 'Disabled Surface')}
`;

export const FunctionalColors = () => `
  <p class="text-muted">Added by <code>apertus-bootstrap.css</code> for Bootstrap's success/warning/danger semantics.</p>
  ${swatch('--apertus-success', 'Success')}
  ${swatch('--apertus-warning', 'Warning (surface — pair with dark text)')}
  ${swatch('--apertus-warning-emphasis', 'Warning (text on light)')}
  ${swatch('--apertus-danger', 'Danger (deeper than the action red)')}
`;
