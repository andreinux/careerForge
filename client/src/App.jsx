
const services = [
  {
    number: "01",
    icon: "✦",
    title: "Create a Resume",
    description:
      "Turn your experience, education, and skills into a polished professional resume with AI assistance.",
    features: [
      "AI-assisted content generation",
      "Professional resume templates",
      "Downloadable PDF"
    ],
    button: "Build my resume",
    primary: true
  },
  {
    number: "02",
    icon: "◎",
    title: "Rate My Resume",
    description:
      "Upload your existing resume and receive an AI-powered evaluation with actionable feedback.",
    features: [
      "Overall resume score",
      "Strengths and weaknesses",
      "Personalized improvements"
    ],
    button: "Evaluate my resume",
    primary: false
  }
];

function App() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">

      {/* Navigation */}
      <header className="border-b border-slate-200 bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">

          <a href="#" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-950 text-xl font-bold text-white">
              C
            </div>
            <span className="text-xl font-bold tracking-tight">
              CareerForge
            </span>
          </a>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#services" className="transition hover:text-indigo-700">
              Our Services
            </a>
            <a href="#about" className="transition hover:text-indigo-700">
              About
            </a>
          </div>

          <a
            href="#services"
            className="rounded-lg bg-indigo-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-800"
          >
            Get Started
          </a>
        </nav>
      </header>

      {/* Hero */}
      <main>
        <section className="relative overflow-hidden px-6 pb-20 pt-24 lg:px-10 lg:pb-28 lg:pt-32">

          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-indigo-100 opacity-60 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">

            <div className="max-w-3xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-sm font-medium text-indigo-800 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Your next opportunity starts here
              </div>

              <h1 className="text-5xl font-bold leading-tight tracking-tight text-indigo-950 md:text-6xl lg:text-7xl">
                Build a resume
                <br />
                that <span className="text-indigo-600">opens doors.</span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
                Your career deserves more than a generic resume.
                Create a professional application or discover how
                to improve your existing one with AI-powered tools.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#services"
                  className="rounded-xl bg-indigo-950 px-7 py-4 font-semibold text-white shadow-lg shadow-indigo-950/10 transition hover:-translate-y-1 hover:bg-indigo-800"
                >
                  Explore CareerForge →
                </a>

                <span className="text-sm text-slate-500">
                  Simple. Professional. AI-powered.
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* Services */}
        <section id="services" className="bg-white px-6 py-20 lg:px-10">

          <div className="mx-auto max-w-7xl">

            <div className="mb-12 max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">
                What can we help you with?
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-indigo-950 md:text-4xl">
                Everything you need to stand out.
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Whether you're starting from scratch or improving
                an existing resume, CareerForge has you covered.
              </p>
            </div>

            <div className="grid gap-7 md:grid-cols-2">

              {services.map((service) => (
                <article
                  key={service.number}
                  className={`rounded-2xl border p-8 transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    service.primary
                      ? "border-indigo-950 bg-indigo-950 text-white"
                      : "border-slate-200 bg-white text-slate-900"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-semibold ${
                      service.primary ? "text-indigo-300" : "text-slate-400"
                    }`}>
                      SERVICE {service.number}
                    </span>

                    <span className="text-3xl">{service.icon}</span>
                  </div>

                  <h3 className="mt-8 text-2xl font-bold">
                    {service.title}
                  </h3>

                  <p className={`mt-4 min-h-20 leading-7 ${
                    service.primary ? "text-indigo-100" : "text-slate-600"
                  }`}>
                    {service.description}
                  </p>

                  <ul className="mt-7 space-y-4">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm">
                        <span className="font-bold text-emerald-500">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#about"
                    className={`mt-9 inline-flex w-full items-center justify-center rounded-xl px-5 py-4 font-semibold transition ${
                      service.primary
                        ? "bg-white text-indigo-950 hover:bg-indigo-100"
                        : "bg-indigo-950 text-white hover:bg-indigo-800"
                    }`}
                  >
                    {service.button} →
                  </a>
                </article>
              ))}

            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-7xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">
              About CareerForge
            </p>

            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold text-indigo-950">
              Helping you present your best professional self.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600">
              CareerForge uses AI to help organize your qualifications,
              improve your resume content, and provide useful feedback.
              Your experience remains yours. We simply help you present it better.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-slate-500 md:flex-row">
          <p>© 2026 CareerForge. All rights reserved.</p>
          <p>Built to help your career move forward.</p>
        </div>
      </footer>

    </div>
  );
}

export default App;
