import React, { useState } from 'react'
import XYValuesPicker from '../commons/XYValuesPicker'
import Input from 'antd/es/input/Input'
import { Button, Form } from 'antd'
import { PickerProps } from '../commons/Picker'
import { df } from '../utils'
import { factorial } from 'mathjs'
import InterpolationLagrange, { DataLagrange } from '../showData/InterpolationLagrange'
import InterpolationNewton from '../showData/InterpolationNewton'

const Interpolacion: React.FC = () => {
    const [values, setValues] = useState<PickerProps[]>([]);
    const [value, setValue] = useState(0);
    const [grade, setGrade] = useState(0);
    const [equation, setEquation] = useState('');
    const [showLagrange, setShowLagrange] = useState(false);
    const [showNewton, setShowNewton] = useState(false);
    const [lagrangeData, setLagrangeData] = useState<DataLagrange>();
    const [newtonData, setNewtonData] = useState<any>({});
    const lagrange = () => {
        setShowLagrange(true);
        setShowNewton(false);
        console.log(values);
        const nearValues = getNearValues().sort((a,b)=>a.x-b.x);
        setLagrangeData((s: any)=>{return {...s, nearValues: nearValues}});
        console.log('valores cercanos: ', nearValues);
        console.log(lagrangeData);
        const lValues = getLValues(nearValues);
        console.log('lValues:', lValues);
        const approximate = calculeLagrangeApproximate(lValues, nearValues);
        console.log(`p(${value}): ${approximate}`);
        const error = calculateErrorLagrange(nearValues);
        console.log('Error: ', error);
    }
    const newton = () => {
        setShowNewton(true);
        setShowLagrange(false);
        console.log(values);
        const nearValues = getNearValues();
        console.log('valores cercanos: ', nearValues);
        const {approximate, apps} = calculeNewtonApproximate(nearValues);
        console.log(`p(${value}): ${approximate}`);
        const error = calculateErrorNewton(nearValues, apps);
        console.log('apps: ', apps);
        console.log('Error: ', error);
        return approximate;
    }

    const getNearValues = (): PickerProps[] => {
        const resultValues = [];
        const valuesCopy = [...values];
        for (let i=0; i<=grade; i++) {
            let difs: number[] = [];
            let links: any = {}
            for (let j=0; j<valuesCopy.length; j++) {
                const dif = Math.abs(valuesCopy[j].x-value);
                difs.push(dif);
                links[`${dif}`] = j;
            }
            const min = Math.min(...difs);
            resultValues.push(valuesCopy[links[min]]);
            valuesCopy.splice(links[min], 1);
        }
        return resultValues;
    }

    const getLValues = (nearValues: PickerProps[]) => {
        const lValues = [];
        let strs: string[] = [];
        for (let i=0; i<nearValues.length; i++) {
            let str =  `L${i}(${value}) = ( `;
            let mult1 = 1;
            for (let j=0; j<nearValues.length; j++) {
                if (j!==i) {
                    mult1 *= (value-nearValues[j].x);
                    str += `(${value} - ${nearValues[j].x}) `
                }
            }
            str += ') / ';
            let mult2 = 1;
            for (let j=0; j<nearValues.length; j++) {
                if (j!==i) {
                    mult2 *= (nearValues[i].x-nearValues[j].x);
                    str += `(${nearValues[i].x} - ${nearValues[j].x}) `
                }
            }
            str += ` = ${mult1/mult2}`
            strs.push(str);
            lValues.push(mult1/mult2);
        }
        console.log(strs);
        setLagrangeData((s: any)=>{return{...s,lValues: strs}});
        return lValues;
    }
    const calculeLagrangeApproximate = (lValues: number[], nearValues: PickerProps[]) => {
        let sum = 0;
        let str = `p${grade}(${value}) = `; 
        for (let i=0; i<lValues.length; i++) {
            sum += nearValues[i].y * lValues[i];
            str += `${i===0?'':' +'} (${nearValues[i].y} * ${lValues[i]})`
        }
        str += ` = ${sum}`
        setLagrangeData((s: any)=>{return{...s,px: str}});
        return sum;
    }
    const calculeNewtonApproximate = (nearValues: PickerProps[]) => {
        let sum = 0;
        let apps = [];
        for (let i=0; i<nearValues.length; i++) {
            let mult = 1;
            let str = "";
            for (let j=0; j<i; j++){
                mult *= (value-nearValues[j].x);
                str += `(${value} - ${nearValues[j].x})`
            }
            let app = recursiveNewton(nearValues, 0, i) * mult;
            sum += app;
            str = `${app} * ${str} `
            console.log(str);
            apps.push(sum);
        }
        return {approximate: sum, ...{apps}};
    }
    const recursiveNewton = (nearValues: PickerProps[], i: number, j: number): number => {
        if (i===j) {
            console.log(`f(${i}) = ${nearValues[i].y}`)
            return nearValues[i].y;
        }
        console.log(`f(${i}, ${j}) = (${recursiveNewton(nearValues, i+1, j)} - ${recursiveNewton(nearValues, i, j-1)}) / (${nearValues[j].x} - ${nearValues[i].x})`);
        return (recursiveNewton(nearValues, i+1, j) - recursiveNewton(nearValues, i, j-1))/(nearValues[j].x-nearValues[i].x);
    }

    //errors
    const calculateErrorLagrange = (nearValues: PickerProps[]) => {
        const Ms = [];
        let strs: string[] = [];
        
        for (let i=0; i<grade+1; i++) {
            let str = '';
            let vdf = df(equation, nearValues[i].x, i + 1);
            Ms.push(vdf);
            str += `df${i + 1}(${equation}) (x = ${nearValues[i].x}) = ${vdf}`
            strs.push(str);
        }
        const M = Math.max(...Ms);
        console.log('Ms: ', Ms);
        console.log('M: ', M);
        strs.push(`M = max: ${M}`);
        let str = '';
        let mult = 1;
        for (let i=0; i<grade + 1; i++) {
            mult *= (value - nearValues[i].x);
            str += `(${value} - ${nearValues[i].x})`
        }
        const fact = factorial(grade+1);
        const err = (M/fact)*Math.abs(mult)
        strs.push(`Error = (${M} / ${fact}) ${str} = ${err}`);
        console.log('Factorial: ', fact);
        setLagrangeData((s: any)=>{return{...s,error: strs}});
        return (err);
    }

    const calculateErrorNewton = (nearValues: PickerProps[], apps: number[]) => {
        // return recursiveErrorNewton(nearValues, apps, grade + 1);
        return Math.abs(apps[grade]-apps[grade-1])
    }
    const recursiveErrorNewton = (nearValues: PickerProps[], apps: number[], n: number): number => {
        if (n===0) {
            return nearValues[n].y;
        }
        return recursiveErrorNewton(nearValues, apps, n-1) + apps[n-1];
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
        {showLagrange && <InterpolationLagrange data={lagrangeData as DataLagrange}/>}
        {showNewton && <InterpolationNewton/>}
    </div>
  )
}

export default Interpolacion