import { useEffect, useRef, useState } from "react";

function LandingInfo() {
  const titles = ["Neural Network", "Convolutional NN", "Coming Soon!"];

  const descriptions = [
    "Experience the power of neural networks like never before! Use our interactive visualization tool to explore how each layer processes data, adjusts weights, and makes predictions—all in real time. See what happens behind the scenes and deepen your understanding of AI with an intuitive, hands-on experience.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea est eaque accusantium quia reiciendis minus expedita dolor deserunt fugiat totam similique dolorum, soluta dolorem vel? Sit error cum expedita accusantium.",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis, culpa minima! Recusandae excepturi aspernatur voluptatum. Quasi dolorum hic illo et culpa a cumque, ipsam possimus eius sit quod, neque pariatur.",
  ]

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayTitle, setDisplayTitle] = useState(titles[0]);
  const [displayDesc, setDisplayDesc] = useState(descriptions[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const lastScrollY = useRef(0);

  function matrixDisplayAnimation(newText:string, setter: any) {
    setIsAnimating(true);
    let iterations = 0;
    const maxIterations = 15;

    const interval = setInterval(() => {
      let scrambledText = newText.split("")
        .map((_letter, index: number) => {
          if(index < iterations / 2) {
            return newText[index];
          }

          return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,./<>?"[
            Math.floor(Math.random() * 83)
          ];
        })
        .join("");

        setter(scrambledText);

        iterations++;
        if(iterations > maxIterations) {
          clearInterval(interval);
          setter(newText);
          setIsAnimating(false);
        }
    }, 50);
  }

  useEffect(() => {
    function handleScroll() {
      if(isAnimating) return;

      const scrollY = window.scrollY;
      const scrollThreshold = 400;

      if(Math.abs(scrollY - lastScrollY.current) > scrollThreshold) {
        const scrollingDown = scrollY > lastScrollY.current;

        let nextIndex;
        if(scrollingDown) {
          nextIndex = (currentIndex + 1) % titles.length;
        } else {
          nextIndex = (currentIndex - 1 + titles.length) - titles.length;
        }

        matrixDisplayAnimation(titles[nextIndex], setDisplayTitle);

        setTimeout(() => {
          setDisplayDesc(descriptions[nextIndex]);
        }, 500);

        setCurrentIndex(nextIndex);
        lastScrollY.current = scrollY;
      }

    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [currentIndex, isAnimating, titles, descriptions]);

  function handleClick() {
    window.location.href = "http://localhost:5173/train";
  }

  return (
    <div className="sticky top-0 left-0 flex flex-col justify-center h-dvh">
      <div className=" w-1/2 mx-auto">
        <h1 className="mt-10 text-4xl font-mono text-gray-500">
          Visualization Tool:{" "}
          <span className="text-blue-800">{displayTitle}</span>
        </h1>
        <p className="text-lg my-10 text-gray-700">
          {displayDesc}
        </p>
        <button onClick={handleClick} className="w-1/2 mx-auto font-bold outline-3 outline-gray-400 p-4 text-gray-400 hover:cursor-pointer hover:text-black hover:bg-gray-200 transition-colors ease-in-out">
          GET STARTED
        </button>
      </div>
    </div>
  );
}

export default LandingInfo;
