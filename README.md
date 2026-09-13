# AI Intelligence - Premium Next.js Website

A high-end, world-class website for an AI services company built with Next.js 14, featuring immersive 3D visuals, smooth animations, and cutting-edge design.

## ✨ Features

- **🎨 Premium Design**: Dark, cinematic backgrounds with neon/gradient highlights
- **🌐 3D Immersive Experience**: Interactive Three.js 3D elements throughout
- **⚡ Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **📱 Fully Responsive**: Optimized for all devices and screen sizes
- **🔍 SEO Optimized**: Built-in SEO with next-seo and structured metadata
- **🚀 Performance**: Built on Next.js 14 with App Router for optimal speed
- **♿ Accessible**: Follows web accessibility best practices

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Graphics**: Three.js & React Three Fiber
- **SEO**: next-seo
- **Fonts**: Inter & Space Grotesk (Google Fonts)

## 📦 Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles
├── components/
│   ├── Navigation.tsx       # Navigation bar with animations
│   ├── Hero.tsx             # Hero section
│   ├── Hero3D.tsx           # 3D background for hero
│   ├── Services.tsx         # Services section
│   ├── About.tsx            # About section with timeline
│   ├── CaseStudies.tsx      # Case studies with filtering
│   └── Contact.tsx          # Contact form
├── lib/
│   └── utils.ts             # Utility functions
└── public/                  # Static assets
```

### BIMI email logo

The BIMI-compatible SVG logo is hosted as a public static asset for email authentication. After deployment, it is available at:

https://shivai.co.in/bimi-logo.svg

The same square logo is also hosted for email signatures at:

https://shivai.co.in/logo-email.png

## 🎨 Design Philosophy

- **Dark Mode First**: Elegant dark theme with vibrant accents
- **Futuristic Aesthetics**: AI-inspired visuals and animations
- **Premium Feel**: High-quality interactions and smooth transitions
- **Immersive Experience**: 3D elements that engage users
- **World-Class Design**: Inspired by top AI startups and luxury tech brands

## 🚀 Build & Deploy

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## 📝 Customization

### Colors

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
colors: {
  primary: {
    DEFAULT: "#6366f1",
    dark: "#4f46e5",
  },
  accent: {
    cyan: "#06b6d4",
    purple: "#a855f7",
    pink: "#ec4899",
  },
}
```

### Content

Update the content in each component:

- **Hero**: Edit `components/Hero.tsx`
- **Services**: Modify services array in `components/Services.tsx`
- **About**: Update milestones and values in `components/About.tsx`
- **Case Studies**: Change case studies in `components/CaseStudies.tsx`
- **Contact**: Update contact info in `components/Contact.tsx`

### SEO

Edit SEO metadata in `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Your Company Name",
  description: "Your company description",
  // ... other metadata
};
```

## 🎭 Animations

This project uses Framer Motion for animations. Key animation patterns:

- **Scroll-based reveals**: `useInView` hook
- **Hover interactions**: `whileHover` prop
- **Page transitions**: Motion components
- **3D rotations**: Three.js animations

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is created for demonstration purposes.

## 🤝 Support

For questions or support, please contact: hello@aiintelligence.com

---

Built with ❤️ using Next.js and cutting-edge web technologies.
