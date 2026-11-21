
import { useRef, useState } from "react";
import API_BASE_URL from "../api";

function ScoreBar({ label, score, maxScore, feedback }) {
  const percentage = (score / maxScore) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-slate-800">
          {label}
        </p>
        <p className="text-sm font-bold text-indigo-950">
          {score}/{maxScore}
        </p>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-indigo-600 transition-all duration-700"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="text-sm leading-relaxed text-slate-500">
        {feedback}
      </p>
    </div>
  );
}



function EvaluateResume() {
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [targetRole, setTargetRole] = useState("");
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
const [evaluation, setEvaluation] = useState(null);


  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

function handleFile(file) {
  setError("");

  if (!file) return;

  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (!allowedTypes.includes(file.type)) {
    setError("Please upload a PDF or DOCX file only.");
    return;
  }

  if (file.size > MAX_FILE_SIZE) {
    setError("File size must not exceed 5 MB.");
    return;
  }

  setSelectedFile(file);
}

  function handleFileChange(event) {
    const file = event.target.files?.[0];
    handleFile(file);

    // Allow selecting the same file again.
    event.target.value = "";
  }

  function handleDrop(event) {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];
    handleFile(file);
  }


async function handleSubmit(event) {
  event.preventDefault();

  if (!selectedFile) {
    setError("Please upload your resume first.");
    return;
  }

  setError("");
  setEvaluation(null);
  setIsAnalyzing(true);

  try {
    const formData = new FormData();

    formData.append("resume", selectedFile);
    formData.append("targetRole", targetRole);

    const response = await fetch(
      `${API_BASE_URL}/api/resume/evaluate`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        result.message || "Unable to evaluate your resume."
      );
    }

    setEvaluation(result.data);

  } catch (error) {
    console.error("Resume evaluation error:", error);

    setError(
      error.message || "Something went wrong. Please try again."
    );

  } finally {
    setIsAnalyzing(false);
  }
}


  function removeFile() {
    setSelectedFile(null);
    setError("");
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-3xl">

        {/* Page Heading */}
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
            CareerForge
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-indigo-950">
            Evaluate Your Resume
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-slate-600">
            Upload your existing resume and receive AI-powered feedback
            to identify strengths, weaknesses, and opportunities for improvement.
          </p>
        </div>

        {/* Upload Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
        >

          {/* PDF Upload */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-slate-800">
              Upload Your Resume
            </label>

            <div
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition ${
                isDragging
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-slate-300 hover:border-indigo-400 hover:bg-slate-50"
              }`}
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-indigo-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-7 w-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5h10.5A2.25 2.25 0 0 0 19.5 17.25v-10.5A2.25 2.25 0 0 0 17.25 4.5H9.621a2.25 2.25 0 0 0-1.591.659L4.659 8.53A2.25 2.25 0 0 0 4 10.121v7.129A2.25 2.25 0 0 0 6.25 19.5Z"
                  />
                </svg>
              </div>

              <p className="mt-4 font-semibold text-slate-800">
                Drop your PDF or DOCX resume here
              </p>

              <p className="mt-2 text-sm text-slate-500">
                or click to browse your files
              </p>

              <p className="mt-3 text-xs text-slate-400">
                PDF or DOCX · Maximum file size: 5 MB
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* Selected File */}
            {selectedFile && (
              <div className="mt-4 flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
                    <span className="text-xs font-bold">
  {selectedFile.name.toLowerCase().endsWith(".docx") ? "DOCX" : "PDF"}
</span>
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {selectedFile.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={removeFile}
                  className="ml-3 shrink-0 text-sm font-medium text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Target Position */}
          <div className="mt-8">
            <label
              htmlFor="targetRole"
              className="mb-2 block text-sm font-semibold text-slate-800"
            >
              Target Position
              <span className="ml-2 font-normal text-slate-400">
                (Optional)
              </span>
            </label>

            <input
              id="targetRole"
              type="text"
              value={targetRole}
              onChange={(event) => setTargetRole(event.target.value)}
              placeholder="e.g. Frontend Developer"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

            <p className="mt-2 text-xs text-slate-500">
              Providing a target position helps us evaluate the relevance
              of your skills and experience.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <p
              role="alert"
              className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              {error}
            </p>
          )}

          {/* Submit Button */}
          <button
  type="submit"
  disabled={!selectedFile || isAnalyzing}
  className="mt-8 w-full rounded-lg bg-indigo-950 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-150 hover:bg-indigo-900 active:scale-[0.98] active:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100"
>
  {isAnalyzing ? "Analyzing Your Resume..." : "Analyze My Resume"}
</button>

          <p className="mt-4 text-center text-xs text-slate-400">
            Your resume will be processed for evaluation.
          </p>
        </form>



{evaluation && (
  <section className="mt-10 space-y-6">

    {/* Overall Score */}
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
        Resume Evaluation Report
      </p>

      <div className="mt-5 flex flex-col items-center text-center">
        <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full border-8 border-indigo-100">
          <span className="text-4xl font-bold text-indigo-950">
            {evaluation.overallScore}
          </span>
          <span className="text-sm text-slate-500">
            out of 100
          </span>
        </div>

        <h2 className="mt-5 text-2xl font-bold text-indigo-950">
          Your Resume Score
        </h2>

        <p className="mt-2 max-w-md text-sm text-slate-500">
          Here's an evaluation of your resume based on its content,
          relevance, presentation, structure, and professionalism.
        </p>
      </div>
    </div>

    {/* Category Scores */}
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-xl font-bold text-indigo-950">
        Score Breakdown
      </h2>

      <div className="mt-7 space-y-7">
        {evaluation.categoryScores.map((item, index) => (
          <ScoreBar
            key={index}
            label={item.category}
            score={item.score}
            maxScore={item.maxScore}
            feedback={item.feedback}
          />
        ))}
      </div>
    </div>

    {/* Strengths and Weaknesses */}
    <div className="grid gap-6 md:grid-cols-2">

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-green-700">
          Strengths
        </h2>

        <ul className="mt-5 space-y-3">
          {evaluation.strengths.map((item, index) => (
            <li key={index} className="flex gap-3 text-sm leading-relaxed text-slate-600">
              <span className="font-bold text-green-600">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-red-600">
          Areas to Improve
        </h2>

        <ul className="mt-5 space-y-3">
          {evaluation.weaknesses.map((item, index) => (
            <li key={index} className="flex gap-3 text-sm leading-relaxed text-slate-600">
              <span className="font-bold text-red-500">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

    </div>

    {/* Recommendations */}
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-xl font-bold text-indigo-950">
        Recommendations
      </h2>

      <div className="mt-5 space-y-4">
        {evaluation.recommendations.map((item, index) => (
          <div key={index} className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-sm font-bold text-indigo-700">
              {index + 1}
            </span>

            <p className="pt-1 text-sm leading-relaxed text-slate-600">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* Suggested Rewrites */}
    {evaluation.suggestedRewrites.length > 0 && (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-bold text-indigo-950">
          Suggested Rewrites
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Review these suggested improvements before applying
          them to your original resume.
        </p>

        <div className="mt-6 space-y-6">
          {evaluation.suggestedRewrites.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-200 p-5"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Original
              </p>

              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-600">
                {item.original}
              </p>

              <div className="my-5 border-t border-slate-100" />

              <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Improved Version
              </p>

              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
                {item.improved}
              </p>

              <div className="mt-5 rounded-lg bg-indigo-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                  Why this helps
                </p>

                <p className="mt-2 text-sm leading-relaxed text-indigo-950">
                  {item.reason}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    <p className="text-center text-xs text-slate-400">
      AI-generated feedback is advisory. Review all suggestions
      for accuracy before updating your resume.
    </p>

  </section>
)}



      </div>
    </main>
  );
}

export default EvaluateResume;
