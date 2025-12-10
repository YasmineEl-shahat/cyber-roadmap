# Cyber Roadmap

A modern web application for visualizing and exploring cybersecurity certifications. The app displays certifications on an interactive scatter plot chart, allowing users to filter, search, and view detailed information about each certification.

## Features

- **Interactive Scatter Plot Chart**: Visualize certifications based on Market Presence (x-axis) and Satisfaction (y-axis)
- **Certification Types**: Filter by Blue Team, Red Team, or InfoSec certifications
- **Skill Level Filtering**: Filter certifications by skill level (Novice, Beginner, Intermediate, Advanced, Expert)
- **Search Functionality**: Search certifications by title or abbreviation
- **Detailed Modal View**: Click on any certification point to view comprehensive details including:
  - Provider information, cost, and training details
  - Requirements (knowledge, work experience, prior courses)
  - Exam details (format, duration, attempts, report requirements)
  - Job roles and domains covered
- **Fullscreen Mode**: Toggle fullscreen for better chart visibility

## Tech Stack

- **Framework**: Next.js 16.0.7 (App Router)
- **Language**: TypeScript 5
- **UI Library**: React 19.2.0
- **Styling**: Tailwind CSS 4
- **Charts**: ApexCharts 5.3.6 (via react-apexcharts)
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **State Management**: React Hooks

## Setup Instructions

### Prerequisites

- Node.js 18+ (recommended: 20+)
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd cyber-roadmap
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Architecture Decisions and Rationale

### 1. **Component-Based Architecture with Custom Hooks**

**Decision**: Separation of business logic into custom hooks, keeping components focused on presentation.

**Rationale**:

- **Separation of Concerns**: Logic is separated from UI, making components easier to test and maintain
- **Reusability**: Hooks can be shared across multiple components
- **Testability**: Business logic in hooks can be tested independently
- **Performance**: Hooks use `useMemo` and `useCallback` appropriately to prevent unnecessary re-renders

**Implementation**:

- `useFilters`: Manages filter state and change handlers
- `useChartOptions`: Handles all ApexCharts configuration logic
- `useFullscreen`: Manages fullscreen API interactions
- `useCertificationFiltering`: Centralizes search, filtering, and selection state

### 2. **Modular Component Structure**

**Decision**: Breaking down complex components into smaller, focused child components.

**Rationale**:

- **Single Responsibility Principle**: Each component has one clear purpose
- **Maintainability**: Easier to locate and fix bugs
- **Reusability**: Components like `InfoField` and `TagsField` can be reused
- **Readability**: Smaller components are easier to understand

**Structure**:

```
components/
  ├── certification/        # Modal sub-components
  │   ├── InfoField.tsx
  │   ├── TagsField.tsx
  │   ├── RequirementItem.tsx
  │   ├── RequirementsSection.tsx
  │   └── DomainsField.tsx
  ├── Chart.tsx             # Main chart component
  ├── Filters.tsx           # Filter controls
  ├── SearchBox.tsx         # Search input
  └── CertificationModal.tsx # Modal container
```

### 3. **Centralized Constants and Utilities**

**Decision**: Shared constants and utility functions in dedicated modules.

**Rationale**:

- **DRY Principle**: Eliminates code duplication
- **Consistency**: Ensures uniform data handling across the application
- **Type Safety**: Centralized types prevent inconsistencies
- **Easy Updates**: Single source of truth for configuration

**Modules**:

- `lib/constants.ts`: Certification types, skill levels, and configuration
- `lib/utils/certifications.ts`: Filtering and grouping utilities
- `lib/types.ts`: TypeScript type definitions

### 4. **Dynamic Chart Import**

**Decision**: Using Next.js `dynamic` import for ApexCharts with SSR disabled.

**Rationale**:

- **Performance**: ApexCharts is a large library; client-side only reduces initial bundle size
- **Compatibility**: ApexCharts requires browser APIs (Canvas, DOM) not available during SSR
- **Code Splitting**: Dynamically loaded, improving initial page load time

### 5. **TypeScript First Approach**

**Decision**: Strict TypeScript configuration with comprehensive type definitions.

**Rationale**:

- **Type Safety**: Catches errors at compile time
- **Developer Experience**: Better IDE autocomplete and IntelliSense
- **Refactoring Safety**: Types make large refactorings safer
- **Documentation**: Types serve as inline documentation

### 6. **ApexCharts for Data Visualization**

**Decision**: Using ApexCharts over alternatives like Recharts or D3.js.

**Rationale**:

- **Rich Feature Set**: Built-in support for scatter plots, annotations, tooltips, and custom styling
- **Interactive Capabilities**: Built-in event handling for marker clicks
- **Styling Flexibility**: Extensive theming and customization options
- **Documentation**: Well-documented with good examples
- **Performance**: Efficient rendering for moderate datasets

## Assumptions

1. **Data Source**: Currently uses mock data (`lib/mock-data.ts`). Assumed that:

   - Certifications data will eventually come from an API or database
   - Data structure (Certification type) will remain relatively stable
   - Additional certification types may be added in the future

2. **Browser Support**: Assumes modern browsers with:

   - ES2017+ support
   - Fullscreen API support
   - Canvas API support
   - Modern CSS features (CSS variables, Grid, Flexbox)

3. **User Interaction**:

   - Users will interact primarily with mouse/trackpad (click events)
   - Touch device support is not a primary concern (though may work)
   - Keyboard navigation is minimal (focus on visual interaction)

4. **Performance**:

   - Dataset size is moderate (< 100 certifications)
   - No pagination needed for current data volume
   - Client-side filtering/search is acceptable for current scale

5. **Styling**:
   - Tailwind CSS utility classes are preferred
   - Dark theme is assumed (based on color scheme)
   - Responsive design focused on desktop/tablet viewports

## Known Limitations and Trade-offs

### 1. **Server-Side Rendering (SSR)**

**Limitation**: Chart component cannot be server-side rendered due to ApexCharts requiring browser APIs.

**Trade-off**:

- Smaller initial bundle (dynamic import)
- Faster initial page load

**Mitigation**: Chart is dynamically imported and only loads on client side.

### 2. **Static Mock Data**

**Limitation**: Application currently uses hardcoded mock data instead of a real data source.

**Trade-off**:

- Simple setup, no backend required
- Fast development iteration

**Future Enhancement**: Replace with API integration or database connection.

## Project Structure

```
cyber-roadmap/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Main page component
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── certification/     # Modal sub-components
│   ├── ui/                # Reusable UI primitives (Radix UI)
│   ├── Chart.tsx          # Main chart component
│   ├── Filters.tsx        # Filter controls
│   ├── SearchBox.tsx      # Search input
│   └── CertificationModal.tsx
├── hooks/                 # Custom React hooks
│   ├── useFilters.ts
│   ├── useChartOptions.ts
│   ├── useFullscreen.ts
│   └── useCertificationFiltering.ts
├── lib/                   # Utilities and constants
│   ├── constants.ts       # App-wide constants
│   ├── types.ts           # TypeScript types
│   ├── mock-data.ts       # Mock certification data
│   └── utils/             # Utility functions
│       └── certifications.ts
└── public/                # Static assets
```

## Development Guidelines

### Adding New Certification Types

1. Update `CERT_TYPES` in `lib/constants.ts`
2. Add configuration in `CERT_TYPE_CONFIG`
3. Update CSS variables in `app/globals.css` if custom colors needed
4. Update `Certification` type if structure changes

### Adding New Filters

1. Update `FilterState` type in `lib/utils/certifications.ts`
2. Modify `filterCertifications` function
3. Update `Filters` component UI
4. Update `useFilters` hook if needed

### Styling Guidelines

- Use Tailwind utility classes
- Follow existing color scheme (CSS variables)
- Maintain consistent spacing (gap-4, space-y-4)
- Use semantic class names

### Component Guidelines

- Keep components focused on single responsibility
- Extract complex logic to hooks
- Use TypeScript for all props
- Prefer composition over inheritance

## Future Enhancements

- [ ] API integration for dynamic data
- [ ] User authentication and saved preferences
- [ ] Export chart as image/PDF
- [ ] Comparison mode (compare multiple certifications)
- [ ] Advanced filtering (cost, provider, etc.)
- [ ] Responsive design improvements
- [ ] Accessibility improvements (ARIA, keyboard nav)
- [ ] Unit and integration tests
- [ ] Performance monitoring and optimization
- [ ] Analytics integration

## License

[Add your license here]

## Contributing

[Add contribution guidelines here]
