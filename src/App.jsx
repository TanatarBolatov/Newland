import React, { useRef, useEffect, useState, useCallback } from "react";

// --- CUSTOM SVG ICONS (Replacing lucide-react) ---
const Star = ({ size = 24, color = "currentColor", className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);
const Zap = ({ size = 24, color = "currentColor", className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);
const Users = ({ size = 24, color = "currentColor", className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);
const Smile = ({ size = 24, color = "currentColor", className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
    <line x1="9" y1="9" x2="9.01" y2="9"></line>
    <line x1="15" y1="9" x2="15.01" y2="9"></line>
  </svg>
);
const MessageCircle = ({ size = 24, color = "currentColor", className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);
const Cpu = ({ size = 24, color = "currentColor", className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
    <rect x="9" y="9" width="6" height="6"></rect>
    <line x1="9" y1="1" x2="9" y2="4"></line>
    <line x1="15" y1="1" x2="15" y2="4"></line>
    <line x1="9" y1="20" x2="9" y2="23"></line>
    <line x1="15" y1="20" x2="15" y2="23"></line>
    <line x1="20" y1="9" x2="23" y2="9"></line>
    <line x1="20" y1="14" x2="23" y2="14"></line>
    <line x1="1" y1="9" x2="4" y2="9"></line>
    <line x1="1" y1="14" x2="4" y2="14"></line>
  </svg>
);
const Briefcase = ({ size = 24, color = "currentColor", className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);
const MenuIcon = ({ size = 24, color = "currentColor", className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);
const X = ({ size = 24, color = "currentColor", className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// --- КОНФИГУРАЦИЯ ---
const VIDEO_PATH = "/studio-bg.webm";
const POSTER_IMAGE = "https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=1920&auto=format&fit=crop";
const GRID_SIZE = 60;

// --- ИКОНКИ ---
const SmallCheck = ({ color = "#35DF86" }) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;

const IconGift = ({ className, color }) => (
  <svg className={className} style={{ color: color }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 12 20 22 4 22 4 12" />
    <rect x="2" y="7" width="20" height="5" />
    <line x1="12" y1="22" x2="12" y2="7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
);

const IconStar = ({ className, color }) => (
  <svg className={className} style={{ color: color }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const IconCrown = ({ className, color }) => (
  <svg className={className} style={{ color: color }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
  </svg>
);

const IconPlus = ({ className, color = "white" }) => (
  <svg className={className} style={{ color: color }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

// --- СТИЛИ ---
const globalStyles = `
  /* --- ШРИФТЫ --- */
  @font-face { font-family: 'MontCustom'; src: url('/fonts/mont_heavy.ttf') format('truetype'); font-weight: normal; font-style: normal; font-display: swap; }
  @font-face { font-family: 'AlroCustom'; src: url('/fonts/alro-regular.otf') format('opentype'); font-weight: 400; font-style: normal; font-display: swap; }
  @font-face { font-family: 'AlroCustom'; src: url('/fonts/alro-regular.otf') format('opentype'); font-weight: 700; font-style: normal; font-display: swap; }

  * { box-sizing: border-box; }
  html.lenis, html.lenis body { height: auto; }
  .lenis.lenis-smooth { scroll-behavior: auto !important; }
  .lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
  .lenis.lenis-stopped { overflow: hidden; }
  .lenis.lenis-scrolling iframe { pointer-events: none; }

  :root {
    --electric-border-color: #35DF86;
    --electric-light-color: rgba(53, 223, 134, 0.8);
    --gradient-color: rgba(53, 223, 134, 0.4);
    --star-border-color: #5277C1;
    --star-light-color: rgba(82, 119, 193, 0.5);
    --star-gradient-color: rgba(82, 119, 193, 0.3);
    --color-neutral-900: #050507;
    --font-head: 'MontCustom', sans-serif;
    --font-body: 'MontCustom', sans-serif;
  }

  body {
    background-color: black;
    margin: 0;
    font-family: var(--font-body);
    color: white;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button, input, textarea { font-family: var(--font-body); }

  /* --- SIDEBAR STYLES --- */
  .custom-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 320px; 
    z-index: 2000;
    /* CASTER GRADIENT (Conic) */
    background: conic-gradient(from 180deg at 50% 50%, #1B4F47, #5277C1, #5C9FC5, #35DF86, #1B4F47);
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 40px;
    box-shadow: -10px 0 40px rgba(0,0,0,0.6);
    /* Более плавная анимация (0.8s + cubic-bezier) */
    transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .custom-sidebar.closed {
    transform: translateX(100%);
  }

  .custom-sidebar.open {
    transform: translateX(0);
  }

  .sidebar-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(5px);
    z-index: 1999;
    opacity: 0;
    pointer-events: none;
    /* Плавное затемнение синхронно с меню */
    transition: opacity 0.8s ease;
  }
  
  .sidebar-overlay.visible {
    opacity: 1;
    pointer-events: auto;
  }

  .sidebar-close-btn {
    position: absolute;
    top: 30px;
    right: 30px;
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.3s;
  }
  .sidebar-close-btn:hover { opacity: 1; }

  .sidebar-menu {
    display: flex;
    flex-direction: column;
    gap: 12px; 
  }

  .sidebar-link {
    display: flex;
    align-items: center;
    gap: 15px;
    font-family: var(--font-head);
    font-size: 1.1rem;
    font-weight: 700;
    text-transform: uppercase;
    color: white;
    background: transparent;
    border: 1px solid transparent;
    text-align: left;
    padding: 16px 24px;
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
  }

  /* Эффект матового стекла при наведении */
  .sidebar-link:hover {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    transform: translateX(-5px);
  }

  /* Иконка в меню */
  .menu-icon {
    opacity: 0.9;
  }

  /* --- TOGGLE BUTTON STYLES (WITH SHINE EFFECT) --- */
  .menu-toggle-btn {
    position: fixed;
    top: 30px;
    right: 30px;
    z-index: 1500;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    width: 90px;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    overflow: hidden; /* Important for containment of shine */
  }

  /* Shine Effect Element */
  .menu-toggle-btn::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    transition: left 0.65s ease-in-out;
    pointer-events: none;
  }

  .menu-toggle-btn:hover {
    transform: scale(1.1);
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 25px 5px rgba(255, 255, 255, 0.2); /* Enhanced glow */
  }

  /* Trigger shine on hover */
  .menu-toggle-btn:hover::before {
    left: 100%;
  }

  /* СТИЛИ ДЛЯ ТЕКСТА MENU */
  .menu-text-gradient {
    font-family: 'AlroCustom', sans-serif;
    font-weight: 700;
    font-size: 1.4rem;
    text-transform: lowercase;
    /* Градиент текста: Салатовый неон -> Лазурно-синий */
    background: linear-gradient(90deg, #35DF86, #5277C1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
  }

  /* --- ОСТАЛЬНЫЕ СТИЛИ (Grid, Cards, etc.) --- */
  .hero-container { padding: 20px; gap: 30px; background: #000; }
  .content-wrapper { gap: 80px; width: 100%; max-width: 800px; }

  /* Хлопушка */
  .clapper-btn-wrapper { background: transparent; border: none; cursor: pointer; outline: none; padding: 10px; transition: transform 0.2s ease; }
  .clapper-btn-wrapper:active { transform: scale(0.95); }
  .clapper-container { width: 240px; display: flex; flex-direction: column; gap: 6px; }
  .glass-clapper-style {
    background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(255, 255, 255, 0.1), inset 0 0 8px 4px rgba(255, 255, 255, 0.1);
    position: relative; overflow: hidden;
  }
  .glass-clapper-style::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent); pointer-events: none; }
  .glass-clapper-style::after { content: ''; position: absolute; top: 0; left: 0; width: 1px; height: 100%; background: linear-gradient(180deg, rgba(255, 255, 255, 0.8), transparent, rgba(255, 255, 255, 0.3)); pointer-events: none; }
  .clapper-top { height: 50px; width: 100%; border-radius: 16px; transform-origin: 10px 40px; transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
  .clapper-bottom { height: 100px; width: 100%; border-radius: 20px; display: flex; align-items: center; justify-content: center; }
  @media (hover: hover) { .clapper-btn-wrapper:hover .clapper-top { transform: rotate(-15deg); } }
  .clapper-btn-wrapper.is-clapping .clapper-top { animation: clap-html-effect 0.25s forwards; }
  @keyframes clap-html-effect { 0% { transform: rotate(-20deg); } 40% { transform: rotate(0deg); } 60% { transform: rotate(-5deg); } 100% { transform: rotate(0deg); } }

  /* Grid */
  .grid-wrapper { position: relative; width: 100%; background-color: #020202; overflow: hidden; }
  .grid-lines { position: absolute; inset: 0; z-index: 1; background-size: ${GRID_SIZE}px ${GRID_SIZE}px; background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px); pointer-events: none; }
  .grid-cells-container { position: absolute; top: 0; left: 0; z-index: 0; pointer-events: none; }
  .grid-cell { width: ${GRID_SIZE}px; height: ${GRID_SIZE}px; background-color: rgba(53, 223, 134, 0.15); opacity: 0; transition: opacity 1s ease; }
  .grid-cell.active { opacity: 1; transition: opacity 0s; background-color: rgba(53, 223, 134, 0.3); box-shadow: 0 0 10px rgba(53, 223, 134, 0.2); }

  .section-container { position: relative; z-index: 2; padding: 100px 20px; display: flex; flex-direction: column; align-items: center; background-color: transparent; }
  .section-title { font-family: var(--font-head); font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 700; text-transform: uppercase; text-align: center; margin-bottom: 15px; line-height: 1.2; }
  .section-subtitle { font-size: clamp(1rem, 2vw, 1.2rem); color: #9ca3af; text-align: center; margin-bottom: 60px; max-width: 600px; line-height: 1.5; font-weight: 300; }

  .new-comp-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 30px; max-width: 1600px; width: 100%; }
  
  .bento-header-card {
    grid-column: span 2; background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(11px); -webkit-backdrop-filter: blur(11px);
    border: 1px solid rgba(255, 255, 255, 0.3); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(255, 255, 255, 0.1), inset 0 0 2px 1px rgba(255, 255, 255, 0.1);
    border-radius: 32px; padding: 60px 40px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; min-height: 250px; position: relative; overflow: hidden;
  }
  .bento-header-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent); pointer-events: none; }
  .bento-header-card::after { content: ''; position: absolute; top: 0; left: 0; width: 1px; height: 100%; background: linear-gradient(180deg, rgba(255, 255, 255, 0.8), transparent, rgba(255, 255, 255, 0.3)); pointer-events: none; }

  .features-header-card {
    width: 100%; max-width: 1600px; background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(11px); -webkit-backdrop-filter: blur(11px);
    border: 1px solid rgba(255, 255, 255, 0.3); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(255, 255, 255, 0.1), inset 0 0 2px 1px rgba(255, 255, 255, 0.1);
    border-radius: 32px; padding: 60px 40px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; min-height: 250px; position: relative; overflow: hidden; margin-bottom: 40px;
  }
  .features-header-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent); pointer-events: none; }
  .features-header-card::after { content: ''; position: absolute; top: 0; left: 0; width: 1px; height: 100%; background: linear-gradient(180deg, rgba(255, 255, 255, 0.8), transparent, rgba(255, 255, 255, 0.3)); pointer-events: none; }

  .new-comp-card { border-radius: 32px; overflow: hidden; background-color: #0a0a0a; border: none; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5); transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); display: flex; flex-direction: column; height: 600px; position: relative; cursor: pointer; }
  .new-comp-card:hover { transform: scale(1.02); box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6); }
  .comp-video-container { width: 100%; height: 100%; background-color: #1a1a1a; overflow: hidden; position: absolute; top: 0; left: 0; z-index: 0; }
  .comp-video { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1); }
  .new-comp-card:hover .comp-video { transform: scale(1.05); }
  .comp-text-block { padding: 40px; display: flex; flex-direction: column; gap: 10px; flex-grow: 1; position: relative; z-index: 2; justify-content: flex-end; pointer-events: none; }
  .comp-card-title { padding: 20px 30px; font-family: var(--font-head); font-size: clamp(1.8rem, 2.5vw, 2.5rem); font-weight: 700; color: white; line-height: 1.1; background-color: rgba(0, 0, 0, 0.6); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border-radius: 16px; width: fit-content; margin: 30px 0 0 30px; position: relative; z-index: 2; pointer-events: none; }
  .comp-card-desc { display: none; }

  /* Apple Slider */
  .apple-slider-container { width: 100%; max-width: 1600px; height: 600px; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; margin: 0 auto; padding: 20px 0; }
  .apple-slider-track { position: relative; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; perspective: 1000px; }
  .apple-slide-item { position: absolute; width: 65%; height: 90%; border-radius: 20px; overflow: hidden; background-color: #111; transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1); cursor: pointer; box-shadow: 0 20px 50px rgba(0,0,0,0.6); }
  .apple-slide-media { width: 100%; height: 100%; object-fit: cover; pointer-events: none; }
  .apple-slide-content { position: absolute; bottom: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 40%, transparent 100%); display: flex; flex-direction: column; justify-content: flex-end; padding: 40px; opacity: 0; transition: opacity 0.4s ease 0.2s; }
  .apple-slide-item.active .apple-slide-content { opacity: 1; }
  .apple-slide-title { font-family: var(--font-head); font-size: clamp(1.8rem, 3vw, 3rem); font-weight: 700; text-transform: uppercase; color: white; margin-bottom: 10px; }
  .apple-slide-desc { font-family: var(--font-body); font-size: clamp(1rem, 1.2vw, 1.2rem); color: #ccc; line-height: 1.5; max-width: 80%; }
  .nav-dots-wrapper { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px; z-index: 20; }
  .nav-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.3); cursor: pointer; transition: all 0.3s; }
  .nav-dot.active { background: #35DF86; transform: scale(1.2); }

  .scramble-text { font-family: var(--font-head); font-weight: 700; text-transform: uppercase; color: white; cursor: default; font-size: clamp(2.5rem, 6vw, 4rem); letter-spacing: 1px; }
  .dud { color: #555; opacity: 0.7; }

  .partners-section-wrapper { width: 100%; display: flex; justify-content: center; padding: 100px 20px; position: relative; z-index: 2; }
  .partners-container-box { width: 100%; max-width: 1600px; background-color: #050507; border: none; border-radius: 32px; padding: 60px 20px; display: flex; flex-direction: column; align-items: center; box-shadow: 0 20px 50px rgba(0,0,0,0.7); position: relative; overflow: hidden; }
  
  /* --- NEW 3D PARTNERS SLIDER CSS --- */
  .partners-slider-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 500px; /* Give it space */
    overflow: visible;
    width: 100%;
    perspective: 1000px;
    margin-top: 40px;
  }
  .partners-slider {
    position: relative;
    width: 140px;
    height: 140px;
    transform-style: preserve-3d;
    animation: slider-rotate 20s linear infinite;
  }
  @keyframes slider-rotate {
    0% { transform: perspective(1000px) rotateY(0deg); }
    100% { transform: perspective(1000px) rotateY(360deg); }
  }
  .partners-slider span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform-origin: center;
    transform-style: preserve-3d;
    /* Increased translateZ to enlarge the circle radius */
    transform: rotateY(calc(var(--i)*45deg)) translateZ(350px);
    -webkit-box-reflect: below 0px linear-gradient(transparent, transparent, #0004);
  }
  .partners-slider span img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px; 
    object-fit: contain; 
    transition: 0.5s;
    background: transparent;
    border: none;
    /* Add volume/depth with drop-shadow */
    filter: drop-shadow(0 15px 15px rgba(0,0,0,0.5));
  }
  /* Optional hover effect to enhance 3D feel */
  .partners-slider span:hover img {
    transform: translateY(-10px) scale(1.1);
    filter: drop-shadow(0 25px 25px rgba(0,0,0,0.7));
  }

  @media screen and (max-width: 600px) {
    .partners-slider {
      width: 100px;
      height: 100px;
    }
    .partners-slider span {
      transform: rotateY(calc(var(--i)*45deg)) translateZ(160px);
    }
  }
  .partners-fade-overlay { position: absolute; top: 0; bottom: 0; left: 0; right: 0; pointer-events: none; background: linear-gradient(to right, #050507 0%, transparent 15%, transparent 85%, #050507 100%); z-index: 5; }

  .pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; max-width: 1600px; width: 100%; margin-top: 20px; align-items: stretch; }
  @media (max-width: 1024px) { .pricing-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 768px) { .pricing-grid { grid-template-columns: 1fr; } }
  .pricing-card { background-color: #050507; border-radius: 30px; overflow: hidden; display: flex; flex-direction: column; position: relative; border: 1px solid rgba(255, 255, 255, 0.08); box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5); transition: transform 0.3s ease, border-color 0.3s ease; padding: 40px 30px; height: 100%; }
  .pricing-card:hover { transform: translateY(-8px); border-color: rgba(255, 255, 255, 0.2); }
  .pricing-card.free { background: radial-gradient(circle at top center, rgba(92, 159, 197, 0.15) 0%, rgba(5, 5, 7, 0) 60%), #050507; }
  .pricing-card.electric { background: transparent; border: none; box-shadow: none; padding: 2px; border-radius: 24px; overflow: visible; height: 100%; background: linear-gradient(-30deg, var(--gradient-color), transparent, var(--gradient-color)), linear-gradient(to bottom, var(--color-neutral-900), var(--color-neutral-900)); }
  .electric-content { background-color: var(--color-neutral-900); border-radius: 24px; height: 100%; display: flex; flex-direction: column; padding: 40px 30px; position: relative; z-index: 2; border: 2px solid var(--electric-border-color); }
  .glow-layer-1 { position: absolute; inset: 0; border-radius: 24px; border: 2px solid rgba(53, 223, 134, 0.6); filter: blur(1px); z-index: 1; pointer-events: none; }
  .glow-layer-2 { position: absolute; inset: 0; border-radius: 24px; border: 2px solid var(--electric-light-color); filter: blur(4px); z-index: 1; pointer-events: none; }
  .background-glow { position: absolute; inset: 0; border-radius: 24px; background: linear-gradient(-30deg, var(--electric-light-color), transparent, var(--electric-border-color)); filter: blur(32px); opacity: 0.3; transform: scale(1.1); z-index: 0; pointer-events: none; }
  .overlay-1 { position: absolute; inset: 0; border-radius: 24px; background: linear-gradient(-30deg, white, transparent 30%, transparent 70%, white); mix-blend-mode: overlay; opacity: 1; filter: blur(16px); z-index: 3; pointer-events: none; }
  .pricing-card.standard-electric { background: transparent; border: none; box-shadow: none; padding: 2px; border-radius: 24px; overflow: visible; height: 100%; background: linear-gradient(-30deg, var(--star-gradient-color), transparent, var(--star-gradient-color)), linear-gradient(to bottom, var(--color-neutral-900), var(--color-neutral-900)); }
  .standard-electric-content { background-color: var(--color-neutral-900); border-radius: 24px; height: 100%; display: flex; flex-direction: column; padding: 40px 30px; position: relative; z-index: 2; border: 1.5px solid var(--star-border-color); }
  .star-glow-bg { position: absolute; inset: 0; border-radius: 24px; background: linear-gradient(-30deg, var(--star-light-color), transparent, var(--star-border-color)); filter: blur(24px); opacity: 0.15; transform: scale(1.05); z-index: 0; pointer-events: none; }
  .badge-electric { position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: var(--electric-border-color); color: black; padding: 6px 16px; border-radius: 20px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; z-index: 10; box-shadow: 0 0 15px var(--electric-light-color); }
  .pricing-header { display: flex; flex-direction: column; align-items: flex-start; gap: 20px; margin-bottom: 30px; }
  .plan-icon { width: 48px; height: 48px; }
  .plan-name { font-family: var(--font-head); font-size: clamp(1.5rem, 2.2vw, 2.5rem); font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: white; line-height: 1.1; word-break: break-word; }
  .pricing-card.free .plan-name { color: #5C9FC5; }
  .standard-electric-content .plan-name { color: #5277C1; text-shadow: 0 0 8px rgba(82, 119, 193, 0.4); }
  .electric-content .plan-name { color: #35DF86; text-shadow: 0 0 10px rgba(53, 223, 134, 0.5); }
  .price-block { margin-bottom: 30px; padding-bottom: 30px; border-bottom: 1px solid rgba(255,255,255,0.05); width: 100%; }
  .price-value { font-family: var(--font-head); font-size: 3.5rem; font-weight: 700; color: white; display: flex; align-items: baseline; gap: 5px; }
  .currency { font-size: 1.5rem; font-family: var(--font-head); font-weight: 600; color: #9ca3af; }
  .features-list { list-style: none; padding: 0; margin: 0 0 40px 0; display: flex; flex-direction: column; gap: 16px; flex-grow: 1; }
  .feature-item { display: flex; align-items: flex-start; gap: 12px; font-size: 1.1rem; line-height: 1.4; color: #e5e7eb; }
  .feature-item.disabled { color: #4b5563; text-decoration: line-through; opacity: 0.6; }
  .pricing-btn { width: 100%; padding: 20px; border-radius: 12px; font-weight: 700; font-size: 1.1rem; cursor: pointer; border: none; transition: all 0.2s; text-transform: uppercase; letter-spacing: 1px; margin-top: auto; font-family: var(--font-head); }
  .pricing-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,0.2); }
  .pricing-btn:active, .pricing-btn.click-anim { transform: scale(0.95); }
  .pricing-btn.dark { background-color: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.1); }
  .pricing-btn.dark:hover { background-color: white; color: black; }
  .pricing-btn.star-btn { background: var(--star-border-color); color: black; box-shadow: 0 0 10px var(--star-light-color); }
  .pricing-btn.star-btn:hover { background: #52CBC4; box-shadow: 0 0 20px var(--star-light-color); }
  .pricing-btn.electric-btn { background: var(--electric-border-color); color: black; box-shadow: 0 0 15px var(--electric-light-color); }
  .pricing-btn.electric-btn:hover { background: #52CBC4; box-shadow: 0 0 25px var(--electric-light-color); }

  @media (max-width: 1024px) {
    .pricing-card.electric { grid-column: span 2; }
    .new-comp-grid { grid-template-columns: repeat(2, 1fr); }
    .bento-header-card { grid-column: span 2; }
    .apple-carousel-wrapper { height: 500px; }
    .carousel-card-item { width: 75%; }
  }

  @media (max-width: 768px) {
    .content-wrapper { gap: 40px !important; }
    .hero-title { font-size: clamp(3rem, 13vw, 6rem) !important; }
    .hero-subtitle { font-size: clamp(1rem, 4vw, 1.5rem) !important; padding: 0 10px; }
    .clapper-btn-wrapper { transform: scale(0.9); }
    .comp-grid { grid-template-columns: 1fr; }
    .new-comp-grid { grid-template-columns: 1fr; }
    .bento-header-card { grid-column: span 1; }
    .new-comp-card { height: 500px; } 
    .features-grid { grid-template-columns: 1fr; }
    .partners-scene { perspective: 800px; height: 250px; }
    .partners-rotor { width: 200px; height: 100px; }
    .pricing-grid { grid-template-columns: 1fr; }
    .pricing-card.electric { grid-column: span 1; }
    .scramble-text { font-size: clamp(1.5rem, 8vw, 2rem); }
    .apple-carousel-wrapper { height: 400px; }
    .carousel-card-item { width: 85%; }
  }

  @media (max-width: 380px) { .clapper-btn-wrapper { transform: scale(0.8); margin: -10px; } }

  .faq-container-box { width: 100%; max-width: 1600px; background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(11px); -webkit-backdrop-filter: blur(11px); border: 1px solid rgba(255, 255, 255, 0.3); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(255, 255, 255, 0.1), inset 0 0 2px 1px rgba(255, 255, 255, 0.1); border-radius: 32px; padding: 60px 20px; display: flex; flex-direction: column; align-items: center; position: relative; overflow: hidden; margin: 0 auto; }
  .faq-container-box::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent); pointer-events: none; }
  .faq-container-box::after { content: ''; position: absolute; top: 0; left: 0; width: 1px; height: 100%; background: linear-gradient(180deg, rgba(255, 255, 255, 0.8), transparent, rgba(255, 255, 255, 0.3)); pointer-events: none; }
`;

// --- COMPONENTS ---

// 1. КОМПОНЕНТ САЙДБАРА
const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { label: "ПОЧЕМУ МЫ", id: "comparison", icon: Star },
    { label: "ВОЗМОЖНОСТИ", id: "features", icon: Zap },
    { label: "ПАРТНЕРЫ", id: "partners", icon: Users },
    { label: "ТАРИФЫ АКТЕРОВ", id: "pricing", icon: Smile },
    { label: "FAQ", id: "faq", icon: MessageCircle },
    { label: "ФУНКЦИИ", id: "key-features", icon: Cpu },
    { label: "БИЗНЕС ТАРИФЫ", id: "business-pricing", icon: Briefcase },
  ];

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      onClose(); // Закрываем меню при клике
      if (window.lenis) {
        window.lenis.scrollTo(element);
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Затемнение фона */}
      <div
        className={`sidebar-overlay ${isOpen ? 'visible' : ''}`}
        onClick={onClose}
      />

      <aside className={`custom-sidebar ${isOpen ? 'open' : 'closed'}`}>
        <button className="sidebar-close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <nav className="sidebar-menu">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="sidebar-link"
              onClick={() => handleScrollTo(item.id)}
            >
              <item.icon className="menu-icon" size={20} color="#35DF86" />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};

// 2. КНОПКА ОТКРЫТИЯ МЕНЮ (Fixed with Gradient Text & Shine Effect)
const MenuToggle = ({ onOpen }) => {
  return (
    <button className="menu-toggle-btn" onClick={onOpen}>
      <span className="menu-text-gradient">menu</span>
    </button>
  );
};

const ClapperButton = ({ text, onClick, icon: Icon, color = "white" }) => {
  const [isClapping, setIsClapping] = useState(false);
  const handleClick = () => {
    if (isClapping) return;
    setIsClapping(true);
    if (onClick) onClick();
    setTimeout(() => { setIsClapping(false); }, 250);
  };

  return (
    <button
      onClick={handleClick}
      className={`clapper-btn-wrapper ${isClapping ? "is-clapping" : ""}`}
      aria-label={text}
    >
      <div className="clapper-container">
        <div
          className="clapper-top glass-clapper-style"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, ${color} 0, ${color} 12px, transparent 12px, transparent 24px)`
          }}
        />
        <div className="clapper-bottom glass-clapper-style">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: color, fontFamily: "var(--font-head)", fontSize: "24px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1.5px", textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
            {Icon && <Icon size={24} />} {text}
          </div>
        </div>
      </div>
    </button>
  );
};

const HeroSection = () => {
  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      if (window.lenis) window.lenis.scrollTo(element);
      else element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const casterTitleStyle = {
    fontFamily: "'AlroCustom', sans-serif",
    fontWeight: "400",
    textTransform: "none",
    lineHeight: "1",
    color: "white",
    cursor: "default",
    position: "absolute",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 20
  };

  const glossySubtitleStyle = {
    fontFamily: "'AlroCustom', sans-serif",
    fontWeight: "400",
    textTransform: "none",
    lineHeight: "1.1",
    color: "transparent",
    background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.4) 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextStroke: "1px rgba(255, 255, 255, 0.6)",
    filter: "drop-shadow(0 0 15px rgba(53, 223, 134, 0.2)) drop-shadow(0 0 5px rgba(255,255,255,0.3))",
    cursor: "default",
    letterSpacing: "1px"
  };

  return (
    <div id="hero" className="hero-container" style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <video src={VIDEO_PATH} poster={POSTER_IMAGE} autoPlay muted loop playsInline style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.3))", zIndex: 1 }} />
      <div className="hero-content" style={{ position: "relative", zIndex: 2, width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0px", textAlign: "center" }}>
        <h1 className="hero-title" style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)", ...casterTitleStyle }}>caster</h1>
        <div className="content-wrapper" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2 className="hero-subtitle" style={{ fontSize: "clamp(3rem, 8vw, 6rem)", margin: 0, marginTop: "0px", ...glossySubtitleStyle }}>All castings in one place with AI</h2>
          <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", justifyContent: "center", paddingTop: "0px", width: "100%" }}>
            <ClapperButton text="Business" color="#ffffff" onClick={() => handleScrollTo('key-features')} />
            <ClapperButton text="Actors" color="#ffffff" onClick={() => handleScrollTo('comparison')} />
          </div>
        </div>
      </div>
    </div>
  );
};

const GridBackgroundWrapper = ({ children }) => {
  const containerRef = useRef(null);
  const cellsRef = useRef([]);
  const lastIndexRef = useRef(-1);
  const [gridDimensions, setGridDimensions] = useState({ rows: 0, cols: 0 });

  useEffect(() => {
    const calculateGrid = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      const cols = Math.ceil(width / GRID_SIZE);
      const rows = Math.ceil(height / GRID_SIZE);
      setGridDimensions({ rows, cols });
    };
    calculateGrid();
    window.addEventListener('resize', calculateGrid);
    return () => window.removeEventListener('resize', calculateGrid);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const col = Math.floor(x / GRID_SIZE);
    const row = Math.floor(y / GRID_SIZE);
    if (col < 0 || col >= gridDimensions.cols || row < 0 || row >= gridDimensions.rows) return;
    const index = row * gridDimensions.cols + col;
    const cell = cellsRef.current[index];
    if (index !== lastIndexRef.current) {
      if (lastIndexRef.current !== -1 && cellsRef.current[lastIndexRef.current]) {
        const prevCell = cellsRef.current[lastIndexRef.current];
        prevCell.style.opacity = 0;
        prevCell.classList.remove('active');
      }
      if (cell) {
        cell.style.opacity = 1;
        cell.classList.add('active');
      }
      lastIndexRef.current = index;
    }
  };

  const handleMouseLeave = () => {
    if (lastIndexRef.current !== -1 && cellsRef.current[lastIndexRef.current]) {
      const prevCell = cellsRef.current[lastIndexRef.current];
      prevCell.style.opacity = 0;
      prevCell.classList.remove('active');
      lastIndexRef.current = -1;
    }
  };

  const cells = Array.from({ length: gridDimensions.rows * gridDimensions.cols });

  return (
    <div ref={containerRef} className="grid-wrapper" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="grid-lines" />
      <div className="grid-cells-container" style={{ display: 'grid', gridTemplateColumns: `repeat(${gridDimensions.cols}, ${GRID_SIZE}px)` }}>
        {cells.map((_, i) => <div key={i} ref={el => cellsRef.current[i] = el} className="grid-cell" />)}
      </div>
      <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
    </div>
  );
};

const ComparisonCard = ({ item }) => {
  return (
    <div className="new-comp-card">
      <div className="comp-video-container">
        <video className="comp-video" autoPlay muted loop playsInline poster={item.poster}>
          <source src={item.video} type="video/webm" />
        </video>
      </div>
      <h3 className="comp-card-title">{item.title}</h3>
      <div className="comp-text-block"></div>
    </div>
  );
};

const NewComparisonSection = () => {
  const comparisonData = [
    { title: "Не тратят время на поиск кастингов — они приходят сами", desc: "", video: "/videos/video_test.webm", poster: "/logo/casterlogo.jpg" },
    { title: "Быстрее откликаются других", desc: "", video: "/videos/video_test.webm", poster: "/logo/casterlogo.jpg" },
    { title: "Зарабатывают больше денег", desc: "", video: "/videos/video_test.webm", poster: "/logo/casterlogo.jpg" },
    { title: "Не пропускают ни один кастинг", desc: "", video: "/videos/video_test.webm", poster: "/logo/casterlogo.jpg" },
    { title: "Получают больше ролей", desc: "", video: "/videos/video_test.webm", poster: "/logo/casterlogo.jpg" },
    { title: "Не сидят в 20-ти разных WA/TG чатах — только в одном месте", desc: "", video: "/videos/video_test.webm", poster: "/logo/casterlogo.jpg" }
  ];

  return (
    <section id="comparison" className="section-container comparison-section">
      <div className="new-comp-grid">
        <div className="bento-header-card">
          <h2 className="section-title" style={{ margin: 0, lineHeight: 1.1 }}>
            <span style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", display: "block", marginBottom: "10px" }}>ПОЧЕМУ ВЫБИРАЮТ</span>
            <span style={{ fontSize: "clamp(3rem, 6vw, 6rem)", fontFamily: "'AlroCustom', sans-serif", textTransform: "none", fontWeight: "400", background: "linear-gradient(90deg, #4ade80 0%, #60a5fa 50%, #35DF86 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "block" }}>caster ai</span>
          </h2>
        </div>
        {comparisonData.map((item, index) => <ComparisonCard key={index} item={item} />)}
      </div>
    </section>
  );
};

const KeyFeaturesSection = () => {
  const featuresData = [
    { title: "Общайся внутри платформы с актерами не засоряя ватсап и телеграм", video: "/videos/video_test.webm", poster: "/logo/casterlogo.jpg" },
    { title: "Загружай выборку сразу в объявление", video: "/videos/video_test.webm", poster: "/logo/casterlogo.jpg" },
    { title: "Смотри пробы как в тиндере", video: "/videos/video_test.webm", poster: "/logo/casterlogo.jpg" },
    { title: "Сохраняй в любимчиков", video: "/videos/video_test.webm", poster: "/logo/casterlogo.jpg" },
    { title: "Отправляй кастинг в 1 клик", video: "/videos/video_test.webm", poster: "/logo/casterlogo.jpg" },
    { title: "2000+ актеров в базе", video: "/videos/video_test.webm", poster: "/logo/casterlogo.jpg" },
    { title: "Персональная рекомендация актеров с помощью ИИ", video: "/videos/video_test.webm", poster: "/logo/casterlogo.jpg" },
    { title: "KYA - know your actor. Просматривайте данные, опыт и отзывы о актере", video: "/videos/video_test.webm", poster: "/logo/casterlogo.jpg" }
  ];

  return (
    <section id="key-features" className="section-container comparison-section">
      <div className="new-comp-grid">
        <div className="bento-header-card">
          <h2 className="section-title" style={{ margin: 0, lineHeight: 1.1 }}>
            <span style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontFamily: "var(--font-head)", color: "white", display: "block", marginBottom: "10px" }}>КЛЮЧЕВЫЕ ФУНКЦИИ</span>
            <span style={{ fontSize: "clamp(3rem, 6vw, 6rem)", fontFamily: "'AlroCustom', sans-serif", textTransform: "none", fontWeight: "400", background: "linear-gradient(90deg, #4ade80 0%, #60a5fa 50%, #35DF86 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "block" }}>caster ai</span>
          </h2>
        </div>
        {featuresData.map((item, index) => <ComparisonCard key={index} item={item} />)}
      </div>
    </section>
  );
};

const AppleCarousel = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef(null);
  const videoRefs = useRef([]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => { setActiveIndex((prev) => (prev + 1) % items.length); }, 5000);
  }, [items.length]);

  useEffect(() => { startTimer(); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, [startTimer]);
  const handleManualChange = (index) => { setActiveIndex(index); startTimer(); };

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeIndex) { const playPromise = video.play(); if (playPromise !== undefined) playPromise.catch(() => { }); }
      else video.pause();
    });
  }, [activeIndex]);

  return (
    <div className="apple-slider-container">
      <div className="apple-slider-track">
        {items.map((item, index) => {
          let circularDistance = (index - activeIndex + items.length) % items.length;
          if (circularDistance > items.length / 2) circularDistance -= items.length;
          let style = { transform: `translateX(${circularDistance * 55}%) scale(0.7)`, zIndex: 1, opacity: 0.2, pointerEvents: 'none', filter: 'brightness(0.3)', transition: 'all 0.6s cubic-bezier(0.19, 1, 0.22, 1)' };
          if (circularDistance === 0) style = { transform: 'translateX(0) scale(1)', zIndex: 10, opacity: 1, pointerEvents: 'auto', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)', filter: 'brightness(1)', transition: 'all 0.6s cubic-bezier(0.19, 1, 0.22, 1)' };
          else if (circularDistance === 1 || circularDistance === -1) style = { transform: `translateX(${circularDistance * 65}%) scale(0.85)`, zIndex: 5, opacity: 0.5, pointerEvents: 'auto', filter: 'brightness(0.5)', transition: 'all 0.6s cubic-bezier(0.19, 1, 0.22, 1)' };
          else if (Math.abs(circularDistance) >= 2) style.opacity = 0;

          return (
            <div key={index} className={`apple-slide-item ${index === activeIndex ? 'active' : ''}`} style={style} onClick={() => handleManualChange(index)}>
              <video ref={el => videoRefs.current[index] = el} src={item.src} className="apple-slide-media" muted loop playsInline />
              <div className="apple-slide-content">
                <h3 className="apple-slide-title">{item.title}</h3>
              </div>
            </div>
          );
        })}
      </div>
      <div className="nav-dots-wrapper">
        {items.map((_, i) => <div key={i} className={`nav-dot ${i === activeIndex ? 'active' : ''}`} onClick={() => handleManualChange(i)} />)}
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    { type: 'video', src: '/videos/film.webm', title: "Заявка в 1 клик" },
    { type: 'video', src: '/videos/film.webm', title: "Все кастинги в одном месте" },
    { type: 'video', src: '/videos/film.webm', title: "Читает текст с фото" },
    { type: 'video', src: '/videos/film.webm', title: "Идеальный порядок" },
    { type: 'video', src: '/videos/film.webm', title: "Персональный фильтр" },
    { type: 'video', src: '/videos/film.webm', title: "Без мусора" }
  ];

  return (
    <section id="features" className="section-container" style={{ overflow: 'hidden', paddingTop: '0px' }}>
      <div className="features-header-card">
        <h2 className="section-title" style={{ margin: 0, lineHeight: 1.1 }}>
          <span style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", display: "block", marginBottom: "10px" }}>ВОЗМОЖНОСТИ</span>
          <span style={{ fontSize: "clamp(3rem, 6vw, 6rem)", fontFamily: "'AlroCustom', sans-serif", textTransform: "none", fontWeight: "400", background: "linear-gradient(90deg, #4ade80 0%, #60a5fa 50%, #35DF86 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "block" }}>caster ai</span>
        </h2>
      </div>
      <AppleCarousel items={features} />
    </section>
  );
};

class TextScramble {
  constructor(el) { this.el = el; this.chars = '!<>-_\\/[]{}—=+*^?#________'; this.update = this.update.bind(this); }
  setText(newText) {
    const oldText = this.el.innerText; const length = Math.max(oldText.length, newText.length); const promise = new Promise((resolve) => this.resolve = resolve);
    this.queue = []; for (let i = 0; i < length; i++) { const from = oldText[i] || ''; const to = newText[i] || ''; const start = Math.floor(Math.random() * 25); const end = start + Math.floor(Math.random() * 25); this.queue.push({ from, to, start, end }); }
    cancelAnimationFrame(this.frameRequest); this.frame = 0; this.update(); return promise;
  }
  update() {
    let output = ''; let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) { complete++; output += to; } else if (this.frame >= start) { if (!char || Math.random() < 0.28) { char = this.randomChar(); this.queue[i].char = char; } output += `<span class="dud">${char}</span>`; } else { output += from; }
    }
    this.el.innerHTML = output; if (complete === this.queue.length) { this.resolve(); } else { this.frameRequest = requestAnimationFrame(this.update); this.frame++; }
  }
  randomChar() { return this.chars[Math.floor(Math.random() * this.chars.length)]; }
}

const ScrambleTextComponent = ({ defaultText, hoverText, className }) => {
  const textRef = useRef(null); const scramblerRef = useRef(null);
  useEffect(() => { if (textRef.current) scramblerRef.current = new TextScramble(textRef.current); }, []);
  const handleMouseEnter = () => { if (scramblerRef.current) scramblerRef.current.setText(hoverText); };
  const handleMouseLeave = () => { if (scramblerRef.current) scramblerRef.current.setText(defaultText); };
  return <div style={{ marginBottom: '60px', textAlign: 'center' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}><h2 className={className} ref={textRef}>{defaultText}</h2></div>;
};

const PartnersSection = () => {
  const partners = [
    { src: "/partners/kazakfilm.png", link: "https://kazakhfilm.kz/main", alt: "Kazakhfilm" },
    { src: "/partners/kinopoisk.png", link: "https://hd.kinopoisk.ru/ru-kz", alt: "Kinopoisk" },
    { src: "/partners/netflix.png", link: "https://www.netflix.com/kz-ru/", alt: "Netflix" },
    { src: "/partners/okko.png", link: "https://okko.tv/", alt: "Okko" },
    { src: "/partners/salem.png", link: "https://salementertainment.kz/", alt: "Salem Social Media" },
    { src: "/partners/start.png", link: "https://start.ru/", alt: "START" },
    { src: "/partners/tiger.png", link: "https://www.instagram.com/tiger_films_kz/", alt: "Tiger Films" },
    { src: "/partners/unico.png", link: "https://unicoplay.com/ru", alt: "Unico Play" },
  ];

  return (
    <section id="partners" className="partners-section-wrapper">
      <div className="partners-container-box">
        <ScrambleTextComponent defaultText="НАШИ ПАРТНЕРЫ" hoverText="ЛИДЕРЫ РЫНКА" className="scramble-text" />
        <div className="partners-slider-container">
          <div className="partners-fade-overlay" />
          <div className="partners-slider">
            {partners.map((partner, i) => (
              <span key={i} style={{ '--i': i + 1 }}>
                <a href={partner.link} target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', height: '100%' }}>
                  <img
                    src={partner.src}
                    alt={partner.alt}
                    onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.style.border = '1px solid #555'; e.target.parentNode.innerText = partner.alt; }}
                  />
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ActionBtn = ({ initialText, className, changeText = false }) => {
  const [text, setText] = useState(initialText); const [isAnimating, setIsAnimating] = useState(false);
  const handleClick = () => { setIsAnimating(true); if (changeText) setText("ACTION!"); setTimeout(() => setIsAnimating(false), 200); };
  return <button className={`${className} ${isAnimating ? "click-anim" : ""}`} onClick={handleClick}>{text}</button>;
};

// PricingSection теперь принимает ID
const PricingSection = ({ id }) => {
  return (
    <section id={id} className="section-container" style={{ paddingBottom: '150px' }}>
      <ScrambleTextComponent defaultText="ПРОСТЫЕ ЦЕНЫ" hoverText="ЗВЕЗДНЫЕ ПРЕДЛОЖЕНИЯ" className="scramble-text" />
      <div className="pricing-grid">
        <div className="pricing-card free">
          <div className="pricing-header"><IconGift className="plan-icon" color="#5C9FC5" /><span className="plan-name">БАЗОВЫЙ</span></div>
          <div className="price-block"><div className="price-value">0 <span className="currency">₸</span></div></div>
          <ul className="features-list">
            <li className="feature-item"><div className="check-circle"><SmallCheck /></div>Размещение анкеты в базе</li>
            <li className="feature-item"><div className="check-circle"><SmallCheck /></div>Видимость для кастинг-директоров</li>
            <li className="feature-item disabled"><div className="check-circle"></div>Автоподбор кастингов</li>
            <li className="feature-item disabled"><div className="check-circle"></div>Уведомления в Telegram</li>
            <li className="feature-item disabled"><div className="check-circle"></div>Отклик в 1 клик</li>
          </ul>
          <ActionBtn initialText="СОЗДАТЬ АНКЕТУ" className="pricing-btn dark" changeText={false} />
        </div>
        <div className="pricing-card standard-electric">
          <div className="star-glow-bg"></div>
          <div className="standard-electric-content">
            <div className="pricing-header"><IconStar className="plan-icon" color="#5277C1" /><span className="plan-name">СТАНДАРТ</span></div>
            <div className="price-block"><div className="price-value">30 <span className="currency">₸</span></div><div className="price-period">первый месяц, далее 3 490 ₸/мес</div></div>
            <ul className="features-list">
              <li className="feature-item"><div className="check-circle"><SmallCheck color="#5277C1" /></div>Всё из тарифа «БАЗОВЫЙ»</li>
              <li className="feature-item"><div className="check-circle"><SmallCheck color="#5277C1" /></div>Сборка из 30+ WA/TG чатов</li>
              <li className="feature-item"><div className="check-circle"><SmallCheck color="#5277C1" /></div>Автоподбор по профилю</li>
              <li className="feature-item"><div className="check-circle"><SmallCheck color="#5277C1" /></div>Моментальные уведомления</li>
              <li className="feature-item"><div className="check-circle"><SmallCheck color="#5277C1" /></div>Отклик в 1 клик</li>
            </ul>
            <ActionBtn initialText="НАЧАТЬ СЕЙЧАС" className="pricing-btn star-btn" changeText={true} />
          </div>
        </div>
        <div className="pricing-card electric">
          <div className="background-glow"></div>
          <div className="overlay-1"></div>
          <div className="electric-content">
            <div className="badge-electric">Рекомендуем</div>
            <div className="pricing-header"><IconCrown className="plan-icon" color="#35DF86" /><span className="plan-name">ПРОФЕССИОНАЛ</span></div>
            <div className="price-block"><div className="price-value">30 <span className="currency">₸</span></div><div className="price-period">первый месяц, далее 4 490 ₸/мес</div></div>
            <ul className="features-list">
              <li className="feature-item"><div className="check-circle"><SmallCheck color="#35DF86" /></div>Всё из тарифа «СТАНДАРТ»</li>
              <li className="feature-item"><div className="check-circle"><SmallCheck color="#35DF86" /></div>Фильтр: массовка / роль / реклама</li>
              <li className="feature-item"><div className="check-circle"><SmallCheck color="#35DF86" /></div>Приоритетная поддержка</li>
              <li className="feature-item"><div className="check-circle"><SmallCheck color="#35DF86" /></div>Ранний доступ к новым функциям</li>
            </ul>
            <ActionBtn initialText="НАЧАТЬ СЕЙЧАС" className="pricing-btn electric-btn" changeText={true} />
            <div className="glow-layer-1"></div>
            <div className="glow-layer-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  const contentRef = useRef(null);
  return (
    <div className="faq-item" onClick={onClick} style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "24px 0", cursor: "pointer" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ fontFamily: "var(--font-head)", fontSize: "1.25rem", fontWeight: 600, color: isOpen ? "#35DF86" : "white", margin: 0, transition: "color 0.3s" }}>{question}</h3>
        <div style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)", color: isOpen ? "#35DF86" : "white" }}><IconPlus /></div>
      </div>
      <div style={{ maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px", overflow: "hidden", transition: "max-height 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)", opacity: isOpen ? 1 : 0.5 }} ref={contentRef}>
        <p style={{ marginTop: "16px", marginBottom: 0, color: "#9ca3af", lineHeight: 1.6, fontSize: "1rem" }}>{answer}</p>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const faqs = [
    { question: "Как работает Caster AI?", answer: "Наш ИИ непрерывно сканирует более 20 проверенных источников..." },
    { question: "Подходит ли это для начинающих актеров?", answer: "Абсолютно! На платформе есть много кастингов..." },
    { question: "Как отменить подписку?", answer: "Вы можете отменить подписку в любой момент..." },
    { question: "Есть ли бесплатный пробный период?", answer: "Да, у нас есть бесплатный тариф «БАЗОВЫЙ»..." },
    { question: "Какие данные нужны для регистрации?", answer: "Вам понадобятся ваши актуальные фото..." }
  ];
  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? -1 : index);

  return (
    <section id="faq" className="section-container" style={{ paddingBottom: "100px" }}>
      <div className="faq-container-box">
        <ScrambleTextComponent defaultText="FAQ" hoverText="ВОПРОСЫ?" className="scramble-text" />
        <div style={{ maxWidth: "1000px", width: "100%", padding: "0 20px" }}>
          {faqs.map((faq, index) => <FAQItem key={index} question={faq.question} answer={faq.answer} isOpen={openIndex === index} onClick={() => toggleFAQ(index)} />)}
        </div>
      </div>
    </section>
  );
};

/* --- FOOTER COMPONENT --- */
const Footer = () => {
  return (
    <footer style={{ backgroundColor: "black", padding: "80px 20px 40px", borderTop: "1px solid rgba(255,255,255,0.05)", textAlign: "center", position: "relative", zIndex: 10 }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "30px" }}>
        <div style={{ display: "flex", gap: "30px", flexWrap: "wrap", justifyContent: "center" }}>
          <a href="#" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "0.9rem", transition: "color 0.3s" }}>Публичная оферта</a>
          <span style={{ color: "#333" }}>•</span>
          <a href="#" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "0.9rem", transition: "color 0.3s" }}>Политика конфиденциальности</a>
          <span style={{ color: "#333" }}>•</span>
          <a href="#" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "0.9rem", transition: "color 0.3s" }}>Поддержка</a>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", color: "#6b7280", fontSize: "0.85rem" }}>
          <div>ИП Телманов Дархан — ИИН 041124500027</div>
          <div>Казахстан, г. Астана, ул. 117, 41</div>
        </div>
        <div style={{ color: "#4b5563", fontSize: "0.8rem" }}>© 2024 Caster AI. Все права защищены.</div>
      </div>
    </footer>
  )
}

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js";
    script.async = true;
    script.onload = () => {
      const lenis = new window.Lenis({ duration: 3.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), direction: 'vertical', gestureDirection: 'vertical', smooth: true, mouseMultiplier: 0.8, smoothTouch: false, touchMultiplier: 2 });
      window.lenis = lenis;
      function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
      requestAnimationFrame(raf);
    };
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  return (
    <>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}><defs><filter id="turbulent-displace" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" /><feDisplacementMap in="SourceGraphic" in2="noise" scale="10" /></filter></defs></svg>
      <style>{globalStyles}</style>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <MenuToggle onOpen={() => setIsSidebarOpen(true)} />
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <HeroSection />
        <GridBackgroundWrapper>
          <NewComparisonSection />
          <FeaturesSection />
          <PartnersSection />
          <PricingSection id="pricing" />
          <FAQSection />
          <KeyFeaturesSection />
          <PricingSection id="business-pricing" />
        </GridBackgroundWrapper>
        <Footer />
      </div>
    </>
  );
}