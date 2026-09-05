
function About() {
  return (
    <section
      id="about"
      className="bg-[#faf6f0] px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#C1622B]">
            About Us
          </p>

          <h2 className="text-4xl font-bold leading-tight text-black md:text-6xl">
            Ideas that become
            <span className="block text-[#C1622B]">
              meaningful experiences.
            </span>
          </h2>
        </div>

        {/* Content */}
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left Text */}
          <div>
            <p className="text-xl leading-relaxed text-[#716c65]">
              We believe great digital experiences begin with simple ideas,
              thoughtful design, and a clear understanding of people.
            </p>

            <p className="mt-6 leading-relaxed text-[#716c65]">
              Our approach combines creativity and technology to create
              websites and products that are beautiful, functional, and
              memorable.
            </p>

            <button
              onClick={() =>
                document.getElementById("services")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="mt-8 rounded-lg bg-[#C1622B] px-6 py-3 font-medium text-white transition hover:bg-[#e8a938]"
            >
              Explore Our Work
            </button>
          </div>

          {/* Right Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h3 className="text-4xl font-bold text-black">05+</h3>
              <p className="mt-2 text-[#716c65]">
                Years of experience
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h3 className="text-4xl font-bold text-black">50+</h3>
              <p className="mt-2 text-[#716c65]">
                Projects completed
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h3 className="text-4xl font-bold text-black">20+</h3>
              <p className="mt-2 text-[#716c65]">
                Happy clients
              </p>
            </div>

            <div className="rounded-2xl bg-[#C1622B] p-8 text-white">
              <h3 className="text-4xl font-bold">100%</h3>
              <p className="mt-2 text-white/80">
                Passion for design
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
