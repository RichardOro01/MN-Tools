import Input from 'antd/es/input/Input'
import React from 'react'

export interface PickerProps {
    x: number,
    y: number
}

const Picker: React.FC<{ handlePicker: ({x, y}: PickerProps )=>void }> = ({handlePicker}) => {
    let xy = {x: 0, y: 0};
    const handleX = (e: any) => {
        xy = {...xy, x: Number(e.target.value)};
        handlePicker(xy);
    }
    const handleY = (e: any) => {
        xy = {...xy, y: Number(e.target.value)};
        handlePicker(xy);
    }
  return (
    <div className='flex flex-col'>
        <Input onChange={handleX}/>
        <Input onChange={handleY}/>
    </div>
  )
}

export default Picker