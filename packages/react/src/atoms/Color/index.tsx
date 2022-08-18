import React from 'react'
import { Spacing } from "@ds.e/foundation";
interface ColorProps {
  hexCode: string
  height: keyof typeof Spacing
  width: keyof typeof Spacing
}
const Color: React.FC<ColorProps> = ({ hexCode, height = Spacing.sm, width = Spacing.sm}) => {
  return (
    <div className={`dse-width-${width} dse-height-${height}`} style={{
      backgroundColor: hexCode,
    }}>
    </div>
  )
}

export default Color