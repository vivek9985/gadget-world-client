export const fadeIn = (direction, delay) => {
  return {
    hidden: {
      y: direction === "up" ? 30 : direction === "down" ? -30 : 0,
      x: direction === "left" ? 60 : direction === "right" ? -60 : 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.4,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.25],
      },
    },
  };
};