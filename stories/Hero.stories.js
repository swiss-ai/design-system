export default {
  title: 'Apertus Components/Hero',
  parameters: { layout: 'fullscreen' },
};

export const HeroSection = () => `
  <section class="hero-section">
    <div class="triangle-overlay triangle-tl"></div>
    <div class="triangle-overlay triangle-br"></div>
    <div class="container hero-content text-center">
      <p class="section-subtitle">Apertus</p>
      <h1>Open, sovereign Swiss AI</h1>
      <p class="section-description mx-auto">Fully open foundation model for sovereign AI — training data, code, weights, methods, and alignment principles are documented and reproducible.</p>
      <div class="d-flex gap-3 justify-content-center">
        <button class="btn btn-button btn-primary">Primary CTA</button>
        <button class="btn btn-button btn-tertiary">Secondary Action</button>
      </div>
    </div>
  </section>
`;
