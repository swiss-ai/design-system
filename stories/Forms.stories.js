export default { title: 'Bootstrap Components/Forms' };

export const TextInputs = () => `
  <div style="max-width: 480px;">
    <div class="mb-3">
      <label for="sb-email" class="form-label">Email address</label>
      <input type="email" class="form-control" id="sb-email" placeholder="name@example.ch">
      <div class="form-text">Focus me — sky-blue ring, subtle border.</div>
    </div>
    <div class="mb-3">
      <label for="sb-select" class="form-label">Cluster</label>
      <select class="form-select" id="sb-select">
        <option selected>Clariden</option>
        <option>Bristen</option>
      </select>
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text">https://</span>
      <input type="text" class="form-control" placeholder="apertus.ai">
    </div>
    <input type="text" class="form-control" value="Disabled" disabled>
  </div>
`;

export const ChecksAndRange = () => `
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="sb-check1" checked>
    <label class="form-check-label" for="sb-check1">Checked checkbox (EPFL red)</label>
  </div>
  <div class="form-check mb-3">
    <input class="form-check-input" type="checkbox" id="sb-check2">
    <label class="form-check-label" for="sb-check2">Unchecked checkbox</label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="radio" name="sb-radio" id="sb-radio1" checked>
    <label class="form-check-label" for="sb-radio1">Selected radio</label>
  </div>
  <div class="form-check mb-3">
    <input class="form-check-input" type="radio" name="sb-radio" id="sb-radio2">
    <label class="form-check-label" for="sb-radio2">Other option</label>
  </div>
  <div class="form-check form-switch mb-3">
    <input class="form-check-input" type="checkbox" role="switch" id="sb-switch" checked>
    <label class="form-check-label" for="sb-switch">Switch</label>
  </div>
  <label for="sb-range" class="form-label">Range</label>
  <input type="range" class="form-range" id="sb-range" style="max-width: 320px;">
`;

export const Validation = () => `
  <div style="max-width: 480px;">
    <div class="mb-3">
      <input type="text" class="form-control is-valid" value="Valid input">
      <div class="valid-feedback d-block">Looks good.</div>
    </div>
    <div>
      <input type="text" class="form-control is-invalid" value="Invalid input">
      <div class="invalid-feedback d-block">Please correct this field.</div>
    </div>
  </div>
`;
