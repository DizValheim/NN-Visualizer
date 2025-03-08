import { useEffect, useRef, useState } from "react";
import nn_img from "../assets/Neural_Network.png";
import cnn_img from "../assets/CNN_img.png";
import cs_img from "../assets/Coming_Soon.png";

function Slider() {
  const imgs = [nn_img, cnn_img, cs_img];
  const imgRefs = useRef<HTMLImageElement[]>([]);
  const divRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Set up refs for images
  const setImageRef = (el: HTMLImageElement | null, index: number) => {
    if (el && imgRefs.current) {
      imgRefs.current[index] = el;
    }
  };

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
    console.log(scrollPosition);
    
    const triggerPoint = window.innerHeight / 2; 
    
    imgRefs.current.forEach((img, index) => {
      if (!img) return;
      
      const threshold = triggerPoint + (index * 400); // 400px stagger 

      if (scrollPosition > threshold) {
        img.style.transform = `translateY(-120vh) rotate(-48deg)`;
        img.style.opacity = "0";
      } else {
        img.style.transform = `translateY(0) rotate(0)`;
        img.style.opacity = index === 0 || (index > 0 && scrollPosition > (triggerPoint + ((index - 1) * 400))) ? "1" : "0";
      }
    });
  };

  useEffect(() => {
    imgRefs.current = imgRefs.current.slice(0, imgs.length);
    
    // Add listener for scroll event
    window.addEventListener("scroll", handleScroll);
    
    // Initial Setup
    handleScroll();
    
    // Remove after done
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [imgs.length, scrollPosition]);

  return (
    <div ref={divRef} className="sticky top-0 right-0 h-screen">
      {imgs.map((src, index) => (
        <img
          key={index}
          ref={(el) => setImageRef(el, index)}
          className="absolute top-[calc(50%-200px)] left-[calc(50%-200px)] transition-all duration-1000 ease-in-out"
          style={{
            zIndex: imgs.length - index,
            transform: "translateY(0) rotate(0)",
            opacity: index === 0 ? "1" : "0",
          }}
          height={400}
          width={400}
          src={src}
          alt={`Image ${index + 1}`}
        />
      ))}
    </div>
  );
}

export default Slider;