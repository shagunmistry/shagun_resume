export function BoundingBoxSVG() {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#f0f0f0" />

      <path
        d="M180 70 C180 55, 220 55, 220 70 C220 85, 200 85, 200 85 L200 130 L220 180 L200 180 L200 250 L180 250 L180 180 L160 180 L180 130 Z"
        fill="#666666"
        opacity="0.3"
      />

      <rect
        x="150"
        y="50"
        width="100"
        height="210"
        fill="none"
        stroke="#ff0000"
        stroke-width="2"
        stroke-dasharray="5,5"
      />

      <path
        d="M180 70 C180 55, 220 55, 220 70 C220 85, 200 85, 200 85 L200 130 L220 180 L200 180 L200 250 L180 250 L180 180 L160 180 L180 130 Z"
        fill="none"
        stroke="#0000ff"
        stroke-width="2"
      />

      <text x="260" y="100" font-family="Arial" font-size="14">
        Bounding Box
      </text>
      <path
        d="M250 95 L160 95"
        stroke="#ff0000"
        stroke-width="1"
        stroke-dasharray="5,5"
      />

      <text x="260" y="140" font-family="Arial" font-size="14">
        Instance Mask
      </text>
      <path d="M250 135 L200 135" stroke="#0000ff" stroke-width="1" />

      <text x="135" y="40" font-family="Arial" font-size="12">
        (x₁,y₁)
      </text>
      <text x="255" y="270" font-family="Arial" font-size="12">
        (x₂,y₂)
      </text>
    </svg>
  )
}
