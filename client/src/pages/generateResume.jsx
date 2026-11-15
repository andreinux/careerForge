
import { useState } from "react";

function GenerateResume() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    targetRole: "",
    summary: "",
    education: "",
    experience: "",
    skills: "",
    projects: "",
    certifications: "",
  });

  const [submitted, setSubmitted] = useState(false);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [generatedResume, setGeneratedResume] = useState(null);


  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setSubmitted(false);
  }
//handle submit event

    async function handleSubmit(event) {
  event.preventDefault();

  setLoading(true);
  setError("");
  setSubmitted(false);

  try {
    const response = await fetch("http://localhost:5000/api/resume/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Something went wrong.");
    }

    console.log("Backend response:", result);
setGeneratedResume(result.data);
setSubmitted(true);

  } catch (err) {
    console.error("Resume submission failed:", err);
    setError(err.message || "Unable to connect to the server.");

  } finally {
    setLoading(false);
  }
}



  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

  const labelClass = "text-sm font-semibold text-slate-700";



return (
  <main className="min-h-screen bg-slate-50 px-5 py-12">
    <div className="mx-auto max-w-4xl">

      {/* Header */}
      <div className="mb-10">
        <a
          href="/"
          className="text-sm font-medium text-indigo-700 hover:text-indigo-900"
        >
          ← Back to Home
        </a>

        <p className="mt-8 text-sm font-bold uppercase tracking-widest text-indigo-600">
          CareerForge AI
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
          Build your professional resume.
        </h1>

        <p className="mt-3 max-w-2xl text-slate-500">
          Tell us about yourself, your education, and your experience.
          Our AI will help turn your information into a professional resume.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-7">

        {/* Personal Information */}
        <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              How can employers contact you?
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className={labelClass}>
              Full Name *
              <input
                className={inputClass}
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </label>

            <label className={labelClass}>
              Email Address *
              <input
                className={inputClass}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
              />
            </label>

            <label className={labelClass}>
              Phone Number
              <input
                className={inputClass}
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+63 912 345 6789"
              />
            </label>

            <label className={labelClass}>
              Location
              <input
                className={inputClass}
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Cebu, Philippines"
              />
            </label>

            <label className={`${labelClass} sm:col-span-2`}>
              Target Position
              <input
                className={inputClass}
                name="targetRole"
                value={formData.targetRole}
                onChange={handleChange}
                placeholder="e.g. Junior Frontend Developer"
              />
            </label>
          </div>
        </section>

        {/* Professional Summary */}
        <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Professional Summary
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Briefly introduce yourself, your background, and your goals.
          </p>

          <label className={`${labelClass} mt-6 block`}>
            About You
            <textarea
              className={inputClass}
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              rows="4"
              placeholder="Describe your background, strengths, and career objectives..."
            />
          </label>
        </section>

        {/* Education */}
        <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Education</h2>
          <p className="mt-1 text-sm text-slate-500">
            Include your school, degree, and graduation date.
          </p>

          <label className={`${labelClass} mt-6 block`}>
            Educational Background *
            <textarea
              className={inputClass}
              name="education"
              value={formData.education}
              onChange={handleChange}
              rows="4"
              placeholder="Bachelor of Science in Information Technology&#10;Cebu Technological University&#10;Expected Graduation: 2030"
              required
            />
          </label>
        </section>

        {/* Experience */}
        <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Work Experience
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Include jobs, internships, volunteer work, or relevant experience.
            If you have none, you can leave this blank.
          </p>

          <label className={`${labelClass} mt-6 block`}>
            Your Experience
            <textarea
              className={inputClass}
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              rows="5"
              placeholder="Job Title | Company | Dates&#10;Describe your responsibilities and achievements..."
            />
          </label>
        </section>

        {/* Skills */}
        <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Skills</h2>
          <p className="mt-1 text-sm text-slate-500">
            List your technical and professional skills.
          </p>

          <label className={`${labelClass} mt-6 block`}>
            Your Skills *
            <textarea
              className={inputClass}
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              rows="3"
              placeholder="JavaScript, React, HTML, CSS, Communication..."
              required
            />
          </label>
        </section>

        {/* Projects */}
        <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Projects</h2>
          <p className="mt-1 text-sm text-slate-500">
            Showcase personal, academic, or professional projects.
          </p>

          <label className={`${labelClass} mt-6 block`}>
            Your Projects
            <textarea
              className={inputClass}
              name="projects"
              value={formData.projects}
              onChange={handleChange}
              rows="4"
              placeholder="Project Name&#10;Technologies used&#10;What you built and accomplished..."
            />
          </label>
        </section>

        {/* Certifications */}
        <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Certifications
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Add relevant certifications, training, or courses.
          </p>

          <label className={`${labelClass} mt-6 block`}>
            Your Certifications
            <textarea
              className={inputClass}
              name="certifications"
              value={formData.certifications}
              onChange={handleChange}
              rows="3"
              placeholder="Certification Name | Issuing Organization | Year"
            />
          </label>
        </section>

        {/* Submit */}
        <div className="rounded-2xl bg-indigo-950 p-7 text-white">
          <h2 className="text-xl font-bold">
            Ready to build your resume?
          </h2>

          <p className="mt-2 text-sm text-indigo-200">
            Our AI will organize and improve your resume content.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-white px-6 py-4 font-bold text-indigo-950 transition hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {loading ? "Generating Resume..." : "Generate My Resume →"}
          </button>

          {submitted && (
            <p className="mt-4 text-sm text-green-300">
              Your resume was successfully generated!
            </p>
          )}

          {error && (
            <p className="mt-4 text-sm text-red-300">
              {error}
            </p>
          )}
        </div>

      </form>

    
{/* Generated Resume Preview */}
{generatedResume && (
  <section className="mt-12">
    {/* Preview heading - outside the actual resume */}
    <div className="mb-5 flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
          CareerForge
        </p>
        <h2 className="mt-1 text-xl font-bold text-slate-900">
          Resume Preview
        </h2>
      </div>
      <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
        AI Generated
      </span>
    </div>

    {/* Actual resume document */}
    <article className="mx-auto max-w-[850px] border border-slate-200 bg-white px-8 py-10 shadow-lg sm:px-14 sm:py-12">

      {/* Header */}
      <header className="border-b-2 border-slate-800 pb-6 text-center">
        <h1 className="text-3xl font-bold uppercase tracking-wide text-slate-900 sm:text-4xl">
          {formData.fullName}
        </h1>

        {generatedResume.professionalHeadline && (
          <p className="mt-3 text-base font-semibold tracking-wide text-blue-900">
            {generatedResume.professionalHeadline}
          </p>
        )}

        <div className="mt-4 flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm text-slate-600">
          {[formData.email, formData.phone, formData.location]
            .filter(Boolean)
            .map((item, index) => (
              <span key={index}>{item}</span>
            ))}
        </div>
      </header>

      {/* Professional Summary */}
      {generatedResume.professionalSummary && (
        <section className="mt-7">
          <h2 className="mb-3 border-b border-slate-300 pb-2 text-sm font-bold uppercase tracking-widest text-slate-900">
            Professional Summary
          </h2>
          <p className="text-sm leading-6 text-slate-700">
            {generatedResume.professionalSummary}
          </p>
        </section>
      )}

      {/* Work Experience */}
      {generatedResume.experienceBullets?.length > 0 && (
        <section className="mt-7">
          <h2 className="mb-3 border-b border-slate-300 pb-2 text-sm font-bold uppercase tracking-widest text-slate-900">
            Work Experience
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
            {generatedResume.experienceBullets.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Projects */}
      {generatedResume.projectBullets?.length > 0 && (
        <section className="mt-7">
          <h2 className="mb-3 border-b border-slate-300 pb-2 text-sm font-bold uppercase tracking-widest text-slate-900">
            Projects
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
            {generatedResume.projectBullets.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Skills */}
      {generatedResume.skills?.length > 0 && (
        <section className="mt-7">
          <h2 className="mb-3 border-b border-slate-300 pb-2 text-sm font-bold uppercase tracking-widest text-slate-900">
            Technical Skills
          </h2>
          <p className="text-sm leading-6 text-slate-700">
            {generatedResume.skills.join("  •  ")}
          </p>
        </section>
      )}

      {/* Education */}
      {generatedResume.education && (
        <section className="mt-7">
          <h2 className="mb-3 border-b border-slate-300 pb-2 text-sm font-bold uppercase tracking-widest text-slate-900">
            Education
          </h2>
          <p className="whitespace-pre-line text-sm leading-6 text-slate-700">
            {generatedResume.education}
          </p>
        </section>
      )}

      {/* Certifications */}
      {generatedResume.certifications?.length > 0 && (
        <section className="mt-7">
          <h2 className="mb-3 border-b border-slate-300 pb-2 text-sm font-bold uppercase tracking-widest text-slate-900">
            Certifications
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
            {generatedResume.certifications.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      )}

    </article>
  </section>
)}



    </div>
  </main>
);

}

export default GenerateResume;
