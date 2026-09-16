import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Books from "./pages/Books";
import Login from "./pages/Login";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/books" />} />

                <Route path="/login" element={<Login />} />

                <Route path="/books" element={<Books />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;