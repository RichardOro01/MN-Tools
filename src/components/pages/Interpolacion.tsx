import React, { useState } from 'react'
import XYValuesPicker from '../commons/XYValuesPicker'
import Input from 'antd/es/input/Input'
import { Button } from 'antd'
import { PickerProps } from '../commons/Picker'

const Interpolacion: React.FC = () => {
    const [values, setValues] = useState<PickerProps[]>([]);
    const lagrange = () => {
        console.log(values);
        console.log(getNearValues());
    }
    let value = 0;
    let grade = 0;

    const getNearValues = () => {
        const resultValues = [];
        const valuesCopy = [...values];
        for (let i=0; i<=grade; i++) {
            console.log(i)
            if (i%2===0) {
                
                for (let j=0; j<valuesCopy.length; j++) {
                    if (valuesCopy[j].x>=value || j===valuesCopy.length-1) {
                        resultValues.push(valuesCopy[j]);
                        valuesCopy.splice(j, 1);
                        break;
                    }
                }
            } else {
                for (let j=valuesCopy.length-1; j>=0; j--) {
                    if (valuesCopy[j].x<=value || j===0) {
                        resultValues.push(valuesCopy[j]);
                        valuesCopy.splice(j, 1);
                        break;
                    }
                }
            }
        }
        return resultValues;
    }
  return (
    <div className='flex flex-col w-full justify-center items-center pt-5 gap-4'>
        <XYValuesPicker {...{setValues}}/>
        <div className='flex flex-row gap-2'>
            <div>
                Value: <Input onChange={(e: any)=>{value=Number(e.target.value)}}/>
            </div>
            <div>
                Grade: <Input onChange={(e: any)=>{grade=Number(e.target.value)}}/>
            </div>
        </div>
        <div className='flex flex-row gap-2'>
            <Button onClick={lagrange}>Lagrange</Button>
            <Button>Newton</Button>
        </div>
    </div>
  )
}

export default Interpolacion