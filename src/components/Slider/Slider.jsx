import "./Slider.css"
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const slides = [
  "https://cdn.discordapp.com/attachments/1008636085250826301/1127946316224413828/2.jpg",
  "https://cdn.discordapp.com/attachments/1008636085250826301/1127946379021537410/4.jpg",
  "https://cdn.discordapp.com/attachments/1008636085250826301/1127946343848083496/3.jpg",
  "https://cdn.discordapp.com/attachments/1008636085250826301/1127946282980343909/1.jpg"
];

function Slider() {
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setSelectedImage((selectedImage) =>
        selectedImage < 2 ? selectedImage + 1 : 0
      );
    }, 4000);
  }, []);

  return (
    <div className="slider-container">
      <Link to="/store">
        <img src={slides[selectedImage]} alt={`banner${selectedImage + 1}`} />
      </Link>
    </div>
  );
}

export default Slider;