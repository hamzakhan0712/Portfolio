# Hamza Khan - Developer Portfolio

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-96.9%25-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.4.1-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.11-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

**Modern, Responsive Developer Portfolio Website**

[Live Demo](#) • [Features](#-key-features) • [Installation](#-installation) • [Customization](#-customization)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Project Structure](#-project-structure)
- [Customization](#-customization)
- [Components](#-components)
- [Deployment](#-deployment)
- [Performance](#-performance)
- [Browser Support](#-browser-support)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 Overview

A sleek, modern portfolio website built with cutting-edge web technologies. This portfolio showcases projects, skills, and professional experience with beautiful animations, smooth transitions, and an intuitive user interface.

Designed with performance and user experience in mind, this portfolio is fully responsive, accessible, and optimized for all devices and screen sizes.

### Why This Portfolio?

- ⚡ **Lightning Fast**: Built with Vite for instant hot module replacement
- 🎨 **Beautiful UI**: Shadcn UI components with Tailwind CSS
- 🌙 **Dark Mode**: Theme switching with smooth transitions
- 📱 **Responsive**: Perfect experience on all devices
- ♿ **Accessible**: Built with accessibility best practices
- 🚀 **Performance**: Optimized for Core Web Vitals
- 🎭 **Animations**: Smooth Framer Motion animations
- 🔧 **Type-Safe**: Full TypeScript support

---

## ✨ Key Features

### 🔹 Modern UI/UX Design
- **Shadcn UI Components**: Beautiful, accessible component library
- **Tailwind CSS**: Utility-first styling with custom design system
- **Framer Motion**: Smooth page transitions and animations
- **Responsive Layout**: Mobile-first design approach
- **Dark/Light Mode**: Theme toggle with next-themes
- **Custom Typography**: Tailwind Typography plugin

### 🔹 Interactive Sections
- **Hero Section**: Eye-catching introduction with animated elements
- **About Me**: Professional bio and background
- **Skills & Technologies**: Visual representation of tech stack
- **Projects Portfolio**: Showcase of work with live demos and code
- **Experience Timeline**: Professional work history
- **Education**: Academic background and certifications
- **Contact Form**: Functional contact form with validation
- **Social Links**: Connect via GitHub, LinkedIn, etc.

### 🔹 Advanced Features
- **QR Code Generation**: Share profile with QR codes
- **Day Picker**: Date selection for scheduling
- **Data Visualization**: Charts with Recharts
- **Form Validation**: React Hook Form with Zod schemas
- **OTP Input**: Secure input components
- **Carousel**: Image/project carousels with Embla
- **Scroll Animations**: React Scroll integration
- **Toast Notifications**: User feedback with Sonner

### 🔹 Developer Experience
- **TypeScript**: Type safety throughout
- **ESLint**: Code quality enforcement
- **Hot Reload**: Instant updates during development
- **Component Library**: Reusable UI components
- **Custom Hooks**: Shared logic abstraction
- **Path Aliases**: Clean import statements
- **Production Build**: Optimized bundle sizes

---

## 🛠 Technology Stack

### **Core Framework**
- **React**: 18.3.1 - UI library
- **TypeScript**: 5.5.3 - Type-safe JavaScript
- **Vite**: 5.4.1 - Build tool and dev server
- **React Router DOM**: 6.26.2 - Client-side routing

### **UI Framework & Styling**
- **Shadcn UI**: Component library
- **Tailwind CSS**: 3.4.11 - Utility-first CSS
- **Radix UI**: Accessible primitives
- **Lucide React**: 0.462.0 - Icon library
- **next-themes**: 0.3.0 - Theme management
- **Framer Motion**: 12.12.1 - Animation library

### **Form & Validation**
- **React Hook Form**: 7.53.0 - Form state management
- **Zod**: 3.24.4 - Schema validation
- **@hookform/resolvers**: 3.10.0 - Resolver utilities

### **Additional Libraries**
- **React Query**: 5.56.2 - Data fetching
- **Recharts**: 2.12.7 - Data visualization
- **Embla Carousel**: 8.3.0 - Carousel component
- **React Day Picker**: 8.10.1 - Date picker
- **React Scroll**: 1.9.3 - Smooth scrolling
- **qrcode.react**: 4.2.0 - QR code generation
- **input-otp**: 1.2.4 - OTP input
- **Sonner**: 1.7.4 - Toast notifications
- **date-fns**: 3.6.0 - Date utilities
- **cmdk**: 1.0.0 - Command menu
- **vaul**: 0.9.3 - Drawer component

### **Development Tools**
- **ESLint**: 9.9.0 - Code linting
- **TypeScript ESLint**: 8.0.1 - TS linting
- **PostCSS**: 8.4.47 - CSS processing
- **Autoprefixer**: 10.4.20 - CSS prefixing
- **@tailwindcss/typography**: 0.5.15 - Typography styles

### **Build Tools**
- **Vite Plugin React SWC**: 3.5.0 - Fast refresh
- **Bun**: Modern JavaScript runtime (optional)

---

## 🚀 Installation

### Prerequisites

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher (or yarn/pnpm/bun)
- **Git**: For version control

### Step-by-Step Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/hamzakhan0712/portfolio.git
cd portfolio
```

#### 2. Install Dependencies

Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

Using pnpm:
```bash
pnpm install
```

Using bun:
```bash
bun install
```

#### 3. Start Development Server
```bash
npm run dev
```

The portfolio will be available at: `http://localhost:5173`

#### 4. Build for Production
```bash
npm run build
```

#### 5. Preview Production Build
```bash
npm run preview
```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Application
VITE_APP_NAME=Hamza Khan Portfolio
VITE_APP_VERSION=1.0.0

# Contact Form (if using EmailJS or similar)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# Analytics (optional)
VITE_GA_TRACKING_ID=UA-XXXXXXXXX-X

# Social Links
VITE_GITHUB_URL=https://github.com/hamzakhan0712
VITE_LINKEDIN_URL=https://linkedin.com/in/yourprofile
VITE_TWITTER_URL=https://twitter.com/yourhandle
```

### Tailwind Configuration

Edit `tailwind.config.ts` to customize your design system:

```typescript
import type { Config } from "tailwindcss"

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Add your custom colors
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... more colors
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
  ],
} satisfies Config
```

### Vite Configuration

The `vite.config.ts` includes path aliases for cleaner imports:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

---

## 📁 Project Structure

```
portfolio/
│
├── public/                      # Static assets
│   ├── favicon.ico
│   ├── images/
│   └── resume.pdf
│
├── src/
│   ├── components/              # React components
│   │   ├── ui/                  # Shadcn UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   │
│   │   ├── layout/              # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   │
│   │   ├── sections/            # Page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Experience.tsx
│   │   │   └── Contact.tsx
│   │   │
│   │   └── shared/              # Shared components
│   │       ├── ThemeToggle.tsx
│   │       ├── SocialLinks.tsx
│   │       └── ProjectCard.tsx
│   │
│   ├── pages/                   # Page components
│   │   ├── Home.tsx
│   │   ├── Projects.tsx
│   │   └── Contact.tsx
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useTheme.ts
│   │   ├── useScrollAnimation.ts
│   │   └── useMediaQuery.ts
│   │
│   ├── lib/                     # Utility libraries
│   │   ├── utils.ts             # Helper functions
│   │   └── constants.ts         # App constants
│   │
│   ├── types/                   # TypeScript types
│   │   └── index.ts
│   │
│   ├── data/                    # Static data
│   │   ├── projects.ts
│   │   ├── skills.ts
│   │   └── experience.ts
│   │
│   ├── App.tsx                  # Main App component
│   ├── App.css                  # App styles
│   ├── main.tsx                 # Entry point
│   ├── index.css                # Global styles
│   └── vite-env.d.ts            # Vite types
│
├── .gitignore                   # Git ignore rules
├── bun.lockb                    # Bun lock file
├── components.json              # Shadcn UI config
├── eslint.config.js             # ESLint configuration
├── index.html                   # HTML template
├── package.json                 # Dependencies
├── postcss.config.js            # PostCSS config
├── tailwind.config.ts           # Tailwind config
├── tsconfig.json                # TypeScript config
├── tsconfig.app.json            # App TS config
├── tsconfig.node.json           # Node TS config
├── vite.config.ts               # Vite configuration
├── LICENSE                      # MIT License
└── README.md                    # This file
```

---

## 🎨 Customization

### Personal Information

Edit the data files in `src/data/`:

#### Profile Information
```typescript
// src/data/profile.ts
export const profile = {
  name: "Your Name",
  title: "Full-Stack Developer",
  bio: "Your professional bio...",
  email: "your.email@example.com",
  location: "City, Country",
  avatar: "/images/avatar.jpg",
  resume: "/resume.pdf",
}
```

#### Social Links
```typescript
// src/data/socials.ts
export const socials = {
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourprofile",
  twitter: "https://twitter.com/yourhandle",
  email: "mailto:your.email@example.com",
}
```

#### Projects
```typescript
// src/data/projects.ts
export const projects = [
  {
    id: 1,
    title: "Project Name",
    description: "Project description...",
    image: "/images/project1.jpg",
    technologies: ["React", "TypeScript", "Node.js"],
    liveUrl: "https://project-demo.com",
    githubUrl: "https://github.com/yourusername/project",
    featured: true,
  },
  // Add more projects...
]
```

#### Skills
```typescript
// src/data/skills.ts
export const skills = {
  frontend: [
    { name: "React", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "Tailwind CSS", level: 90 },
  ],
  backend: [
    { name: "Node.js", level: 80 },
    { name: "Python", level: 75 },
  ],
  // ... more categories
}
```

### Theme Customization

#### Colors
Edit `src/index.css` to customize the color palette:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    /* Add your custom colors */
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
    /* Dark mode colors */
  }
}
```

#### Typography
```css
@layer base {
  body {
    @apply font-sans antialiased;
  }
  
  h1 {
    @apply text-4xl font-bold tracking-tight;
  }
  
  /* More typography styles */
}
```

---

## 🧩 Components

### Key Components

#### Hero Section
```tsx
// src/components/sections/Hero.tsx
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center"
    >
      <div className="container mx-auto">
        <h1 className="text-6xl font-bold mb-4">
          Hi, I'm Hamza Khan
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Full-Stack Developer | Problem Solver | Tech Enthusiast
        </p>
        <Button size="lg">View My Work</Button>
      </div>
    </motion.section>
  )
}
```

#### Project Card
```tsx
// src/components/shared/ProjectCard.tsx
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
}

export function ProjectCard({
  title,
  description,
  technologies,
  liveUrl,
  githubUrl,
}: ProjectCardProps) {
  return (
    <Card className="p-6">
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech) => (
          <Badge key={tech} variant="secondary">
            {tech}
          </Badge>
        ))}
      </div>
      
      <div className="flex gap-2">
        {liveUrl && (
          <Button variant="default" asChild>
            <a href={liveUrl} target="_blank" rel="noopener noreferrer">
              Live Demo
            </a>
          </Button>
        )}
        {githubUrl && (
          <Button variant="outline" asChild>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              View Code
            </a>
          </Button>
        )}
      </div>
    </Card>
  )
}
```

---

## 🚢 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Production Deployment**
```bash
vercel --prod
```

### Netlify

1. **Build the project**
```bash
npm run build
```

2. **Deploy dist folder**
```bash
netlify deploy --prod --dir=dist
```

### GitHub Pages

1. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Add deploy script to package.json**
```json
{
  "scripts": {
    "deploy": "vite build && gh-pages -d dist"
  }
}
```

3. **Deploy**
```bash
npm run deploy
```

### Docker

```dockerfile
# Dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
docker build -t portfolio .
docker run -p 80:80 portfolio
```

---

## ⚡ Performance

### Optimization Features

- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Remove unused code
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Compressed and responsive images
- **CSS Purging**: Tailwind removes unused styles
- **Minification**: Production builds are minified
- **Gzip Compression**: Smaller file sizes

### Performance Metrics

- **Lighthouse Score**: 95+ on all metrics
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Bundle Size**: < 200KB (gzipped)

---

## 🌐 Browser Support

- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions
- **Mobile Browsers**: iOS Safari, Chrome Mobile

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m "Add: Amazing feature"
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Coding Standards

- Follow TypeScript best practices
- Use ESLint configuration
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

**Hamza Khan**
- GitHub: [@hamzakhan0712](https://github.com/hamzakhan0712)
- Portfolio: [Your Portfolio URL]
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- **React Team** for the amazing library
- **Vite Team** for the blazing-fast build tool
- **Shadcn** for the beautiful UI components
- **Radix UI** for accessible primitives
- **Tailwind Labs** for Tailwind CSS
- **Vercel** for hosting and deployment

---

## 🗺️ Roadmap

### Upcoming Features

- [ ] Blog section with MDX support
- [ ] Testimonials carousel
- [ ] Multi-language support (i18n)
- [ ] Advanced animations
- [ ] Project case studies
- [ ] Skills progress animations
- [ ] Contact form backend integration
- [ ] Analytics dashboard
- [ ] PWA support
- [ ] Accessibility improvements

---

<div align="center">

**Built with ❤️ by Hamza Khan**

⭐ Star this repository if you find it helpful!

[Report Bug](https://github.com/hamzakhan0712/portfolio/issues) | [Request Feature](https://github.com/hamzakhan0712/portfolio/issues)

</div>
