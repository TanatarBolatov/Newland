import React, { useRef, useEffect, useState } from "react";

// --- КОНФИГУРАЦИЯ ---
const VIDEO_PATH = "/studio-bg.webm";
const POSTER_IMAGE = "https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=1920&auto=format&fit=crop";

// Ссылки на картинки печатей
const STAMP_APPROVED_URL = "/stamps/approved.png";
const STAMP_REJECTED_URL = "/stamps/rejected.png";

// Размер ячейки сетки (в пикселях)
const GRID_SIZE = 60;

// --- ИКОНКИ (ICONS) ---
// Определяем все иконки в начале файла, чтобы они были доступны во всех компонентах

const CheckIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const CrossIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const SmallCheck = ({ color = "#22c55e" }) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;

// Иконки для фич
const IconTarget = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>;
const IconImage = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>;
const IconStars = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /><path d="M5 3v4" /><path d="M9 3v4" /><path d="M3 5h4" /><path d="M3 9h4" /></svg>;
const IconUser = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
const IconShield = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /></svg>;
const IconBolt = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></svg>;
const IconFilm = () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="2.18" ry="2.18" /><line x1="7" x2="7" y1="2" y2="22" /><line x1="17" x2="17" y1="2" y2="22" /><line x1="2" x2="22" y1="12" y2="12" /><line x1="2" x2="7" y1="7" y2="7" /><line x1="2" x2="7" y1="17" y2="17" /><line x1="17" x2="22" y1="17" y2="17" /><line x1="17" x2="22" y1="7" y2="7" /></svg>;

// Иконки для прайсинга
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

// --- СТИЛИ (CSS IN JS) ---
const globalStyles = `
  /* --- ОБЩИЕ И СБРОС --- */
  * {
    box-sizing: border-box; 
  }

  /* Переменные для Electric Style */
  :root {
    /* PRO (Superstar) - Orange/Neon */
    --electric-border-color: #dd8448;
    --electric-light-color: rgba(221, 132, 72, 0.8); 
    --gradient-color: rgba(221, 132, 72, 0.4);

    /* STANDARD (Star) - Blue/Neon (Softer) */
    --star-border-color: #4ea8de;
    --star-light-color: rgba(78, 168, 222, 0.5); 
    --star-gradient-color: rgba(78, 168, 222, 0.3);

    --color-neutral-900: #050507;
  }

  body {
    background-color: black;
    margin: 0;
    font-family: sans-serif;
    color: white;
  }

  /* --- HERO SECTION --- */
  .hero-container {
    padding: 20px;
    gap: 30px;
  }

  .content-wrapper {
    gap: 80px;
    width: 100%;
    max-width: 800px;
  }

  .clapper-btn-svg {
    width: 200px;
    height: 150px;
  }

  .clapper-top-group {
    transform-origin: 5px 30px;
    transform: rotate(0deg);
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    will-change: transform;
  }

  @media (hover: hover) {
    .clapper-btn-wrapper:hover .clapper-top-group {
      transform: rotate(-15deg);
    }
  }

  .clapper-btn-wrapper.is-clapping .clapper-top-group {
    animation: clap-effect 0.2s forwards;
    transition: none; 
  }

  @keyframes clap-effect {
    0% { transform: rotate(-20deg); }
    40% { transform: rotate(0deg); }
    100% { transform: rotate(0deg); }
  }

  /* --- GRID BACKGROUND WRAPPER (TRAIL EFFECT) --- */
  .grid-wrapper {
    position: relative;
    width: 100%;
    background-color: #020202; 
    overflow: hidden;
  }

  .grid-lines {
    position: absolute;
    inset: 0;
    z-index: 1; 
    background-size: ${GRID_SIZE}px ${GRID_SIZE}px;
    background-image:
      linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    pointer-events: none;
  }

  .grid-cells-container {
    position: absolute;
    top: 0; left: 0;
    z-index: 0; 
    pointer-events: none; 
  }

  .grid-cell {
    width: ${GRID_SIZE}px;
    height: ${GRID_SIZE}px;
    background-color: rgba(34, 197, 94, 0.15);
    opacity: 0; 
    transition: opacity 1s ease;
  }

  .grid-cell.active {
    opacity: 1;
    transition: opacity 0s;
    background-color: rgba(34, 197, 94, 0.3); 
    box-shadow: 0 0 10px rgba(34, 197, 94, 0.2);
  }

  /* --- SECTIONS COMMON --- */
  .section-container {
    position: relative;
    z-index: 2;
    padding: 100px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: transparent; 
  }

  .section-title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 700;
    text-align: center;
    margin-bottom: 15px;
    line-height: 1.1;
  }

  .section-subtitle {
    font-size: clamp(1rem, 2vw, 1.2rem);
    color: #9ca3af;
    text-align: center;
    margin-bottom: 60px;
    max-width: 600px;
    line-height: 1.5;
  }

  /* --- COMPARISON SECTION --- */
  .comp-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    max-width: 1000px;
    width: 100%;
  }

  .comp-card {
    border-radius: 24px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    transition: transform 0.3s ease;
    position: relative;
    overflow: hidden;
    background-color: #050507; 
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5);
  }
  
  .comp-card:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 255, 255, 0.15);
  }

  .comp-card.negative {
    background: radial-gradient(circle at top center, rgba(220, 38, 38, 0.08) 0%, rgba(5, 5, 7, 0) 70%), #050507;
  }
  .comp-card.negative h3 { color: #ef4444; font-size: 1.5rem; margin: 0 0 10px 0; }

  .comp-card.positive {
    background: radial-gradient(circle at top center, rgba(59, 130, 246, 0.12) 0%, rgba(5, 5, 7, 0) 70%), #050507;
    border-color: rgba(59, 130, 246, 0.2);
  }
  .comp-card.positive h3 { color: #3b82f6; font-size: 1.5rem; margin: 0 0 10px 0; }

  .list-item {
    display: flex;
    align-items: flex-start;
    gap: 15px;
    font-size: 1.1rem;
    line-height: 1.5;
    color: #d1d5db;
  }

  /* --- STAMP EFFECT --- */
  .stamp-effect {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 250px; 
    height: auto;
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    pointer-events: none; 
    z-index: 10;
  }

  .stamp-approved {
    transform: translate(-50%, -50%) scale(3) rotate(-30deg);
  }
  .comp-card.positive:hover .stamp-approved {
    opacity: 0.9;
    transform: translate(-50%, -50%) scale(1) rotate(-15deg);
  }

  .stamp-rejected {
    transform: translate(-50%, -50%) scale(3) rotate(30deg);
  }
  .comp-card.negative:hover .stamp-rejected {
    opacity: 0.9;
    transform: translate(-50%, -50%) scale(1) rotate(15deg);
  }

  /* --- FEATURES SECTION --- */
  .features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr); 
    gap: 24px;
    max-width: 1200px;
    width: 100%;
  }

  .feat-card {
    background-color: #0a0a0a; 
    border: 1px solid rgba(34, 197, 94, 0.15); 
    border-radius: 20px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    background: radial-gradient(circle at top left, rgba(34, 197, 94, 0.12) 0%, rgba(0, 0, 0, 0) 60%), #0a0a0a;
    z-index: 1; 
  }

  .feat-card:hover {
    transform: translateY(-5px);
    border-color: rgba(34, 197, 94, 0.4); 
    box-shadow: 0 10px 30px -10px rgba(34, 197, 94, 0.2); 
  }

  .feat-icon-wrapper {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background-color: rgba(34, 197, 94, 0.1); 
    color: #22c55e; 
    margin-bottom: 10px;
  }

  .feat-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: white;
    margin: 0;
  }

  .feat-desc {
    font-size: 0.95rem;
    line-height: 1.5;
    color: #9ca3af; 
    margin: 0;
  }

  /* --- SCRAMBLE TITLE STYLE --- */
  .scramble-text {
    font-family: Impact, sans-serif; 
    font-weight: 400;
    text-transform: uppercase;
    color: white;
    cursor: default;
    font-size: clamp(2.5rem, 6vw, 4rem);
    letter-spacing: 1px;
  }
  
  .dud {
    color: #555; 
    opacity: 0.7;
  }

  /* --- PARTNERS 3D CAROUSEL --- */
  .partners-section-wrapper {
    width: 100%;
    display: flex;
    justify-content: center; 
    padding: 100px 20px;
    position: relative;
    z-index: 2;
  }

  .partners-container-box {
    width: 100%;
    max-width: 1200px; 
    background-color: #050507; 
    border: none;
    border-radius: 32px;
    padding: 60px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 20px 50px rgba(0,0,0,0.7); 
    position: relative;
    overflow: hidden; 
  }

  .partners-scene {
    perspective: 1200px; 
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    overflow: visible;
    position: relative;
  }

  .partners-rotor {
    width: 300px;
    height: 140px;
    position: relative;
    transform-style: preserve-3d; 
    animation: rotor-spin 30s linear infinite; 
  }

  .partner-card-3d {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    box-shadow: none;
    backdrop-filter: none;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: visible;
    padding: 10px;
    cursor: pointer; 
    transition: transform 0.3s ease;
    text-decoration: none;
  }
  
  .partner-card-3d img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    opacity: 1; 
    transition: all 0.3s ease;
    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.5));
  }

  .partner-card-3d:hover {
    transform: scale(1.1); 
  }
  
  @keyframes rotor-spin {
    from { transform: rotateY(0deg); }
    to { transform: rotateY(360deg); }
  }

  .partners-fade-overlay {
    position: absolute;
    top: 0; bottom: 0; left: 0; right: 0;
    pointer-events: none;
    background: linear-gradient(to right, #050507 0%, transparent 15%, transparent 85%, #050507 100%);
    z-index: 5;
  }

  /* --- PRICING SECTION --- */
  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    max-width: 1200px;
    width: 100%;
    margin-top: 20px;
    align-items: stretch;
  }

  .pricing-card {
    background-color: #050507;
    border-radius: 30px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5);
    transition: transform 0.3s ease, border-color 0.3s ease;
    padding: 40px 30px;
    height: 100%; 
  }

  .pricing-card:hover {
    transform: translateY(-8px);
    border-color: rgba(255, 255, 255, 0.2);
  }

  .pricing-card.free {
    background: radial-gradient(circle at top center, rgba(139, 140, 255, 0.15) 0%, rgba(5, 5, 7, 0) 60%), #050507;
  }
  
  .pricing-card.electric {
    background: transparent; 
    border: none;
    box-shadow: none;
    padding: 2px; 
    border-radius: 24px;
    overflow: visible; 
    height: 100%; 
    
    background: linear-gradient(
      -30deg,
      var(--gradient-color),
      transparent,
      var(--gradient-color)
    ),
    linear-gradient(to bottom, var(--color-neutral-900), var(--color-neutral-900));
  }

  .electric-content {
    background-color: var(--color-neutral-900);
    border-radius: 24px;
    height: 100%; 
    display: flex;
    flex-direction: column;
    padding: 40px 30px;
    position: relative;
    z-index: 2; 
    border: 2px solid var(--electric-border-color);
  }

  .glow-layer-1 {
    position: absolute;
    inset: 0;
    border-radius: 24px;
    border: 2px solid rgba(221, 132, 72, 0.6);
    filter: blur(1px);
    z-index: 1;
    pointer-events: none;
  }

  .glow-layer-2 {
    position: absolute;
    inset: 0;
    border-radius: 24px;
    border: 2px solid var(--electric-light-color);
    filter: blur(4px);
    z-index: 1;
    pointer-events: none;
  }

  .background-glow {
    position: absolute;
    inset: 0;
    border-radius: 24px;
    background: linear-gradient(
      -30deg,
      var(--electric-light-color),
      transparent,
      var(--electric-border-color)
    );
    filter: blur(32px);
    opacity: 0.3;
    transform: scale(1.1);
    z-index: 0;
    pointer-events: none;
  }

  .overlay-1 {
    position: absolute;
    inset: 0;
    border-radius: 24px;
    background: linear-gradient(-30deg, white, transparent 30%, transparent 70%, white);
    mix-blend-mode: overlay;
    opacity: 1;
    filter: blur(16px);
    z-index: 3;
    pointer-events: none;
  }

  .pricing-card.standard-electric {
    background: transparent;
    border: none;
    box-shadow: none;
    padding: 2px;
    border-radius: 24px;
    overflow: visible;
    height: 100%; 
    
    background: linear-gradient(
      -30deg,
      var(--star-gradient-color),
      transparent,
      var(--star-gradient-color)
    ),
    linear-gradient(to bottom, var(--color-neutral-900), var(--color-neutral-900));
  }

  .standard-electric-content {
    background-color: var(--color-neutral-900);
    border-radius: 24px;
    height: 100%; 
    display: flex;
    flex-direction: column;
    padding: 40px 30px;
    position: relative;
    z-index: 2;
    border: 1.5px solid var(--star-border-color); 
  }

  .star-glow-bg {
    position: absolute;
    inset: 0;
    border-radius: 24px;
    background: linear-gradient(-30deg, var(--star-light-color), transparent, var(--star-border-color));
    filter: blur(24px);
    opacity: 0.15; 
    transform: scale(1.05);
    z-index: 0;
    pointer-events: none;
  }
  
  .badge-electric {
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--electric-border-color);
    color: black;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
    z-index: 10;
    box-shadow: 0 0 15px var(--electric-light-color);
  }
  
  .pricing-header {
    display: flex;
    flex-direction: column;
    align-items: flex-start; 
    gap: 20px;
    margin-bottom: 30px;
  }

  .plan-icon {
    width: 48px;
    height: 48px;
  }

  .plan-name {
    font-family: Impact, sans-serif; 
    font-size: 2.5rem; 
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: white;
  }

  .pricing-card.free .plan-name { color: #a5a6ff; }
  
  .standard-electric-content .plan-name {
    color: #4ea8de;
    text-shadow: 0 0 8px rgba(78, 168, 222, 0.4);
  }

  .electric-content .plan-name { 
    color: #ffb782; 
    text-shadow: 0 0 10px rgba(221, 132, 72, 0.5);
  }

  .price-block {
    margin-bottom: 30px;
    padding-bottom: 30px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    width: 100%;
  }

  .price-value {
    font-family: Impact, sans-serif; 
    font-size: 3.5rem;
    color: white;
    display: flex;
    align-items: baseline;
    gap: 5px;
  }

  .currency {
    font-size: 1.5rem;
    font-family: sans-serif;
    font-weight: 600;
    color: #9ca3af;
  }

  .features-list {
    list-style: none;
    padding: 0;
    margin: 0 0 40px 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex-grow: 1;
  }

  .feature-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    font-size: 1.1rem; 
    line-height: 1.4;
    color: #e5e7eb;
  }

  .feature-item.disabled {
    color: #4b5563;
    text-decoration: line-through; 
    opacity: 0.6;
  }

  .pricing-btn {
    width: 100%;
    padding: 20px;
    border-radius: 12px; 
    font-weight: 700;
    font-size: 1.1rem;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: auto; 
  }

  .pricing-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  }
  
  .pricing-btn:active, .pricing-btn.click-anim {
    transform: scale(0.95);
  }

  .pricing-btn.dark {
    background-color: rgba(255,255,255,0.1);
    color: white;
    border: 1px solid rgba(255,255,255,0.1);
  }
  .pricing-btn.dark:hover {
    background-color: white;
    color: black;
  }

  .pricing-btn.star-btn {
    background: var(--star-border-color);
    color: black;
    box-shadow: 0 0 10px var(--star-light-color);
  }
  .pricing-btn.star-btn:hover {
    background: #69bded;
    box-shadow: 0 0 20px var(--star-light-color);
  }

  .pricing-btn.electric-btn {
    background: var(--electric-border-color);
    color: black;
    box-shadow: 0 0 15px var(--electric-light-color);
  }
  .pricing-btn.electric-btn:hover {
    background: #ffb782;
    box-shadow: 0 0 25px var(--electric-light-color);
  }

  /* --- АДАПТИВНОСТЬ --- */
  @media (max-width: 1024px) {
    .features-grid { grid-template-columns: repeat(2, 1fr); } 
    .pricing-grid { grid-template-columns: repeat(2, 1fr); }
    .pricing-card.electric { grid-column: span 2; } 
  }

  @media (max-width: 768px) {
    .content-wrapper { gap: 40px !important; }
    .hero-title { font-size: clamp(3rem, 13vw, 6rem) !important; }
    .hero-subtitle { font-size: clamp(1rem, 4vw, 1.5rem) !important; padding: 0 10px; }
    .clapper-btn-wrapper { transform: scale(0.9); }
    .comp-grid { grid-template-columns: 1fr; } 
    .comp-card { padding: 30px 20px; }
    .stamp-effect { width: 180px; }
    .features-grid { grid-template-columns: 1fr; } 
    
    .partners-scene { perspective: 800px; height: 250px; }
    .partners-rotor { width: 200px; height: 100px; } 

    .pricing-grid { grid-template-columns: 1fr; }
    .pricing-card.electric { grid-column: span 1; }
    
    .scramble-text { font-size: clamp(1.5rem, 8vw, 2rem); }
  }

  @media (max-width: 380px) {
    .clapper-btn-wrapper { transform: scale(0.8); margin: -10px; }
  }
`;

// --- КНОПКА HERO (Component) ---
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
      style={{ background: "transparent", border: "none", cursor: "pointer", padding: 0, outline: "none", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", WebkitTapHighlightColor: "transparent" }}
      aria-label={text}
    >
      <svg className="clapper-btn-svg" viewBox="0 -30 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
        <g className="clapper-top-group">
          <rect x="0" y="0" width="200" height="30" rx="4" fill={color} />
          <path d="M20 0L0 30H30L50 0H20Z" fill="#1a1a1a" />
          <path d="M70 0L40 30H70L100 0H70Z" fill="#1a1a1a" />
          <path d="M120 0L90 30H120L150 0H120Z" fill="#1a1a1a" />
          <path d="M170 0L140 30H170L200 0H170Z" fill="#1a1a1a" />
        </g>
        <g transform="translate(0, 34)">
          <rect width="200" height="80" rx="6" fill="rgba(0,0,0,0.6)" stroke={color} strokeWidth="2" />
          <rect width="200" height="10" rx="2" fill={color} />
          <path d="M20 0L0 10H30L50 0H20Z" fill="#1a1a1a" />
          <path d="M70 0L40 10H70L100 0H70Z" fill="#1a1a1a" />
          <path d="M120 0L90 10H120L150 0H120Z" fill="#1a1a1a" />
          <path d="M170 0L140 10H170L200 0H170Z" fill="#1a1a1a" />
          <foreignObject x="0" y="20" width="200" height="60">
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", color: color, fontFamily: "Impact, sans-serif", fontSize: "30px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1.5px" }}>
              {Icon && <Icon size={24} />} {text}
            </div>
          </foreignObject>
        </g>
      </svg>
    </button>
  );
};

// --- HERO SECTION (Component) ---
const HeroSection = () => {
  const h1WrapperRef = useRef(null);
  const h2WrapperRef = useRef(null);
  const targetGlobalPos = useRef({ x: -500, y: -500 });
  const currentGlobalPos = useRef({ x: -500, y: -500 });
  const isAnimating = useRef(true);

  useEffect(() => {
    let frameId;
    isAnimating.current = true;
    const animate = () => {
      if (!isAnimating.current) return;
      const ease = 0.12;
      const dx = targetGlobalPos.current.x - currentGlobalPos.current.x;
      const dy = targetGlobalPos.current.y - currentGlobalPos.current.y;
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        currentGlobalPos.current.x += dx * ease;
        currentGlobalPos.current.y += dy * ease;
        const globalX = currentGlobalPos.current.x;
        const globalY = currentGlobalPos.current.y;
        const updateCssVariables = (ref) => {
          if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            ref.current.style.setProperty("--x", `${globalX - rect.left}px`);
            ref.current.style.setProperty("--y", `${globalY - rect.top}px`);
          }
        };
        updateCssVariables(h1WrapperRef);
        updateCssVariables(h2WrapperRef);
      }
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => { isAnimating.current = false; cancelAnimationFrame(frameId); };
  }, []);

  const handleMouseMove = (e) => { targetGlobalPos.current.x = e.clientX; targetGlobalPos.current.y = e.clientY; };
  const handleMouseLeave = () => { targetGlobalPos.current.x = -500; targetGlobalPos.current.y = -500; };

  return (
    <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="hero-container" style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", backgroundColor: "black", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <video src={VIDEO_PATH} poster={POSTER_IMAGE} autoPlay muted loop playsInline style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0, willChange: "transform" }} />
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.3))", zIndex: 1 }} />
      <div className="hero-content" style={{ position: "relative", zIndex: 2, width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "30px", color: "white", textAlign: "center", fontFamily: "sans-serif" }}>
        <div ref={h1WrapperRef} style={{ position: "relative", display: "inline-block", "--x": "-500px", "--y": "-500px", willChange: "--x, --y" }}>
          <h1 className="hero-title" style={{ fontSize: "clamp(4rem, 15vw, 12rem)", fontWeight: "900", letterSpacing: "-0.02em", margin: 0, textTransform: "uppercase", textShadow: "0 4px 20px rgba(0,0,0,0.6)", lineHeight: "1", color: "white", position: "relative", zIndex: 1 }}>CASTER AI</h1>
          <h1 className="hero-title" style={{ fontSize: "clamp(4rem, 15vw, 12rem)", fontWeight: "900", letterSpacing: "-0.02em", margin: 0, textTransform: "uppercase", lineHeight: "1", position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 2, background: "linear-gradient(to right, #42d090, #4a77da)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", WebkitMaskImage: "radial-gradient(circle 180px at var(--x) var(--y), black 40%, transparent 70%)", maskImage: "radial-gradient(circle 180px at var(--x) var(--y), black 40%, transparent 70%)", willChange: "mask-image, -webkit-mask-image" }}>CASTER AI</h1>
        </div>
        <div className="content-wrapper" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div ref={h2WrapperRef} style={{ position: "relative", display: "inline-block", "--x": "-500px", "--y": "-500px", maxWidth: "90vw", willChange: "--x, --y" }}>
            <h2 className="hero-subtitle" style={{ fontSize: "clamp(1.2rem, 3vw, 2rem)", fontWeight: "400", color: "white", margin: 0, cursor: "default", position: "relative", zIndex: 1, letterSpacing: "1px" }}>All castings in one place with AI</h2>
            <h2 className="hero-subtitle" style={{ fontSize: "clamp(1.2rem, 3vw, 2rem)", fontWeight: "400", margin: 0, position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 2, letterSpacing: "1px", background: "linear-gradient(to right, #42d090, #4a77da)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", WebkitMaskImage: "radial-gradient(circle 120px at var(--x) var(--y), black 50%, transparent 10%)", maskImage: "radial-gradient(circle 120px at var(--x) var(--y), black 40%, transparent 70%)", willChange: "mask-image" }}>All castings in one place with AI</h2>
          </div>
          <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", justifyContent: "center", paddingTop: "0px", width: "100%" }}>
            <ClapperButton text="Business" color="#4a77da" onClick={() => console.log("Business Clicked")} />
            <ClapperButton text="Actors" color="#42d090" onClick={() => console.log("Actors Clicked")} />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- GRID BACKGROUND WRAPPER (TRAIL EFFECT) ---
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
    <div
      ref={containerRef}
      className="grid-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="grid-lines" />

      <div
        className="grid-cells-container"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridDimensions.cols}, ${GRID_SIZE}px)`
        }}
      >
        {cells.map((_, i) => (
          <div
            key={i}
            ref={el => cellsRef.current[i] = el}
            className="grid-cell"
          />
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
};

// --- COMPARISON SECTION ---
const ComparisonSection = () => {
  return (
    <section className="section-container comparison-section">
      <h2 className="section-title">
        Почему выбирают <span style={{ color: "#3b82f6" }}>Caster AI</span>
      </h2>
      <p className="section-subtitle">Разница, которую вы почувствуете с первого дня</p>

      <div className="comp-grid">
        <div className="comp-card negative">
          <img src={STAMP_REJECTED_URL} alt="Rejected" className="stamp-effect stamp-rejected" />
          <h3>Без агента</h3>
          <div className="list-item"><CrossIcon /> Часы скроллинга в 20+ чатах</div>
          <div className="list-item"><CrossIcon /> Пропущенные кастинги из-за шума</div>
          <div className="list-item"><CrossIcon /> Спам, реклама и дубли</div>
          <div className="list-item"><CrossIcon /> Медленная реакция на объявления</div>
        </div>

        <div className="comp-card positive">
          <img src={STAMP_APPROVED_URL} alt="Approved" className="stamp-effect stamp-approved" />
          <h3>С Caster AI</h3>
          <div className="list-item"><CheckIcon /> Кастинги сами приходят в ЛС</div>
          <div className="list-item"><CheckIcon /> Ни одного пропущенного объявления</div>
          <div className="list-item"><CheckIcon /> <span>Только релевантные предложения</span></div>
          <div className="list-item"><CheckIcon /> Мгновенный отклик в 1 клик</div>
        </div>
      </div>
    </section>
  );
};

// --- FEATURES SECTION ---
const FeaturesSection = () => {
  const features = [
    { icon: IconTarget, title: "Все кастинги в одном месте", desc: "ИИ мониторит 20+ источников 24/7. Вы больше никогда не упустите роль мечты." },
    { icon: IconImage, title: "Читает текст с фото", desc: "Даже если кастинг опубликован картинкой, наш ИИ распознает его и пришлет вам." },
    { icon: IconStars, title: "Идеальный порядок", desc: "Все объявления приходят в едином, удобном формате. Никакого визуального шума." },
    { icon: IconUser, title: "Персональный фильтр", desc: "Вы получаете только то, что подходит под ваш типаж, возраст и навыки." },
    { icon: IconShield, title: "Без мусора", desc: "Мы удаляем 95% спама, рекламы и повторов. Только чистые кастинги." },
    { icon: IconBolt, title: "Скорость решает", desc: "Отправляйте заявку первым. В киноиндустрии это часто решает судьбу роли." }
  ];

  return (
    <section className="section-container">
      <h2 className="section-title">
        Технологии на службе <span style={{ color: "#22c55e" }}>вашей карьеры</span>
      </h2>
      <p className="section-subtitle">
        Мы автоматизировали рутину, чтобы вы занимались творчеством
      </p>

      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feat-card">
            <div className="feat-icon-wrapper">
              <feature.icon />
            </div>
            <h3 className="feat-title">{feature.title}</h3>
            <p className="feat-desc">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- TEXT SCRAMBLE LOGIC (Class) ---
class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = '!<>-_\\/[]{}—=+*^?#________'
    this.update = this.update.bind(this)
  }
  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      // УСКОРЕНО
      const start = Math.floor(Math.random() * 25)
      const end = start + Math.floor(Math.random() * 25)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }
  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}

// --- REUSABLE SCRAMBLE TEXT COMPONENT ---
const ScrambleTextComponent = ({ defaultText, hoverText, className }) => {
  const textRef = useRef(null);
  const scramblerRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      scramblerRef.current = new TextScramble(textRef.current);
    }
  }, []);

  const handleMouseEnter = () => {
    if (scramblerRef.current) {
      scramblerRef.current.setText(hoverText);
    }
  };

  const handleMouseLeave = () => {
    if (scramblerRef.current) {
      scramblerRef.current.setText(defaultText);
    }
  };

  return (
    <div
      style={{ marginBottom: '60px', textAlign: 'center' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h2 className={className} ref={textRef}>
        {defaultText}
      </h2>
    </div>
  );
};

// --- PARTNERS SECTION (3D CAROUSEL) ---
const PartnersSection = () => {
  const [isPaused, setIsPaused] = useState(false);

  // Список партнеров с ссылками
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

  const radius = 380;
  const anglePerCard = 360 / partners.length;

  return (
    <section className="partners-section-wrapper">
      <div className="partners-container-box">

        <ScrambleTextComponent
          defaultText="НАШИ ПАРТНЕРЫ"
          hoverText="ЛИДЕРЫ РЫНКА"
          className="scramble-text"
        />

        <div className="partners-scene">
          <div className="partners-fade-overlay" />

          <div
            className="partners-rotor"
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          >
            {partners.map((partner, i) => (
              <a
                key={i}
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="partner-card-3d"
                style={{
                  transform: `rotateY(${i * anglePerCard}deg) translateZ(${radius}px)`
                }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <img
                  src={partner.src}
                  alt={partner.alt}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- ACTION BUTTON (Interactive) ---
const ActionBtn = ({ initialText, className, changeText = false }) => {
  const [text, setText] = useState(initialText);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);

    if (changeText) {
      setText("ACTION!");
    }

    setTimeout(() => {
      setIsAnimating(false);
    }, 200);
  };

  return (
    <button
      className={`${className} ${isAnimating ? "click-anim" : ""}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

// --- PRICING SECTION ---
const PricingSection = () => {
  return (
    <section className="section-container" style={{ paddingBottom: '150px' }}>

      <ScrambleTextComponent
        defaultText="ПРОСТЫЕ ЦЕНЫ"
        hoverText="ЗВЕЗДНЫЕ ПРЕДЛОЖЕНИЯ"
        className="scramble-text"
      />

      <div className="pricing-grid">
        {/* БАЗОВЫЙ */}
        <div className="pricing-card free">
          <div className="pricing-header">
            <IconGift className="plan-icon" color="#a5a6ff" />
            <span className="plan-name">БАЗОВЫЙ</span>
          </div>

          <div className="price-block">
            <div className="price-value">0 <span className="currency">₸</span></div>
          </div>
          <ul className="features-list">
            <li className="feature-item"><div className="check-circle"><SmallCheck /></div>Размещение анкеты в базе</li>
            <li className="feature-item"><div className="check-circle"><SmallCheck /></div>Видимость для кастинг-директоров</li>
            <li className="feature-item disabled"><div className="check-circle"></div>Автоподбор кастингов</li>
            <li className="feature-item disabled"><div className="check-circle"></div>Уведомления в Telegram</li>
            <li className="feature-item disabled"><div className="check-circle"></div>Отклик в 1 клик</li>
          </ul>

          <ActionBtn
            initialText="СОЗДАТЬ АНКЕТУ"
            className="pricing-btn dark"
            changeText={false}
          />
        </div>

        {/* ЗВЕЗДА (STANDARD ELECTRIC) */}
        <div className="pricing-card standard-electric">
          <div className="star-glow-bg"></div>

          <div className="standard-electric-content">
            <div className="pricing-header">
              <IconStar className="plan-icon" color="#4ea8de" />
              <span className="plan-name">ЗВЕЗДА</span>
            </div>

            <div className="price-block">
              <div className="price-value">30 <span className="currency">₸</span></div>
              <div className="price-period">первый месяц, далее 3 490 ₸/мес</div>
            </div>
            <ul className="features-list">
              <li className="feature-item"><div className="check-circle"><SmallCheck color="#4ea8de" /></div>Всё из тарифа «БАЗОВЫЙ»</li>
              <li className="feature-item"><div className="check-circle"><SmallCheck color="#4ea8de" /></div>Сборка из 30+ WA/TG чатов</li>
              <li className="feature-item"><div className="check-circle"><SmallCheck color="#4ea8de" /></div>Автоподбор по профилю</li>
              <li className="feature-item"><div className="check-circle"><SmallCheck color="#4ea8de" /></div>Моментальные уведомления</li>
              <li className="feature-item"><div className="check-circle"><SmallCheck color="#4ea8de" /></div>Отклик в 1 клик</li>
            </ul>

            <ActionBtn
              initialText="НАЧАТЬ СЕЙЧАС"
              className="pricing-btn star-btn"
              changeText={true}
            />
          </div>
        </div>

        {/* СУПЕРЗВЕЗДА (ELECTRIC STYLE) */}
        <div className="pricing-card electric">
          <div className="background-glow"></div>
          <div className="overlay-1"></div>

          <div className="electric-content">
            <div className="badge-electric">Рекомендуем</div>

            <div className="pricing-header">
              <IconCrown className="plan-icon" color="#dd8448" />
              <span className="plan-name">СУПЕРЗВЕЗДА</span>
            </div>

            <div className="price-block">
              <div className="price-value">30 <span className="currency">₸</span></div>
              <div className="price-period">первый месяц, далее 4 490 ₸/мес</div>
            </div>
            <ul className="features-list">
              <li className="feature-item"><div className="check-circle"><SmallCheck color="#dd8448" /></div>Всё из тарифа «ЗВЕЗДА»</li>
              <li className="feature-item"><div className="check-circle"><SmallCheck color="#dd8448" /></div>Фильтр: массовка / роль / реклама</li>
              <li className="feature-item"><div className="check-circle"><SmallCheck color="#dd8448" /></div>Приоритетная поддержка</li>
              <li className="feature-item"><div className="check-circle"><SmallCheck color="#dd8448" /></div>Ранний доступ к новым функциям</li>
            </ul>

            <ActionBtn
              initialText="НАЧАТЬ СЕЙЧАС"
              className="pricing-btn electric-btn"
              changeText={true}
            />

            <div className="glow-layer-1"></div>
            <div className="glow-layer-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- ГЛАВНЫЙ КОМПОНЕНТ APP ---
export default function App() {
  return (
    <>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="turbulent-displace" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" />
          </filter>
        </defs>
      </svg>

      <style>{globalStyles}</style>
      <div>
        <HeroSection />
        <GridBackgroundWrapper>
          <ComparisonSection />
          <FeaturesSection />
          <PartnersSection />
          <PricingSection />
        </GridBackgroundWrapper>
      </div>
    </>
  );
}