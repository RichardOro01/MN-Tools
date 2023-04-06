import React from 'react'

export interface SeiderDataProps {
    matrix?: number[][];
    termInde?: number[]
    desp?: string[]
    despMatrix?: number[][];
    despTerm?: number[]
}

const SeiderData: React.FC<{data: SeiderDataProps}> = ({data}) => {
  return (
    <div>SeiderData</div>
  )
}

export default SeiderData