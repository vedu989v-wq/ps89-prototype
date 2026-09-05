import { useEffect, useState } from "react";

const texts = [
  "Trusted Services",
  "Empowered Workers",
  "Stronger Cooperatives",
];

function Home() {
  const [activeText, setActiveText] = useState(0);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const currentText = texts[activeText];
    let index = 0;

    setDisplayText("");

    const typingInterval = setInterval(() => {
      setDisplayText(currentText.slice(0, index + 1));
      index++;

      if (index === currentText.length) {
        clearInterval(typingInterval);
      }
    }, 70);

    const nextTextTimeout = setTimeout(() => {
      setActiveText((previous) => (previous + 1) % texts.length);
    }, 3500);

    return () => {
      clearInterval(typingInterval);
      clearTimeout(nextTextTimeout);
    };
  }, [activeText]);

  return (
    <section
      id="home"
      className="flex min-h-[calc(100vh-80px)] items-center bg-[#faf6f0] px-6 py-16"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center md:grid-cols-2">
        {/* Left Content */}
        <div className="relative z-10 md:-mr-32">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-[#C1622B]">
            Welcome to MyWebsite
          </p>

          <h1 className="max-w-2xl text-4xl font-bold leading-tight text-black md:text-6xl">
            <span>{displayText}</span>
            <span className="animate-pulse">|</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#716c65]">
            We design thoughtful experiences that combine creativity,
            technology, and simplicity.
          </p>

          <button
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className="mt-8 rounded-lg bg-[#C1622B] px-6 py-3 font-medium text-white transition hover:bg-[#e8a938]"
          >
            Get Started
          </button>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end">
          <div className="relative w-full max-w-lg">
            <img
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80"
              alt="Modern creative workspace"
              className="h-[420px] w-full rounded-2xl object-cover shadow-xl md:h-[550px]"
            />

            <div className="absolute -bottom-5 -left-5 rounded-xl bg-white px-6 py-4 shadow-lg">
              <p className="text-sm text-[#716c65]">Creative ideas</p>
              <p className="font-bold text-black">Built with purpose.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
