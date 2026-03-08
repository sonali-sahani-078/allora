import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./index.css"

export default function Intro() {
  const navigate = useNavigate()
  const [isOpening, setIsOpening] = useState(false)

  const openHome = () => {
    if (isOpening) return
    setIsOpening(true)
    window.setTimeout(() => navigate("/home"), 1100)
  }

  useEffect(() => {
    const handleKeyDown = () => openHome()
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpening])

  return (
    <main
      className={`intro-page ${isOpening ? "intro-page--opening" : ""}`}
      onClick={openHome}
      role="button"
      tabIndex={0}
      onKeyDown={openHome}
      aria-label="Open Allora home page"
    >
      <video
        className="intro-video"
        poster="/images/open kitchen.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/videos/pizza-oven-pexels-4457933.mp4" type="video/mp4" />
        {/* <source src="/videos/12456197_2160_3840_25fps.mp4" type="video/mp4" /> */}
        Your browser does not support background video.
      </video>
      <div className="intro-overlay" />
      <section className="intro-content">
        <h1>allora</h1>
        <button type="button" onClick={openHome} className="enter-button">
          Enter
        </button>
      </section>
    </main>
  )
}
