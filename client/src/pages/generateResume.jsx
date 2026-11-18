
import { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "../components/ResumePDF";
 

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
const [selectedFormat, setSelectedFormat] = useState("hybrid");

// Editable resume states
const [editedResume, setEditedResume] = useState(null);
const [isEditing, setIsEditing] = useState(false);



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
      body: JSON.stringify({
    ...formData,
    selectedFormat,
}),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Something went wrong.");
    }

    console.log("Backend response:", result);


    setGeneratedResume(result.data);
setEditedResume({
  ...result.data,
  fullName: formData.fullName,
  email: formData.email,
  phone: formData.phone,
  location: formData.location,
});

setIsEditing(false);
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


{/* Resume Format Selection */}
<section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

  <div className="mb-6">
    <h2 className="text-xl font-bold text-slate-900">
      Choose Your Resume Format
    </h2>
    <p className="mt-1 text-sm text-slate-500">
      Select the structure that best highlights your qualifications.
    </p>
  </div>

  <div className="grid gap-4">

    {/* Reverse Chronological */}
    <button
      type="button"
      onClick={() => setSelectedFormat("chronological")}
      className={`rounded-xl border-2 p-5 text-left transition ${
        selectedFormat === "chronological"
          ? "border-indigo-600 bg-indigo-50"
          : "border-slate-200 hover:border-indigo-300"
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-900">
          Reverse-Chronological
        </h3>
        <span className="text-sm font-semibold text-indigo-600">
          {selectedFormat === "chronological" ? "✓ Selected" : "Select"}
        </span>
      </div>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        Presents your experience and education from newest to oldest.
        A familiar format for traditional job applications.
      </p>

      <p className="mt-3 text-xs font-semibold text-slate-500">
        BEST FOR: Applicants with relevant work experience
      </p>
    </button>

    {/* Functional */}
    <button
      type="button"
      onClick={() => setSelectedFormat("functional")}
      className={`rounded-xl border-2 p-5 text-left transition ${
        selectedFormat === "functional"
          ? "border-indigo-600 bg-indigo-50"
          : "border-slate-200 hover:border-indigo-300"
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-900">
          Functional (Skills-Based)
        </h3>
        <span className="text-sm font-semibold text-indigo-600">
          {selectedFormat === "functional" ? "✓ Selected" : "Select"}
        </span>
      </div>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        Highlights your skills and competencies rather than focusing
        primarily on employment history.
      </p>

      <p className="mt-3 text-xs font-semibold text-slate-500">
        BEST FOR: Career changers and applicants with limited experience
      </p>
    </button>

    {/* Combination */}
    <button
      type="button"
      onClick={() => setSelectedFormat("hybrid")}
      className={`rounded-xl border-2 p-5 text-left transition ${
        selectedFormat === "hybrid"
          ? "border-indigo-600 bg-indigo-50"
          : "border-slate-200 hover:border-indigo-300"
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-900">
          Combination (Hybrid)
        </h3>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-700">
            Recommended
          </span>
          {selectedFormat === "hybrid" && (
            <span className="text-sm font-semibold text-indigo-600">
              ✓ Selected
            </span>
          )}
        </div>
      </div>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        Combines a skills-focused introduction with chronological
        education and work experience.
      </p>

      <p className="mt-3 text-xs font-semibold text-slate-500">
        BEST FOR: Students, developers, and applicants with projects
      </p>
    </button>

  </div>
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
{generatedResume && editedResume && (
  <section className="mt-12">

    {/* Preview Heading */}
    <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
          CareerForge
        </p>
        <h2 className="mt-1 text-xl font-bold text-slate-900">
          Resume Preview
        </h2>
      </div>

      <div className="flex gap-2">
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={() => {
                setEditedResume({
                  ...generatedResume,
                  fullName: formData.fullName,
                  email: formData.email,
                  phone: formData.phone,
                  location: formData.location,
                });
                setIsEditing(false);
              }}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="rounded-lg bg-indigo-950 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-900"
            >
              Save Changes
            </button>
          </>
             ) : (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="rounded-lg bg-indigo-950 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-900"
            >
              Edit Resume
            </button>

            <PDFDownloadLink
              document={<ResumePDF resume={editedResume} />}
              fileName="CareerForge-Resume.pdf"
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              {({ loading }) =>
                loading ? "Preparing PDF..." : "Download PDF ↓"
              }
            </PDFDownloadLink>
          </div>
        )}
      </div>
    </div>

    {/* EDITING INTERFACE */}
    {isEditing && (
      <div className="mb-8 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Edit Personal Information
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Update your contact details and resume heading.
          </p>
        </div>

        {[
          { label: "Full Name", field: "fullName" },
          { label: "Email Address", field: "email" },
          { label: "Phone Number", field: "phone" },
          { label: "Location", field: "location" },
          { label: "Professional Headline", field: "professionalHeadline" },
        ].map(({ label, field }) => (
          <label key={field} className="block">
            <span className="text-sm font-semibold text-slate-700">
              {label}
            </span>
            <input
              type="text"
              value={editedResume[field] || ""}
              onChange={(e) =>
                setEditedResume((previous) => ({
                  ...previous,
                  [field]: e.target.value,
                }))
              }
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </label>
        ))}

        {/* Summary */}
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Professional Summary
          </span>
          <textarea
            rows="5"
            value={editedResume.professionalSummary || ""}
            onChange={(e) =>
              setEditedResume((previous) => ({
                ...previous,
                professionalSummary: e.target.value,
              }))
            }
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </label>

        {/* Experience */}
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Work Experience
          </span>
          <p className="mt-1 text-xs text-slate-500">
            Put each bullet point on a separate line.
          </p>
          <textarea
            rows="6"
            value={(editedResume.experienceBullets || []).join("\n")}
            onChange={(e) =>
              setEditedResume((previous) => ({
                ...previous,
                experienceBullets: e.target.value
                  .split("\n")
                  .filter((line) => line.trim()),
              }))
            }
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </label>

        {/* Projects */}
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Projects
          </span>
          <p className="mt-1 text-xs text-slate-500">
            Put each bullet point on a separate line.
          </p>
          <textarea
            rows="6"
            value={(editedResume.projectBullets || []).join("\n")}
            onChange={(e) =>
              setEditedResume((previous) => ({
                ...previous,
                projectBullets: e.target.value
                  .split("\n")
                  .filter((line) => line.trim()),
              }))
            }
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </label>

        {/* Skills */}
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Technical Skills
          </span>
          <p className="mt-1 text-xs text-slate-500">
            Put each skill on a separate line.
          </p>
          <textarea
            rows="4"
            value={(editedResume.skills || []).join("\n")}
            onChange={(e) =>
              setEditedResume((previous) => ({
                ...previous,
                skills: e.target.value
                  .split("\n")
                  .filter((line) => line.trim()),
              }))
            }
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </label>

        {/* Education */}
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Education
          </span>
          <textarea
            rows="5"
            value={editedResume.education || ""}
            onChange={(e) =>
              setEditedResume((previous) => ({
                ...previous,
                education: e.target.value,
              }))
            }
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </label>

        {/* Certifications */}
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Certifications
          </span>
          <p className="mt-1 text-xs text-slate-500">
            Put each certification on a separate line.
          </p>
          <textarea
            rows="4"
            value={(editedResume.certifications || []).join("\n")}
            onChange={(e) =>
              setEditedResume((previous) => ({
                ...previous,
                certifications: e.target.value
                  .split("\n")
                  .filter((line) => line.trim()),
              }))
            }
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </label>

        <div className="flex justify-end gap-2 border-t border-slate-200 pt-5">
          <button
            type="button"
            onClick={() => {
              setEditedResume({
                ...generatedResume,
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                location: formData.location,
              });
              setIsEditing(false);
            }}
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Discard Changes
          </button>

          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="rounded-lg bg-indigo-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-900"
          >
            Save Changes
          </button>
        </div>
      </div>
    )}

    {/* ACTUAL RESUME DOCUMENT */}
    {!isEditing && (
      <article className="mx-auto max-w-[850px] border border-slate-200 bg-white px-8 py-10 shadow-lg sm:px-14 sm:py-12">

        {/* Header */}
        <header className="border-b-2 border-slate-800 pb-6 text-center">
          <h1 className="text-3xl font-bold uppercase tracking-wide text-slate-900 sm:text-4xl">
            {editedResume.fullName}
          </h1>

          {editedResume.professionalHeadline && (
            <p className="mt-3 text-base font-semibold tracking-wide text-blue-900">
              {editedResume.professionalHeadline}
            </p>
          )}

          <div className="mt-4 flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm text-slate-600">
            {[editedResume.email, editedResume.phone, editedResume.location]
              .filter(Boolean)
              .map((item, index) => (
                <span key={index}>{item}</span>
              ))}
          </div>
        </header>

        {/* Professional Summary */}
        {editedResume.professionalSummary && (
          <section className="mt-7">
            <h2 className="mb-3 border-b border-slate-300 pb-2 text-sm font-bold uppercase tracking-widest text-slate-900">
              Professional Summary
            </h2>
            <p className="text-sm leading-6 text-slate-700">
              {editedResume.professionalSummary}
            </p>
          </section>
        )}

        {/* Work Experience */}
        {editedResume.experienceBullets?.length > 0 && (
          <section className="mt-7">
            <h2 className="mb-3 border-b border-slate-300 pb-2 text-sm font-bold uppercase tracking-widest text-slate-900">
              Work Experience
            </h2>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
              {editedResume.experienceBullets.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Projects */}
        {editedResume.projectBullets?.length > 0 && (
          <section className="mt-7">
            <h2 className="mb-3 border-b border-slate-300 pb-2 text-sm font-bold uppercase tracking-widest text-slate-900">
              Projects
            </h2>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
              {editedResume.projectBullets.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Skills */}
        {editedResume.skills?.length > 0 && (
          <section className="mt-7">
            <h2 className="mb-3 border-b border-slate-300 pb-2 text-sm font-bold uppercase tracking-widest text-slate-900">
              Technical Skills
            </h2>
            <p className="text-sm leading-6 text-slate-700">
              {editedResume.skills.join("  •  ")}
            </p>
          </section>
        )}

        {/* Education */}
        {editedResume.education && (
          <section className="mt-7">
            <h2 className="mb-3 border-b border-slate-300 pb-2 text-sm font-bold uppercase tracking-widest text-slate-900">
              Education
            </h2>
            <p className="whitespace-pre-line text-sm leading-6 text-slate-700">
              {editedResume.education}
            </p>
          </section>
        )}

        {/* Certifications */}
        {editedResume.certifications?.length > 0 && (
          <section className="mt-7">
            <h2 className="mb-3 border-b border-slate-300 pb-2 text-sm font-bold uppercase tracking-widest text-slate-900">
              Certifications
            </h2>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
              {editedResume.certifications.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>
        )}

      </article>
    )}
  </section>
)}



    </div>
  </main>
);

}

export default GenerateResume;
