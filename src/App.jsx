import './App.css'
import {Routes, Route} from "react-router-dom";
import Home from "./components/pages/Home.jsx";

function App() {
    return (
        <Routes>
            <Route element={<Home />} path='/' />
        </Routes>
    )
}

export default App;
