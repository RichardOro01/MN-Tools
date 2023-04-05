import React, { useState } from 'react'
import XYValuesPicker from '../commons/XYValuesPicker'
import Input from 'antd/es/input/Input'
import { Button } from 'antd'
import { PickerProps } from '../commons/Picker'

const Interpolacion: React.FC = () => {
    const [values, setValues] = useState<PickerProps[]>([]);
    const [value, setValue] = useState(0);
    const [grade, setGrade] = useState(0);
    const lagrange = () => {
        console.log(values);
        const nearValues = getNearValues().sort((a,b)=>a.x-b.x);
        console.log('valores cercanos: ', nearValues);
        const lValues = getLValues(nearValues);
        console.log('lValues:', lValues);
        const approximate = calculeLagrangeApproximate(lValues, nearValues);
        console.log(`p(${value}: ${approximate})`);
    }
    const newton = () => {
        console.log(values);
        const nearValues = getNearValues();
        console.log('valores cercanos: ', nearValues);
        const approximate = calculeNewtonApproximate(nearValues);
        console.log(`p(${value}: ${approximate})`);
    }

    const getNearValues = (): PickerProps[] => {
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

    const getLValues = (nearValues: PickerProps[]) => {
        const lValues = [];
        for (let i=0; i<nearValues.length; i++) {
            let mult1 = 1;
            for (let j=0; j<nearValues.length; j++) {
                if (j!==i) {
                    mult1 *= (value-nearValues[j].x);
                }
            }
            let mult2 = 1;
            for (let j=0; j<nearValues.length; j++) {
                if (j!==i) {
                    mult2 *= (nearValues[i].x-nearValues[j].x);
                }
            }
            lValues.push(mult1/mult2);
        }
        return lValues;
    }
    const calculeLagrangeApproximate = (lValues: number[], nearValues: PickerProps[]) => {
        let sum = 0;
        for (let i=0; i<lValues.length; i++) {
            sum += nearValues[i].y * lValues[i];
        }
        return sum;
    }
    const calculeNewtonApproximate = (nearValues: PickerProps[]) => {
        let app = recursiveNewton(nearValues, 0, grade);
        return app;
    }
    const recursiveNewton = (nearValues: PickerProps[], i: number, j: number) =>{

    }
  return (
    <div className='flex flex-col w-full justify-center items-center pt-5 gap-4'>
        <XYValuesPicker {...{setValues}}/>
        <div className='flex flex-row gap-2'>
            <div>
                Value: <Input onChange={(e: any)=>{setValue(Number(e.target.value))}}/>
            </div>
            <div>
                Grade: <Input onChange={(e: any)=>{setGrade(Number(e.target.value))}}/>
            </div>
        </div>
        <div className='flex flex-row gap-2'>
            <Button onClick={lagrange}>Lagrange</Button>
            <Button onClick={newton}>Newton</Button>
        </div>
    </div>
  )
}

export default Interpolacion