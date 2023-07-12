import "./App.css";
import NavRoutes from "../src/routes/NavRoutes";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/NavBar/NavBar";

function App() {
  return (
    <>
    <Navbar />
    <NavRoutes />
    <Footer />
    </>
  );
}

export default App;
