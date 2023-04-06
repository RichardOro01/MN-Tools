import React, { useState } from 'react'
import XYValuesPicker from '../commons/XYValuesPicker'
import Input from 'antd/es/input/Input'
import { Button, Form } from 'antd'
import { PickerProps } from '../commons/Picker'
import { df } from '../utils'
import { factorial } from 'mathjs'

const Interpolacion: React.FC = () => {
    const [values, setValues] = useState<PickerProps[]>([]);
    const [value, setValue] = useState(0);
    const [grade, setGrade] = useState(0);
    const [equation, setEquation] = useState('');
    const lagrange = () => {
        console.log(values);
        const nearValues = getNearValues().sort((a,b)=>a.x-b.x);
        console.log('valores cercanos: ', nearValues);
        const lValues = getLValues(nearValues);
        console.log('lValues:', lValues);
        const approximate = calculeLagrangeApproximate(lValues, nearValues);
        console.log(`p(${value}): ${approximate}`);
        const error = calculateErrorLagrange(nearValues);
        console.log('Error: ', error);
    }
    const newton = () => {
        console.log(values);
        const nearValues = getNearValues();
        console.log('valores cercanos: ', nearValues);
        const approximate = calculeNewtonApproximate(nearValues);
        console.log(`p(${value}): ${approximate}`);
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
        let sum = 0;
        for (let i=0; i<nearValues.length; i++) {
            let mult = 1;
            for (let j=0; j<i; j++){
                mult *= (value-nearValues[j].x);
            }
            sum += recursiveNewton(nearValues, 0, i) * mult;
        }
        return sum;
    }
    const recursiveNewton = (nearValues: PickerProps[], i: number, j: number): number => {
        if (i===j) {
            return nearValues[i].y;
        }
        return (recursiveNewton(nearValues, i+1, j) - recursiveNewton(nearValues, i, j-1))/(nearValues[j].x-nearValues[i].x);
    }

    //errors
    const calculateErrorLagrange = (nearValues: PickerProps[]) => {
        const Ms = [];
        for (let i=0; i<grade+1; i++) {
            Ms.push(df(equation, nearValues[i].x, i + 1))
            console.log(equation, value, i + 1)
        }
        const M = Math.max(...Ms);
        console.log('Ms: ', Ms);
        console.log('M: ', M);
        let mult = 1;
        for (let i=0; i<grade + 1; i++) {
            mult *= (value - nearValues[i].x);
        }
        const fact = factorial(grade+1);
        console.log('Factorial: ', fact);
        return ((M/fact)*Math.abs(mult));
    }
  return (
    <div className='flex flex-col w-full justify-center items-center pt-5 gap-4'>
        <Form className='w-1/2'>
        
            <Form.Item
                label='Ecuación'
            >
                <div className='flex flex-row gap-1 justify-center items-center'>
                    <div className='whitespace-nowrap'>
                        y = 
                    </div>
                    <Input placeholder='2x + 2' onChange={(e)=>setEquation(e.target.value)}/>
                </div>
            </Form.Item>
        </Form>
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