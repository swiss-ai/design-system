export default { title: 'Foundations/Typography' };

export const Headings = () => `
  <h1>H1 — Open, sovereign Swiss AI</h1>
  <h2>H2 — Technical but readable</h2>
  <h3>H3 — Institutional without being cold</h3>
  <h4>H4 — Geometric, not decorative</h4>
  <p>Body — Inter, anthracite on white, fluid <code>clamp()</code> sizing. Links are <a href="#">EPFL red with underline</a>.</p>
`;

export const CodeAndQuotes = () => `
  <p>Inline <code>code</code> and <kbd>Ctrl</kbd> + <kbd>C</kbd> use Geist Mono; <mark>marked text</mark> uses the sky-blue wash.</p>
  <pre><code>srun --partition=normal \\
     --nodes=4 train.py</code></pre>
  <blockquote class="blockquote">
    <p>Open by default. Technical but readable. Geometric, not decorative.</p>
    <footer class="blockquote-footer mt-2">Apertus design principles</footer>
  </blockquote>
`;
