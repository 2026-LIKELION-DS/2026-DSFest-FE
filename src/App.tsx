// import "./App.css";

// function App() {
//   return (
//     <>
//       <h1>Hello React</h1>
//     </>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";

import ArtistPage from "./routes/Artist";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/artist" element={<ArtistPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
