import { useEffect, useState } from "react";

const steps = [
  {
    id: 1,
    number: "01",
    title: "Discover",
    description:
      "We understand your goals, challenges, and what you want to achieve.",
  },
  {
    id: 2,
    number: "02",
    title: "Plan",
    description:
      "We create a clear strategy and roadmap tailored to your needs.",
  },
  {
    id: 3,
    number: "03",
    title: "Design",
    description:
      "We turn ideas into thoughtful, intuitive, and engaging experiences.",
  },
  {
    id: 4,
    number: "04",
    title: "Develop",
    description:
      "We build reliable, scalable solutions using modern technology.",
  },
  {
    id: 5,
    number: "05",
    title: "Test",
    description:
      "We refine every detail to ensure quality, performance, and usability.",
  },
  {
    id: 6,
    number: "06",
    title: "Launch",
    description:
      "We bring your product to life and make it ready for the world.",
  },
  {
    id: 7,
    number: "07",
    title: "Analyze",
    description:
      "We measure performance and identify opportunities for improvement.",
  },
  {
    id: 8,
    number: "08",
    title: "Grow",
    description:
      "We continuously improve your product as your needs evolve.",
  },
];

function HowItWorks() {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % steps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const visibleSteps = [
    steps[startIndex % steps.length],
    steps[(startIndex + 1) % steps.length],
    steps[(startIndex + 2) % steps.length],
  ];

  return (
    <section
      id="how-it-works"
      className="bg-[#faf6f0] px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#C1622B]">
            Our Process
          </p>

          <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">
            How It Works
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-gray-600">
            From the first idea to the final result, we follow a simple
            process to turn your vision into reality.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-6 md:grid-cols-3">
          {visibleSteps.map((step) => (
            <div
              key={step.id}
              className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="text-5xl font-bold text-[#C1622B]/20">
                  {step.number}
                </span>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#faf6f0] text-[#C1622B]">
                  →
                </div>
              </div>

              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                {step.title}
              </h3>

              <p className="leading-7 text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="mt-10 flex justify-center gap-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === startIndex
                  ? "w-8 bg-[#C1622B]"
                  : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;