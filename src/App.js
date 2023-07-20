import "./App.css";
import NavRoutes from "../src/routes/NavRoutes";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/NavBar/NavBar";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <>
    <Navbar />
    <Toaster
        position="top-right"
        reverseOrder={false}
        containerStyle={{
          top: "5rem",
        }}
      />
    <NavRoutes />
    <Footer />
    </>
  );
}

export default App;
