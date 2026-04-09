export default function StaggerText({ text }) {
  return (
    <>
      {[...text].map((char, i) => (
        <span
          key={i}
          className="char"
          style={{ transitionDelay: `${i * 0.015}s` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </>
  )
}
