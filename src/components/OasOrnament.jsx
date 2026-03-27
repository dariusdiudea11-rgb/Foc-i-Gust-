export default function OasOrnament({ variant = 'light' }) {
  const strokeColor = variant === 'light' ? 'rgba(196,30,58,0.2)' : 'rgba(196,30,58,0.15)'
  return (
    <div className="flex justify-center py-2">
      <svg viewBox="0 0 220 20" fill="none" xmlns="http://www.w3.org/2000/svg"
        width="220" height="20" aria-hidden="true">
        {[0, 40, 80, 120, 160].map((x) => (
          <g key={x} transform={`translate(${x}, 0)`}>
            <path d="M20 1 L39 10 L20 19 L1 10 Z" stroke={strokeColor} strokeWidth="1" fill="none"/>
            <line x1="20" y1="1" x2="20" y2="19" stroke={strokeColor} strokeWidth="0.5"/>
            <line x1="1"  y1="10" x2="39" y2="10" stroke={strokeColor} strokeWidth="0.5"/>
            <circle cx="20" cy="10" r="1.5" fill={strokeColor}/>
          </g>
        ))}
      </svg>
    </div>
  )
}
