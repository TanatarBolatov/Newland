import React, { useState } from "react";
import { Briefcase, Clapperboard } from "lucide-react";

// --- СТИЛИ (обычный CSS в JS объектах) ---
// Это гарантирует, что дизайн будет работать, даже если Tailwind не настроен.

const styles = {
    container: {
        position: "relative",
        width: "100%",
        height: "100vh", // Высота на весь экран
        overflow: "hidden",
        backgroundColor: "#000",
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    },
    videoWrapper: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
    },
    video: {
        width: "100%",
        height: "100%",
        objectFit: "cover", // Видео заполняет экран без искажений
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)", // Затемнение 50%
        background: "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4))",
        zIndex: 1,
    },
    content: {
        position: "relative",
        zIndex: 10, // Текст поверх всего
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        textAlign: "center",
        color: "#fff",
        padding: "0 20px",
    },
    title: {
        fontSize: "clamp(2rem, 5vw, 4rem)", // Адаптивный размер шрифта
        fontWeight: "800",
        marginBottom: "20px",
        lineHeight: "1.1",
        textShadow: "0 4px 10px rgba(0,0,0,0.5)",
    },
    subtitle: {
        fontSize: "clamp(1rem, 2vw, 1.25rem)",
        maxWidth: "600px",
        marginBottom: "40px",
        opacity: "0.9",
        lineHeight: "1.5",
    },
    buttonGroup: {
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    btnPrimary: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "15px 30px",
        borderRadius: "12px",
        border: "none",
        fontSize: "1rem",
        fontWeight: "bold",
        cursor: "pointer",
        backgroundColor: "#ffffff",
        color: "#000000",
        transition: "transform 0.2s",
    },
    btnSecondary: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "15px 30px",
        borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.5)",
        fontSize: "1rem",
        fontWeight: "bold",
        cursor: "pointer",
        backgroundColor: "rgba(255,255,255,0.1)", // Полупрозрачный фон
        backdropFilter: "blur(5px)", // Размытие фона под кнопкой
        color: "#ffffff",
        transition: "transform 0.2s, background 0.2s",
    },
};

const HeroSection = ({ videoSrc, onBusiness, onActors }) => {
    return (
        <section style={styles.container}>
            {/* 1. ФОНОВОЕ ВИДЕО */}
            <div style={styles.videoWrapper}>
                <video
                    style={styles.video}
                    src={videoSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                />
            </div>

            {/* 2. ЗАТЕМНЕНИЕ */}
            <div style={styles.overlay} />

            {/* 3. КОНТЕНТ */}
            <div style={styles.content}>
                <h1 style={styles.title}>
                    All castings in one place <br />
                    with AI Precision
                </h1>

                <div style={styles.buttonGroup}>
                    <button
                        style={styles.btnPrimary}
                        onClick={onBusiness}
                        onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                    >
                        <Briefcase size={20} />
                        For Business
                    </button>

                    <button
                        style={styles.btnSecondary}
                        onClick={onActors}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = "scale(1.05)";
                            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
                        }}
                    >
                        <Clapperboard size={20} />
                        For Actors
                    </button>
                </div>
            </div>
        </section>
    );
};

function App() {
    // УКАЖИТЕ ЗДЕСЬ ИМЯ ВАШЕГО ВИДЕО (оно должно лежать в папке public)
    const myVideo = "/studio-bg.webm";

    return (
        <div style={{ margin: 0, padding: 0 }}>
            <HeroSection
                videoSrc={myVideo}
                onBusiness={() => console.log("Business")}
                onActors={() => console.log("Actors")}
            />
        </div>
    );
}

export default App;