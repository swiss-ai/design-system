export default { title: 'Apertus Components/Cards & Tiles' };

export const CardDisplay = () => `
  <div class="row">
    <div class="col-md-6">
      <div class="card-display">
        <div class="mb-2" style="color: var(--epfl-red); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em;">2.9.2025</div>
        <h4 class="mb-3" style="font-size: 1.25rem; font-weight: 700;">Sample Article Title</h4>
        <p class="text-muted mb-3" style="font-size: 0.9375rem;">Sample article excerpt with a concise summary of the news content.</p>
        <a href="#" style="font-size: 0.875rem;">Read more →</a>
      </div>
    </div>
    <div class="col-md-6">
      <div class="feature-card">
        <h4>Open</h4>
        <p>Training data, code, weights, methods, and alignment principles are documented and reproducible.</p>
      </div>
    </div>
  </div>
`;

export const HexagonTiles = () => `
  <div class="hexagon-row">
    <a class="hexagon-tile" href="#" style="text-decoration:none;">Models</a>
    <a class="hexagon-tile hexagon-tile-secondary" href="#" style="text-decoration:none;">Data</a>
    <a class="hexagon-tile hexagon-tile-tertiary" href="#" style="text-decoration:none;">Papers</a>
  </div>
`;

export const FeaturesStrip = () => `
  <section class="features-strip" style="margin:-1rem;">
    <div class="container">
      <div class="row g-4">
        <div class="col-md-4"><div class="feature-card"><h4>Open</h4><p>Fully documented and reproducible.</p></div></div>
        <div class="col-md-4"><div class="feature-card"><h4>Sovereign</h4><p>Built on Swiss public infrastructure.</p></div></div>
        <div class="col-md-4"><div class="feature-card"><h4>Compliant</h4><p>Transparent data governance.</p></div></div>
      </div>
    </div>
  </section>
`;
FeaturesStrip.parameters = { layout: 'fullscreen' };
