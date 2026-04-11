# Design System Document: Editorial Data Artistry

## 1. Overview & Creative North Star
**Creative North Star: The Scholarly Ethereal**

This design system moves away from the sterile, "dashboard-centric" nature of data science and toward a high-end editorial journal. It is designed to feel like a digital breath of fresh air—scholarly and rigorous in content, yet atmospheric and tranquil in presentation.

To break the "template" look, we employ **Intentional Asymmetry**. Projects are not forced into a rigid 3-column grid; instead, they utilize staggered vertical spacing and varying container widths to mimic the layout of a premium print magazine. We favor wide-open margins, overlapping "cloud" layers, and a typographic scale that values dramatic contrast between technical precision and poetic display.

---

### 2. Colors & Surface Philosophy
The palette is rooted in a "Sky-State" logic, transitioning from deep twilight blues to soft dawn pinks.

*   **Primary (`#3c5f99`) & Secondary (`#993d75`):** Use these for "Momentum Elements"—interactive states, key mathematical symbols, and focused call-to-actions.
*   **The "No-Line" Rule:** Under no circumstances should 1px solid borders be used to divide sections. Structure is defined by **Background Shifts**. A `surface-container-low` section should sit directly against a `surface` background. The transition is the boundary.
*   **Surface Hierarchy & Nesting:** Treat the UI as layers of vellum paper. 
    *   **Level 0 (Base):** `surface` (#f8f9fc)
    *   **Level 1 (Sections):** `surface-container-low` (#f2f4f7)
    *   **Level 2 (Cards):** `surface-container-lowest` (#ffffff)
*   **The "Glass & Gradient" Rule:** Floating navigation and math-heavy callouts should use **Glassmorphism**. Apply `surface_variant` at 40% opacity with a `24px` backdrop-blur. 
*   **Signature Textures:** For Hero backgrounds, use a linear gradient: `primary_container` (#a1c2ff) to `secondary_container` (#ffd8e9) at a 135-degree angle to simulate a soft sky.

---

### 3. Typography
We use a dual-font strategy to balance "The Dream" (Atmosphere) with "The Data" (Logic).

*   **Display & Headlines (`newsreader`):** An elegant serif that feels academic and timeless. Use `display-lg` for project titles to create a high-fashion editorial impact.
*   **Body & Titles (`manrope`):** A modern, technical sans-serif with high legibility. Use this for all data analysis, code snippets, and labels.
*   **The Hierarchy Intent:**
    *   **Scholarly Authority:** `headline-md` in `on_surface` for section headers.
    *   **Technical Detail:** `body-sm` in `on_surface_variant` for metadata (e.g., "Python • 2024 • PCA Analysis").
    *   **Math Content:** LaTeX formulas should be set in `headline-sm` but given extra `leading` (line-height) to let the variables breathe.

---

### 4. Elevation & Depth
Depth is atmospheric, not mechanical.

*   **The Layering Principle:** Avoid shadows for static content. Use the `surface-container` tiers. A `surface-container-highest` element should only be used for the most critical interactive focus.
*   **Ambient Shadows:** For "Journal Entry" cards that need to feel like they are floating on a cloud, use: `box-shadow: 0 12px 40px rgba(46, 51, 55, 0.06);`. The shadow color is a tinted version of `on_surface`, never pure black.
*   **The "Ghost Border" Fallback:** For accessibility in form fields, use a "Ghost Border": `outline_variant` at 15% opacity. It should feel like a suggestion of a line, not a hard stop.

---

### 5. Components

*   **Journal Cards:** No borders. Use `surface-container-lowest` with a `xl` (1.5rem) corner radius. Internal padding should be generous (`8` on the spacing scale).
*   **Buttons:**
    *   *Primary:* A gradient from `primary` to `primary_dim`. Roundedness `full`.
    *   *Tertiary:* `on_surface_variant` text with no background. On hover, a subtle `surface-container-high` pill appears behind it.
*   **Data Visualizations:** 
    *   Charts should never use a black axis. Use `outline_variant`. 
    *   Data series colors should cycle through `primary`, `secondary`, and `tertiary`.
*   **Chips:** Use `secondary_container` for categories. Text should be `on_secondary_container`. Use `md` (0.75rem) corner radius.
*   **Input Fields:** Ghost borders only. The background should be `surface_container_low`. On focus, the background shifts to `surface_container_lowest` with a soft `primary` glow.
*   **Atmospheric Dividers:** Instead of lines, use a `20` (7rem) vertical gap or a subtle `primary_fixed_dim` 100px-wide horizontal rule centered on the page.

---

### 6. Do's and Don'ts

**Do:**
*   **Do** use asymmetrical margins. If a paragraph is 60ch wide, offset it to the right to leave "white space for thought."
*   **Do** use `newsreader` for large numbers in data highlights (e.g., "98% Accuracy").
*   **Do** ensure all "Cloud" elements have a `backdrop-filter: blur(10px)` to maintain professional depth.

**Don't:**
*   **Don't** use 1px solid `#cccccc` borders. It breaks the "Dreamy" immersion.
*   **Don't** use high-contrast drop shadows. They feel "techy" and heavy rather than "atmospheric."
*   **Don't** cram content. If a section feels full, add another `10` (3.5rem) of spacing.
*   **Don't** use pure black text. Use `on_surface` (#2e3337) to maintain the soft, scholarly ink-on-paper feel.

---

### 7. Director's Final Note
The "Data Journal" is not a tool; it is a narrative. Every data point is a story. Use the spacing scale to create a rhythm—fast for technical details, slow and expansive for conclusions. Let the gradients be the emotion, and the typography be the intellect.