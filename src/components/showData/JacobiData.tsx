import React from 'react'

export interface JacobiDataProps {
    matrix?: number[][];
    termInde?: number[]
    desp?: string[]
    despMatrix?: number[][];
    despTerm?: number[]
}

const JacobiData: React.FC<{data: JacobiDataProps}> = ({data}) => {
  return (
    <div>
        <div className='flex flex-row gap-3'>
            <div>
                {data.matrix?.map((s)=><div>{s.map((ss)=><span>{ss} </span>)}</div>)}
            </div>
            <div>
                {data.termInde?.map((s)=><div>{s}</div>)}
            </div>
        </div>
        <div className='flex flex-row gap-3'>
            <div>
                {data.despMatrix?.map((s)=><div>{s.map((ss)=><span>{ss} </span>)}</div>)}
            </div>
            <div>
                {data.despTerm?.map((s)=><div>{s}</div>)}
            </div>
        </div>
    </div>
    
  )
}
export default JacobiData