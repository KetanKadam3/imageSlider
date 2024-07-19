import React, { useEffect, useRef, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IconButton } from "@mui/material";

function App() {
    const [index, setIndex] = useState(0);
    const [hover, setHover] = useState(true);
    const intervalRef = useRef();
    const stocks = [
      "https://watermark.lovepik.com/photo/20211121/large/lovepik-the-beauty-of-the-sky-and-the-sunflower-sea-picture_500622148.jpg",
      "https://peterorsel.com/wp-content/uploads/2023/01/benjamin-voros-phIFdC6lA4E-unsplash.jpg",
      "https://empirics.asia/storage/2018/09/itsgreatoutthere-unsplash-03.jpg",
      "https://pressbooks.cuny.edu/app/uploads/sites/93/2022/08/thanuj-mathew-8CSTVoDMEXg-unsplash-scaled.jpg",
      "https://images.pexels.com/photos/33045/lion-wild-africa-african.jpg",
      "https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg",
      "https://images.pexels.com/photos/1421903/pexels-photo-1421903.jpeg",
      "https://images.pexels.com/photos/1612351/pexels-photo-1612351.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ];
  
    const handleNext = () => {
      setIndex((index + 1) % stocks.length === 0 ? 0 : index + 1);
    };
  
    const handlePrevious = () => {
      setIndex(index - 1 < 0 ? stocks.length - 1 : index - 1);
    };
  
    useEffect(() => {
      const startInterval = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
          setIndex((prevIndex) => (prevIndex + 1) % stocks.length);
        }, 1000);
      };
  
      const clearSliderInterval = () => clearInterval(intervalRef.current);
  
      const slider = document.getElementById("slider");
      slider.addEventListener("mouseenter", clearSliderInterval);
      slider.addEventListener("mouseleave", startInterval);
  
      startInterval();
  
      return () => {
        clearSliderInterval();
        slider.removeEventListener("mouseenter", clearSliderInterval);
        slider.removeEventListener("mouseleave", startInterval);
      };
    }, []);
  
    const imgStyle = {
      width: "70px",
      height: "150px",
      borderRadius: "10px",
      border: "2px solid black",
      display: "block",
      cursor: "pointer",
      objectFit: "cover",
      boxShadow: "0 0 10px 0 white",
      filter: "grayscale(1)",
    };
  
    const hoverStyle = {
      transform: hover ? "scale(1.2)" : "scale(1)",
      transition: "all 0.5s ease",
      border: hover ? "2px solid white" : "none",
      filter: hover ? "grayscale(0)" : "grayscale(1)",
      boxShadow: hover ? "0 0 15px 0 yellow" : "0 0 15px 0 white",
    };
  
    return (
      <div
        style={{
          backgroundImage: `url(${stocks[index]})`,
          position: "relative",
          backgroundColor: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
          backdropFilter: "blur(5px)",
        }}
      >
        <div
          style={{
            height: "600px",
            width: "800px",
            maxWidth: "80%",
            maxHeight: "80%",
            padding: "25px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 0 15px 0 white",
            zIndex: 999,
          }}
          id="slider"
        >
          <div
            style={{
              backgroundImage: `url(${stocks[index]})`,
              height: "100%",
              width: "100%",
  
              backgroundSize: "cover",
              backgroundPosition: "center",
  
              position: "relative",
            }}
          >
            <h1
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "clamp(3rem, 5vw, 5rem)",
                textShadow: "0 0 10px black",
                margin: "0",
                padding: "60px",
              }}
            >
              Image Slider{" "}
            </h1>
            <div
              style={{
                display: "flex",
                gap: "30px",
                justifyContent: "center",
                position: "absolute",
                bottom: "0px",
  
                left: "50%",
                transform: "translateX(-50%)",
                width: "70%",
                padding: "40px",
                borderRadius: "10px",
                overflowX: "scroll",
                scrollbarWidth: "none",
              }}
            >
              {stocks?.map((item, imgindex) => (
                <img
                  key={imgindex}
                  src={item}
                  style={
                    hover && imgindex === index
                      ? { ...imgStyle, ...hoverStyle }
                      : imgStyle
                  }
                  onMouseOver={() => {
                    setHover(true);
                    setIndex(imgindex);
                  }}
                  onMouseDown={() => {
                    setHover(false);
                    setIndex(imgindex);
                  }}
                />
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "80%",
                gap: "30px",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            >
              <IconButton sx={{ float: "left" }} onClick={handlePrevious}>
                <ArrowBackIosIcon
                  color="primary"
                  fontSize="large"
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = "#0096c7";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "white";
                  }}
                  sx={{
                    filter: "drop-shadow(2px 2px 10px black)",
                    color: "white",
                  }}
                />
              </IconButton>
              <IconButton sx={{ float: "right" }} onClick={handleNext}>
                <ArrowForwardIosIcon
                  color="primary"
                  fontSize="large"
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = "#0096c7";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "white";
                  }}
                  sx={{
                    filter: "drop-shadow(2px 2px 10px black)",
                    color: "white",
                  }}
                />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    );
}

export default App




