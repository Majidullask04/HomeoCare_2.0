# Dr. Masudul Karim Homeopathy Clinic

A modern, highly interactive, and performant web application built for Dr. Masudul Karim's Homeopathy Clinic. This project provides a premium user experience featuring smooth scroll animations, 3D tilt effects, magnetic buttons, and a responsive design.

## 🚀 Technologies Used

- **Framework**: [React 19](https://react.dev/) building Single Page Application (SPA) with [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) for robust, type-safe code
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) (via shadcn/ui integration)
- **Animations**:
  - [GSAP (GreenSock)](https://gsap.com/) for complex scroll-triggered animations and timelines
  - [Framer Motion](https://www.framer.com/motion/) for declarative component-level transitions
  - Custom CSS 3D Transforms
- **Smooth Scrolling**: [Lenis](https://lenis.studiofreight.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Form Handling**: React Hook Form combined with Zod for validation

## ✨ Key Features

- **Immersive Animations**: Experience parallax drifts, floating elements, dark section wipe reveals, and 3D doctor profile carousels.
- **Micro-interactions**: Engaging magnetic buttons, 3D tilt cards, custom cursors, and text scramble effects on hover.
- **Responsive & Performant**: Fully adaptable layout that degrades animations gracefully on mobile devices to preserve battery and performance.
- **Accessibility Ready**: Built-in support for `prefers-reduced-motion` to ensure a comfortable experience for all users.

## 📂 Project Structure

```text
HomeoCare/
├── app/
│   ├── src/
│   │   ├── components/   # Configured UI components (buttons, dialogs) and custom animated components
│   │   ├── hooks/        # Custom React hooks (e.g., scroll progress, mouse tracking)
│   │   ├── lib/          # Helper utilities and global animation configurations
│   │   ├── sections/     # Core page sections (Hero, About, Services, Doctor Profile, FAQ, etc.)
│   │   ├── App.tsx       # Root layout and component composition
│   │   ├── main.tsx      # Application entry point and GSAP registration
│   │   └── index.css     # Global styles and Tailwind imports
│   ├── public/           # Static image assets and favicons
│   ├── package.json      # App dependencies and scripts
│   ├── tailwind.config.js# Tailwind theme and plugin configuration
│   └── vite.config.ts    # Vite bundler options
├── TechSpec.md           # Extensive technical documentation and animation planning
└── README.md             # Project overview (this file)
```

## 🛠️ Getting Started

### Prerequisites

Ensure you have Node.js installed (v18 or higher recommended).

### Installation & Local Development

1. **Navigate to the application directory**:
   ```bash
   cd app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   The application will deploy locally to `http://localhost:5173`.

### Building for Production

To create an optimized, minified production build:
```bash
cd app
npm run build
```

To preview your production build locally before deploying:
```bash
npm run preview
```

## 🎨 Animation System Details

This project utilizes a multi-layered animation strategy meticulously planned out in `TechSpec.md` to ensure a smooth 60fps experience:

- **GSAP ScrollTrigger**: Manages heavy-lifting scroll animations, ensuring components pin and unpin reliably while scrubbing linked animations.
- **Framer Motion**: Handles simple state-based animations (like hover/tap variants) intuitively.
- **CSS Animations**: Powers infinite-looping idle states (like background glows or floating elements) to keep the main JavaScript thread free.

_To dive deeper into the technical architecture and animation behavior, refer to the `TechSpec.md` file._
