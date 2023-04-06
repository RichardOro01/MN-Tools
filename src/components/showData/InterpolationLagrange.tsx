import React from 'react'
import { PickerProps } from '../commons/Picker'

export interface DataLagrange {
    lValues?: string[],
    nearValues?: PickerProps[];
    px?: string;
    error?: string[]; 
}

const InterpolationLagrange: React.FC<{data: DataLagrange}> = ({data}) => {
  return (
    <div>
        <div>
            {data.nearValues?.map((s)=><div>{s.x} {s.y}</div>)}
        </div>
        
        {data.lValues?.map((s)=><div>{s}</div>)}
        {data.px}
        {data.error?.map((s)=><div>{s}</div>)}
    </div>
  )
}

export default InterpolationLagrange