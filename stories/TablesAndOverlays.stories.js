export default { title: 'Bootstrap Components/Tables & Overlays' };

export const Table = () => `
  <table class="table table-striped table-hover">
    <thead>
      <tr><th scope="col">Model</th><th scope="col">Params</th><th scope="col">Status</th></tr>
    </thead>
    <tbody>
      <tr><td>Apertus 1</td><td><code>8B / 70B</code></td><td><span class="badge text-bg-success">Released</span></td></tr>
      <tr><td>Apertus 1.5</td><td><code>8B / 70B</code></td><td><span class="badge text-bg-info">Training</span></td></tr>
      <tr><td>Apertus 2</td><td><code>MoE</code></td><td><span class="badge text-bg-secondary">Planned</span></td></tr>
    </tbody>
  </table>
`;

export const Modal = () => `
  <div class="modal position-static d-block" tabindex="-1" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modal title</h5>
          <button type="button" class="btn-close" aria-label="Close"></button>
        </div>
        <div class="modal-body">Blue-tinted header divider, token radius, anthracite backdrop.</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light">Close</button>
          <button type="button" class="btn btn-primary">Confirm</button>
        </div>
      </div>
    </div>
  </div>
`;

export const Card = () => `
  <div class="card" style="max-width: 24rem;">
    <div class="card-header">Bootstrap card header</div>
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">Subtle border, token radius, pale-blue-wash header cap.</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
`;
