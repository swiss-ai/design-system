/* SPDX-License-Identifier: Apache-2.0 */
/* Progressive enhancement for the Swiss-ai.org style guide.
 * The page is fully usable without JavaScript:
 *   - copy-token affordances are buttons; clicking copies the token name
 *   - the MD3 ripple is decorative feedback, disabled under reduced motion
 * No layout behavior depends on JavaScript, and no inline handlers exist. */

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ----------------------------------------------------------------------
     Reduced-motion sync — keeps a class available for style hooks
     ---------------------------------------------------------------------- */
  function syncReducedMotion() {
    document.documentElement.classList.toggle(
      "reduced-motion",
      prefersReducedMotion.matches
    );
  }

  /* ----------------------------------------------------------------------
     Copy-token buttons
     Each button carries data-copy-token="--token-name". Feedback is polite.
     ---------------------------------------------------------------------- */
  var feedbackRegion = null;

  function ensureFeedbackRegion() {
    if (!feedbackRegion) {
      feedbackRegion = document.createElement("p");
      feedbackRegion.id = "copy-feedback";
      feedbackRegion.className = "visually-hidden";
      feedbackRegion.setAttribute("aria-live", "polite");
      document.body.appendChild(feedbackRegion);
    }
    return feedbackRegion;
  }

  function announce(message) {
    var region = ensureFeedbackRegion();
    region.textContent = message;
  }

  function writeClipboard(text) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      return navigator.clipboard.writeText(text);
    }

    var area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "readonly");
    area.className = "visually-hidden";
    document.body.appendChild(area);
    area.select();

    var succeeded = false;
    try {
      succeeded = document.execCommand("copy");
    } catch (error) {
      succeeded = false;
    }

    document.body.removeChild(area);

    if (succeeded) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Clipboard unavailable"));
  }

  function initCopyTokens() {
    var buttons = document.querySelectorAll("[data-copy-token]");

    buttons.forEach(function (button) {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        var token = button.getAttribute("data-copy-token") || button.textContent.trim();

        writeClipboard(token).then(
          function () {
            announce("Copied " + token + " to clipboard.");
          },
          function () {
            announce("Copy failed. Token name: " + token + ".");
          }
        );
      });
    });
  }

  /* ----------------------------------------------------------------------
     MD3 ripple — restrained interaction feedback
     Skipped entirely when the user prefers reduced motion.
     ---------------------------------------------------------------------- */
  function createRipple(element, event) {
    if (prefersReducedMotion.matches) {
      return;
    }

    var rect = element.getBoundingClientRect();
    var size = Math.max(rect.width, rect.height) * 2;
    var x = event.clientX - rect.left - rect.width;
    var y = event.clientY - rect.top - rect.height;

    var ripple = document.createElement("span");
    ripple.className = "md3-ripple";
    ripple.setAttribute("aria-hidden", "true");
    ripple.style.width = size + "px";
    ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";

    element.appendChild(ripple);
    window.setTimeout(function () {
      if (ripple.parentNode === element) {
        element.removeChild(ripple);
      }
    }, prefersReducedMotion.matches ? 0 : 400);
  }

  function initRipples() {
    var targets = document.querySelectorAll(".button, .resource-tile .hexagon");

    targets.forEach(function (element) {
      element.addEventListener("pointerdown", function (event) {
        // Only the primary button of a pointer triggers a ripple.
        if (event.button === 0) {
          createRipple(element, event);
        }
      });
    });
  }

  /* ----------------------------------------------------------------------
     Bootstrap
     ---------------------------------------------------------------------- */
  function init() {
    syncReducedMotion();
    initCopyTokens();
    initRipples();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  prefersReducedMotion.addEventListener("change", syncReducedMotion);
})();
