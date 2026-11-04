import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import scientist from '../assets/hero/scientist.webp';
import programmer from '../assets/hero/programmer.webp';

// The two "modes" of the hero portrait. The face sits in the same spot in both images,
// so a slow crossfade makes it look like only the world around her changes.
const MODES = [
  { src: scientist, alt: 'Sketch of Mary Kate in a lab coat, holding a pipette', glow: '167, 139, 250' }, // purple = biology
  { src: programmer, alt: 'Sketch of Mary Kate coding on a laptop', glow: '124, 200, 245' },              // cyan = software
];

const HOLD_MS = 5000; // how long each image stays before switching
const FADE_S = 1.6;   // length of the crossfade

export default function HeroPortrait() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % MODES.length), HOLD_MS);
    return () => window.clearInterval(id);
  }, [paused, reduceMotion]);

  const mode = MODES[index];

  return (
    // Phones: full width. Large screens: as tall as the hero text block, width follows the image shape.
    <div
      className="relative mx-auto aspect-[696/694] w-full max-w-md lg:absolute lg:inset-y-0 lg:-right-8 xl:-right-16 lg:w-auto lg:max-w-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Soft glow behind her, purple in the lab and cyan at the laptop. */}
      <motion.div
        aria-hidden
        className="absolute inset-[8%] rounded-full blur-3xl"
        animate={{ backgroundColor: `rgba(${mode.glow}, 0.22)` }}
        transition={{ duration: FADE_S, ease: 'easeInOut' }}
      />
      {/* Fade the desk's left, right and bottom edges so it melts into the page. */}
      {/* brightness(0.85) tones the sketches down slightly; 1 = original strength. */}
      <div className="portrait-fade absolute inset-0 brightness-[0.85]">
        <AnimatePresence initial={false}>
          <motion.img
            key={mode.src}
            src={mode.src}
            alt={mode.alt}
            className="absolute inset-0 h-full w-full object-contain select-none"
            draggable={false}
            initial={{ opacity: 0, filter: 'blur(6px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: FADE_S, ease: 'easeInOut' }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
