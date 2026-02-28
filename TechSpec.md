# Technical Specification: Dr. Masudul Karim Homeopathy Clinic

## 1. COMPONENT INVENTORY

### shadcn/ui Components (Built-in)
| Component | Purpose | Customization |
|-----------|---------|---------------|
| Button | CTAs, navigation | Custom magnetic hover effect |
| Card | Service cards, testimonials | 3D tilt effect |
| Input | Form fields | Custom styling |
| Accordion | FAQ section | Custom animation |
| Carousel | Services, Doctor profiles | Custom navigation arrows |
| Badge | Tags, labels | Floating animation |

### Custom Components
| Component | Purpose | Location |
|-----------|---------|----------|
| FloatingTag | Hero floating badges | `components/FloatingTag.tsx` |
| MagneticButton | Buttons with magnetic cursor effect | `components/MagneticButton.tsx` |
| TiltCard | 3D perspective tilt on hover | `components/TiltCard.tsx` |
| ScrollReveal | Wrapper for scroll animations | `components/ScrollReveal.tsx` |
| CounterAnimation | Animated number counter | `components/CounterAnimation.tsx` |
| TextScramble | Text scramble effect on hover | `components/TextScramble.tsx` |

---

## 2. ANIMATION IMPLEMENTATION TABLE

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| Hero parallax drift | GSAP ScrollTrigger | Pin section, animate tags y-position on scroll | High |
| Floating tags continuous | CSS/Framer Motion | Infinite sine-wave y animation | Low |
| About images assemble | GSAP ScrollTrigger | Staggered reveal with rotation | Medium |
| Services horizontal scroll | GSAP Draggable | Drag-based carousel with momentum | High |
| Dark section wipe reveal | GSAP ScrollTrigger | Clip-path animation on pin | High |
| Score card slide | GSAP ScrollTrigger | Transform translateY during pin | Medium |
| Doctor 3D carousel | CSS 3D Transforms | Perspective + rotateY on cards | High |
| Bento cards pop | GSAP ScrollTrigger | Scale + opacity with back easing | Medium |
| Magnetic buttons | GSAP quickTo | Mouse position tracking | Medium |
| 3D card tilt | Vanilla JS + CSS | Mouse position to rotateX/Y calculation | Medium |
| Counter animation | Custom hook | requestAnimationFrame number interpolation | Low |
| Text scramble | Custom component | Character randomization effect | Medium |
| Scroll reveal | GSAP ScrollTrigger | Generic fade/slide up wrapper | Low |

---

## 3. ANIMATION LIBRARY CHOICES

### Primary: GSAP (GreenSock)
**Rationale**: 
- Best-in-class scroll-triggered animations
- Smooth scrubbing and pinning
- Excellent performance
- ScrollTrigger plugin for precise control

**Usage**:
- All scroll-based animations
- Pinned sections
- Complex timelines

### Secondary: Framer Motion
**Rationale**:
- React-native integration
- Simple hover/tap animations
- AnimatePresence for mount/unmount

**Usage**:
- Component-level hover effects
- Loading animations
- Simple transitions

### Tertiary: CSS Animations
**Rationale**:
- Zero JS overhead
- Perfect for continuous loops

**Usage**:
- Floating tag idle animation
- Button hover states
- Loading spinners

---

## 4. PROJECT FILE STRUCTURE

```
app/
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn components
│   │   ├── FloatingTag.tsx
│   │   ├── MagneticButton.tsx
│   │   ├── TiltCard.tsx
│   │   ├── ScrollReveal.tsx
│   │   ├── CounterAnimation.tsx
│   │   ├── TextScramble.tsx
│   │   └── CustomCursor.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── PrecisionCare.tsx
│   │   ├── DoctorProfile.tsx
│   │   ├── BentoGrid.tsx
│   │   ├── Reviews.tsx
│   │   ├── FAQ.tsx
│   │   ├── ContactForm.tsx
│   │   └── Footer.tsx
│   ├── hooks/
│   │   ├── useMousePosition.ts
│   │   ├── useScrollProgress.ts
│   │   └── useInView.ts
│   ├── lib/
│   │   ├── utils.ts
│   │   └── animations.ts
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── public/
│   └── images/
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

---

## 5. DEPENDENCIES

### Core
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "vite": "^5.0.0",
  "typescript": "^5.0.0"
}
```

### Animation
```json
{
  "gsap": "^3.12.0",
  "@gsap/react": "^2.1.0",
  "framer-motion": "^11.0.0"
}
```

### UI
```json
{
  "tailwindcss": "^3.4.0",
  "@radix-ui/react-*": "latest",
  "class-variance-authority": "latest",
  "clsx": "latest",
  "tailwind-merge": "latest"
}
```

### Icons
```json
{
  "lucide-react": "latest"
}
```

---

## 6. KEY IMPLEMENTATION DETAILS

### 6.1 GSAP ScrollTrigger Setup
```typescript
// In main.tsx or App.tsx
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Refresh on load
window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});
```

### 6.2 Smooth Scroll (Lenis)
```typescript
// hooks/useSmoothScroll.ts
import Lenis from '@studio-freight/lenis';

export const useSmoothScroll = () => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
  return lenis;
};
```

### 6.3 Magnetic Button Implementation
```typescript
// components/MagneticButton.tsx
const MagneticButton = ({ children }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    if (buttonRef.current) {
      xTo.current = gsap.quickTo(buttonRef.current, 'x', { duration: 0.3, ease: 'power2.out' });
      yTo.current = gsap.quickTo(buttonRef.current, 'y', { duration: 0.3, ease: 'power2.out' });
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect && xTo.current && yTo.current) {
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      xTo.current(x * 0.3);
      yTo.current(y * 0.3);
    }
  };

  const handleMouseLeave = () => {
    xTo.current?.(0);
    yTo.current?.(0);
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
};
```

### 6.4 3D Tilt Card Implementation
```typescript
// components/TiltCard.tsx
const TiltCard = ({ children }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    cardRef.current.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      scale3d(1.02, 1.02, 1.02)
    `;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.1s ease-out' }}
    >
      {children}
    </div>
  );
};
```

---

## 7. PERFORMANCE OPTIMIZATIONS

### 7.1 will-change Strategy
```css
/* Apply will-change only to actively animating elements */
.animating {
  will-change: transform, opacity;
}

/* Remove after animation completes */
.animation-complete {
  will-change: auto;
}
```

### 7.2 Image Optimization
- Use WebP format
- Implement lazy loading
- Use blur-up placeholders
- Specify explicit width/height

### 7.3 Animation Performance
- Use `transform` and `opacity` only
- Avoid animating `filter: blur()` during scroll
- Use `contain: layout style paint` on animated containers
- Throttle mouse move events to 16ms (60fps)

---

## 8. RESPONSIVE BREAKPOINTS

```typescript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
};
```

### Mobile Adaptations
- Disable 3D tilt effects
- Reduce floating tag count
- Simplify parallax (fewer layers)
- Convert horizontal carousels to vertical scroll
- Disable custom cursor

---

## 9. ACCESSIBILITY

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Focus States
- Visible focus rings on all interactive elements
- Skip to content link
- Proper heading hierarchy

---

## 10. TESTING CHECKLIST

- [ ] All scroll animations work smoothly
- [ ] Pinned sections pin correctly
- [ ] Reverse scroll reverses animations
- [ ] Fast scroll doesn't cause jumps
- [ ] Mobile responsive
- [ ] Reduced motion respected
- [ ] All images load correctly
- [ ] No console errors
- [ ] 60fps maintained during animations
- [ ] All buttons/links clickable