
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import GenerateResume from "./pages/GenerateResume";
import EvaluateResume from "./pages/EvaluateResume";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-resume" element={<GenerateResume />} />
        <Route path="/evaluate-resume" element={<EvaluateResume />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
