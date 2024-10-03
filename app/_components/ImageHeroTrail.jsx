'use client'
import { useAnimate } from "framer-motion";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FiArrowDownCircle, FiDollarSign } from "react-icons/fi";
import { SiApple } from "react-icons/si";

export const ImageTrailHero = () => {
  return (
   
      <section className="h-screen mb-10 overflow-hidden bg-slate-200 rounded-xl">
        
        <Copy />
        <WatermarkWrapper />
      </section>
  );
};

;

const Copy = () => {
  return (
    <div className="absolute p-3 justify-end z-[999999]">
      <div className="mx-auto flex max-w-7xl items-end justify-between p-4 md:p-8">
        <div>
          <h1 className="mb-6 moyo max-w-4xl text-6xl font-black leading-[1.1] text-slate-900 md:text-9xl">
            MOYO 
          </h1>
          <h1 className="mb-6 max-w-4xl text-6xl font-black leading-[1.1] text-slate-900 md:text-6xl">
            Everyone deserves the <span className="text-indigo-500">Best</span>
            <span className="text-[25px] ">™</span>
          </h1>
          <p className="max-w-xl text-slate-700 md:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            optio quam voluptates accusantium unde labore maiores delectus
            tempora velit cum.
          </p>
        </div>
        <FiArrowDownCircle className="hidden text-8xl text-slate-500 md:block" />
      </div>
    </div>
  );
};

const WatermarkWrapper = () => {
  return (
    <>
      <Watermark text="MOYO MOYO MOYO" />
      <Watermark text="MOYO MOYO MOYO" reverse />
      <Watermark text="MOYO MOYO MOYO" />
      <Watermark text="MOYO MOYO MOYO" reverse />
      <Watermark text="MOYO MOYO MOYO" />
      <Watermark text="MOYO MOYO MOYO" reverse />
      <Watermark text="MOYO MOYO MOYO" />
      <Watermark text="MOYO MOYO MOYO" reverse />
    </>
  );
};

const Watermark = ({ reverse, text }) => (
  <div className="flex -translate-y-12 select-none overflow-hidden">
    <TranslateWrapper reverse={reverse}>
      <span className="w-fit whitespace-nowrap text-[20vmax] font-custom font-black uppercase moyo leading-[0.75] text-slate-300">
        {text}
      </span>
    </TranslateWrapper>
    <TranslateWrapper reverse={reverse}>
      <span className="ml-48 w-fit whitespace-nowrap text-[20vmax] moyo font-black uppercase leading-[0.75] text-slate-300">
        {text}
      </span>
    </TranslateWrapper>
  </div>
);

const TranslateWrapper = ({ children, reverse }) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? "-100%" : "0%" }}
      animate={{ translateX: reverse ? "0%" : "-100%" }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="flex"
    >
      {children}
    </motion.div>
  );
};

const MouseImageTrail = ({
  children,
  // List of image sources
  images,
  // Will render a new image every X pixels between mouse moves
  renderImageBuffer,
  // images will be rotated at a random number between zero and rotationRange,
  // alternating between a positive and negative rotation
  rotationRange,
}) => {
  const [scope, animate] = useAnimate();

  const lastRenderPosition = useRef({ x: 0, y: 0 });
  const imageRenderCount = useRef(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;

    const distance = calculateDistance(
      clientX,
      clientY,
      lastRenderPosition.current.x,
      lastRenderPosition.current.y
    );

    if (distance >= renderImageBuffer) {
      lastRenderPosition.current.x = clientX;
      lastRenderPosition.current.y = clientY;

      renderNextImage();
    }
  };

  const calculateDistance = (x1, y1, x2, y2) => {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;

    // Using the Pythagorean theorem to calculate the distance
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    return distance;
  };

  const renderNextImage = () => {
    const imageIndex = imageRenderCount.current % images.length;
    const selector = `[data-mouse-move-index="${imageIndex}"]`;

    const el = document.querySelector(selector);

    el.style.top = `${lastRenderPosition.current.y}px`;
    el.style.left = `${lastRenderPosition.current.x}px`;
    el.style.zIndex = imageRenderCount.current.toString();

    const rotation = Math.random() * rotationRange;

    animate(
      selector,
      {
        opacity: [0, 1],
        transform: [
          `translate(-50%, -25%) scale(0.5) ${
            imageIndex % 2
              ? `rotate(${rotation}deg)`
              : `rotate(-${rotation}deg)`
          }`,
          `translate(-50%, -50%) scale(1) ${
            imageIndex % 2
              ? `rotate(-${rotation}deg)`
              : `rotate(${rotation}deg)`
          }`,
        ],
      },
      { type: "spring", damping: 15, stiffness: 200 }
    );

    animate(
      selector,
      {
        opacity: [1, 0],
      },
      { ease: "linear", duration: 0.5, delay: 1 }
    );

    imageRenderCount.current = imageRenderCount.current + 1;
  };

  return (
    <div
      ref={scope}
      className="relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {children}

      {images.map((img, index) => (
        <img
          className="pointer-events-none absolute left-0 top-0 h-36 w-auto rounded-xl border-2 border-slate-900 bg-slate-800 object-cover opacity-0"
          src={img}
          alt={`Mouse move image ${index}`}
          key={index}
          data-mouse-move-index={index}
        />
      ))}
    </div>
  );
};
