import React, { useState, useEffect, ReactElement } from 'react'
import Picker, { PickerProps } from './Picker';
import { Button } from 'antd/es/radio';

const XYValuesPicker: React.FC<{ setValues: (a: any)=>void }> = ({setValues}) => {
    const [pickers, setPickers] = useState<ReactElement[] | []>([]);
    useEffect(() => {
        for (let i=0; i<4; i++){
            setPickers((p)=>{
                return [
                    ...p, 
                    <Picker 
                        handlePicker={(xy)=>handlePicker(xy,i)}
                        key={i}
                    />
                ]
            })
        }
    }, [])

    const handlePicker = ( xy: PickerProps, pos: number ) => {
        setValues((a : PickerProps[])=> 
            {
                a[pos]=xy;
                return [...a];
            }
        )
    }

    const addPicker = () => {
        setPickers((p)=>{
            return [...p, <Picker key={p.length} handlePicker={(xy)=>handlePicker(xy,p.length)}/>]
        })
    }
    
    const popPicker = () => {
        setPickers((p)=>{
            return [...p.slice(0,p.length-1)]
        })
        setValues((v: PickerProps[])=>{
            return [...v.slice(0,v.length-1)]
        })
    }
    
  return (
    <div className='flex flex-row bg-slate-200 rounded py-3 px-6 w-1/2 self-center'>
        <div className='flex flex-col mr-3'>
            <div>
                x
            </div>
            <div>
                y
            </div>
        </div>
        {pickers.map((picker)=>picker)}
        <div className='flex flex-col mr-3'>
            <Button onClick={addPicker}>+</Button>
            <Button onClick={popPicker}>-</Button>
        </div>
    </div>
  )
}

export default XYValuesPicker