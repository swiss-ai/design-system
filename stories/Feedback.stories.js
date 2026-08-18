export default { title: 'Bootstrap Components/Feedback' };

export const Alerts = () => `
  <div class="alert alert-primary" role="alert">A primary alert — <a href="#" class="alert-link">with a link</a>.</div>
  <div class="alert alert-secondary" role="alert">A secondary alert for neutral notices.</div>
  <div class="alert alert-success" role="alert">A success alert — the run completed.</div>
  <div class="alert alert-danger" role="alert">A danger alert — something failed.</div>
  <div class="alert alert-warning" role="alert">A warning alert — check before proceeding.</div>
  <div class="alert alert-info" role="alert">An info alert — technical background information.</div>
`;

export const Badges = () => `
  <p>
    <span class="badge text-bg-primary">Primary</span>
    <span class="badge text-bg-secondary">Secondary</span>
    <span class="badge text-bg-success">Success</span>
    <span class="badge text-bg-danger">Danger</span>
    <span class="badge text-bg-warning">Warning</span>
    <span class="badge text-bg-info">Info</span>
  </p>
  <h4>Heading badge <span class="badge text-bg-info rounded-pill">v1.5</span></h4>
`;

export const ProgressAndSpinners = () => `
  <div class="progress mb-3" role="progressbar" aria-label="Demo progress" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar" style="width: 65%">65%</div>
  </div>
  <div class="progress mb-4" role="progressbar" aria-label="Striped demo progress" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 40%"></div>
  </div>
  <div class="d-flex gap-3 align-items-center">
    <div class="spinner-border text-info" role="status"><span class="visually-hidden">Loading…</span></div>
    <div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading…</span></div>
    <div class="spinner-grow text-secondary" role="status"><span class="visually-hidden">Loading…</span></div>
  </div>
`;

export const Toast = () => `
  <div class="toast show" role="status" aria-live="polite" aria-atomic="true">
    <div class="toast-header">
      <strong class="me-auto">Apertus</strong>
      <small>now</small>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">Checkpoint conversion finished.</div>
  </div>
`;
