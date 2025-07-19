
/**
 * @component FloatingCircles
 * @description
 * A React component that renders floating circles for visual effect in the hero section.
 */

export default function FloatingCircles() {
  return (
    <>
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
      <div className="absolute top-20 right-20 w-16 h-16 bg-white/10 rounded-full animate-float-delayed"></div>
      <div className="absolute bottom-10 left-20 w-12 h-12 bg-white/10 rounded-full animate-float"></div>
    </>
  );
}
