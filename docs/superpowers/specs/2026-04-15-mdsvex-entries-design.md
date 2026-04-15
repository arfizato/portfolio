# mdsvex Entry System for Portfolio Entries

## Goal

Convert static Svelte pages (`/routes/journal/+page.svelte`, `/routes/technical/+page.svelte`) into mdsvex-powered markdown entries under `/entries/`. Start with `/entries/technical`. Extract reusable components (code blocks, math blocks, diagrams, stat cards) so they can be imported directly in `.md` files.

## File Structure

```
src/
├── lib/
│   ├── layouts/
│   │   └── technical.svelte              # mdsvex named layout for technical entries
│   └── components/entries/
│       ├── MathBlock.svelte              # equation display with labeled tags
│       ├── CodeEditor.svelte             # dark themed editor with filename bar + traffic lights
│       ├── PipelineDiagram.svelte        # icon flow: Source → Kafka → Spark
│       ├── StatCard.svelte               # large number highlight (e.g. "99.4%")
│       ├── LatencyCard.svelte            # progress bars with metric labels
│       ├── FeaturePoint.svelte           # colored bar + title + description
│       ├── SectionHeader.svelte          # "Section 02 // Architecture" with optional button
│       ├── ContentCard.svelte            # rounded white card wrapper
│       └── BentoGrid.svelte             # CSS grid layout container
├── routes/entries/
│   └── technical/
│       └── +page.md                      # the markdown entry
```

## mdsvex Configuration

Add named layout to `svelte.config.js`:

```js
preprocess: [mdsvex({
  extensions: ['.svx', '.md'],
  layout: {
    technical: './src/lib/layouts/technical.svelte'
  }
})]
```

## Technical Layout

**File:** `src/lib/layouts/technical.svelte`

**Responsibilities:**
- Renders the hero section from frontmatter props (title, subtitle, label, authors, date, readTime)
- Renders the Footer component (variant from frontmatter)
- Provides the outer `<main class="pt-40 pb-20">` wrapper
- Provides a `<slot>` for the markdown body content

**Frontmatter props received:**

| Prop | Type | Description |
|------|------|-------------|
| `title` | string | Main heading (e.g. "The Geometry of Latent Spaces") |
| `subtitle` | string | Paragraph below the title |
| `label` | string | Category badge (e.g. "Technical Deep Dive // ARCH-012") |
| `authors` | `{name: string}[]` | Author list with avatar placeholders |
| `date` | string | Publication date |
| `readTime` | string | Read time estimate |
| `footer` | `'simple' \| 'expanded'` | Footer variant |

**Custom element exports** (via `<script context="module">`):

| Export | Replaces | Styling |
|--------|----------|---------|
| `h2` | `<h2>` | `font-headline text-5xl leading-tight italic` |
| `h3` | `<h3>` | `text-2xl font-bold italic` |
| `p` | `<p>` | `text-lg leading-relaxed text-on-surface-variant` |
| `a` | `<a>` | Primary color, uppercase tracking, arrow icon on hover |
| `blockquote` | `<blockquote>` | Left border, serif italic |

## Components

### MathBlock

Displays a mathematical equation in a styled card with labeled tags.

```svelte
<MathBlock
  equation="L(θ) = E_{z~q}[log p(x|z)] - β · D_{KL}(q(z|x) || p(z)) + λ ||∇_z f(z)||²"
  tags={[
    { label: "KL Divergence", color: "secondary" },
    { label: "Jacobian Norm", color: "primary" }
  ]}
  label="Equation 4.2b"
/>
```

**Props:** `equation: string`, `tags: {label: string, color: 'primary' | 'secondary'}[]`, `label: string`

Visual: Rounded card, `bg-surface-container-low`, centered equation in `font-headline text-3xl italic`, tag pills at bottom with divider line, right-aligned label.

### CodeEditor

Dark-themed code display mimicking an editor window.

```svelte
<CodeEditor filename="module_alpha.py" notes="Convergence is typically achieved within 200 epochs...">
  <!-- highlighted code via slot -->
</CodeEditor>
```

**Props:** `filename: string`, `notes?: string`
**Slot:** Code content (pre-formatted)

Visual: `bg-[#0c1117]`, traffic light dots (red/amber/green at 30% opacity), filename bar, monospace content, optional notes box at bottom.

### PipelineDiagram

A horizontal flow of icon nodes connected by lines.

```svelte
<PipelineDiagram steps={[
  { icon: "database", label: "Source Data", color: "primary" },
  { icon: "sync_alt", label: "Kafka Broker", color: "secondary" },
  { icon: "architecture", label: "Spark Worker", color: "tertiary" }
]} />
```

**Props:** `steps: {icon: string, label: string, color: 'primary' | 'secondary' | 'tertiary'}[]`

Visual: Horizontal layout, each step is a white circle with icon + label below, connected by subtle dashed lines. Wrapped in a dashed border container.

### StatCard

Large number highlight card with colored background.

```svelte
<StatCard icon="bolt" value="99.4%" label="Operational Reliability Score" sublabel="Live Benchmarks" />
```

**Props:** `icon: string`, `value: string`, `label: string`, `sublabel?: string`

Visual: `bg-primary text-on-primary`, fixed height ~240px, icon top-left, sublabel top-right, large value bottom-left.

### LatencyCard

Progress bars with metric labels.

```svelte
<LatencyCard
  title="Inference Latency"
  description="Sub-15ms latency benchmarks..."
  bars={[{ pct: 80, color: "primary" }]}
  labels={["P50: 8ms", "P99: 14.2ms"]}
/>
```

**Props:** `title: string`, `description: string`, `bars: {pct: number, color: string}[]`, `labels: string[]`

Visual: `bg-surface-container-high`, rounded card, stacked progress bars, label row at bottom.

### FeaturePoint

Colored accent bar with title and description, used in vertical lists.

```svelte
<FeaturePoint color="primary" title="Linear Complexity" description="Achieves O(N) scaling..." />
```

**Props:** `color: 'primary' | 'secondary'`, `title: string`, `description: string`

Visual: Thin vertical color bar (h-12 w-1) left of text block, title in `font-headline text-xl font-bold italic`, description in small muted text.

### SectionHeader

Section label with title and optional action button.

```svelte
<SectionHeader
  number="02"
  section="Architecture"
  title="Pipeline Orchestration"
  buttonLabel="Explore Architecture Repo"
  buttonIcon="terminal"
  buttonHref="#"
/>
```

**Props:** `number: string`, `section: string`, `title: string`, `buttonLabel?: string`, `buttonIcon?: string`, `buttonHref?: string`

Visual: Flex row, left side has small label ("Section 02 // Architecture") + large `font-headline text-5xl` title. Right side has optional dark pill button. Bottom border divider.

### ContentCard

Generic wrapper for major content sections.

```svelte
<ContentCard>
  <!-- two-column content, math blocks, etc. -->
</ContentCard>
```

**Props:** none (slot only)

Visual: `rounded-[2.5rem] border border-outline-variant/10 bg-white p-12 md:p-24 shadow-sm`. Provides the large white rounded card seen in the technical page.

### BentoGrid

CSS grid container for stat cards, diagrams, and detail cards.

```svelte
<BentoGrid>
  <!-- child components position themselves via col-span classes -->
</BentoGrid>
```

**Props:** none (slot only)

Visual: `grid grid-cols-1 md:grid-cols-12 gap-8`, children use col-span to size themselves.

## Route Updates

Update `src/routes/+layout.svelte` `routeToPage` mapping so `/entries/*` paths resolve to `'entries'` for nav highlighting. Change from exact matching to prefix matching for the entries section.

## Markdown File Structure

The `/entries/technical/+page.md` file:

```md
---
layout: technical
title: "The Geometry of Latent Spaces"
subtitle: "An exploration of high-dimensional manifold alignment and the underlying data orchestration required to sustain real-time inference at scale."
label: "Technical Deep Dive // ARCH-012"
authors:
  - name: Research Team
date: "June 14, 2024"
readTime: "12 min"
footer: expanded
---

<script>
import MathBlock from '$lib/components/entries/MathBlock.svelte';
import ContentCard from '$lib/components/entries/ContentCard.svelte';
import SectionHeader from '$lib/components/entries/SectionHeader.svelte';
import BentoGrid from '$lib/components/entries/BentoGrid.svelte';
import PipelineDiagram from '$lib/components/entries/PipelineDiagram.svelte';
import StatCard from '$lib/components/entries/StatCard.svelte';
import LatencyCard from '$lib/components/entries/LatencyCard.svelte';
import FeaturePoint from '$lib/components/entries/FeaturePoint.svelte';
import CodeEditor from '$lib/components/entries/CodeEditor.svelte';
</script>

<!-- Section 1: Mathematical Foundations -->
<ContentCard>
  <!-- two-column layout via grid inside -->
  ...prose + MathBlock
</ContentCard>

<!-- Section 2: Architecture -->
<SectionHeader ... />
<BentoGrid>
  <PipelineDiagram ... />
  <StatCard ... />
  <LatencyCard ... />
</BentoGrid>

<!-- Section 3: Code & Logic -->
...sidebar content + CodeEditor
```

## Out of Scope

- Journal layout (will be a separate follow-up using the same pattern)
- Dynamic `[slug]` routing (each entry is a static `.md` file at its own route path)
- Syntax highlighting customization (using default mdsvex/Prism for now)
