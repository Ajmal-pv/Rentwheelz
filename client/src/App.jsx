import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from "./Routes/User";
import Admin from "./Routes/Admin";
import { Suspense, lazy } from "react";
import NotFound from "./Pages/error/NotFound";

const Host = lazy(() => import("./Routes/Host"));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<User />} />
        <Route path="/host/*" element={<Suspense fallback={<h1>Loading..</h1>}><Host /></Suspense>} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
