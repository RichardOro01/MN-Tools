import { Input, Form, Button, FormInstance } from 'antd'
import React, { useState, useRef } from 'react'
import { df, fun } from '../utils';
import XYValuesPicker from '../commons/XYValuesPicker';
import DataPrinter from '../commons/DataPrinter';
import { assert } from 'console';

interface XY {
    x: number;
    y: number;
}

const NumericIntegration: React.FC = () => {
    const form = useRef<FormInstance>(null)
    const [byH, setByH] = useState(false);
    const [data, setData] = useState<string[]>([]);
    const [interval, setInterval] = useState({a: 0, b: 10})
    const [values, setValues] = useState([])
    const [byEq, setbyEq] = useState(true);
    const handleTrapecio = () => {
        setData([]);
        let {h, n, equation} = form.current?.getFieldsValue();
        const {a, b} = interval;
        console.log(n, interval, equation)
        if (!byH) {
            h = ((((b - a) / n) || 0));
            addData(`h = ((b - a) / n)`);
            addData(`h = ((${b} - ${a}) / ${n})`);
            addData(`h = ${h}`);
        } else {
            h = Number(h);
        }
        if (!(h>0)) return;
        if (a>b) return;
        if (!equation) return;
        console.log("h:", h);
        let points: XY[] = [];
        if (byEq) {
            addData(``);
            addData(`Opteniendo puntos`);
            let pointsString = "";
            for (let i = a; i<=b; i+=h) {
                points.push({x: Number(i.toFixed(4)), y: Number(fun(equation, i).toFixed(4))});
                pointsString += `(${Number(i.toFixed(4))}, ${fun(equation, i).toFixed(4)}) `
            }
            addData(pointsString);
            addData(``);
        } else {
            points = [...values]
        }
        
        console.log(points);
        let sum = 0;
        let sumString = "";
        for (let i=a; i<=b; i+=h) {
            if (i===0 || i===b) {
                if (points !== undefined) {
                    const toSum = (points?.find((val)=>val.x===i)?.y) ?? 0;
                    sum += toSum/2;
                    sumString += `(${toSum}/2) +`

                }
            } else {
                sum += points?.find((val)=>val.x===i)?.y ?? 0;
                sumString += `(${points?.find((val)=>val.x===i)?.y ?? 0}) +`
            }
            
        }
        sum = Number(sum.toFixed(4));
        sumString = sumString.substring(0,sumString.length-1);
        sumString += `= ${sum}`
        addData(sumString);
        const df = h * sum;
        addData("df = h * sum");
        addData(`df = ${h} * ${sum}`);
        addData(`df = ${df}`);
        console.log(`df= ${h} * ${sum}`)
        console.log("df:", df);
        const tError = truncError(equation, h);
        console.log("Trunc error: ", tError);
    }


    const truncError = (equation: string, h: number) => {
        addData("Error")
        const {a, b} = interval;
        const df2 = df(equation, "c", 2);
        addData(`df2 = df2(${equation})`);
        addData(`df2 = ${df2}`);
        const min = fun(df2, a).toFixed(10);
        addData(`df2 = ${df2}`);
        const max = fun(df2, b).toFixed(20);

        return `${(-1 * (b - a)/12) * Math.pow(h,2)} * ${df2} x[${a}, ${b}]  ${min} <= R <= ${max}` ;
    }

    const doubleCalcError = () => {
        
    }

    const addData = (dataToInsert: string) =>{
        setData((data)=>{
            return [...data, dataToInsert];
        })
    }
  return (
    <div className='flex flex-col justify-center items-center w-full p-4'>
        <div className='max-w-5xl flex flex-col items-center gap-8'>
            {!byEq && 
                <Button onClick={()=>setbyEq(true)}>
                    By Equation
                </Button>
            }
            {byEq && 
                <Button onClick={()=>setbyEq(false)}>
                    By Points
                </Button>
            }
            <Form className='max-w-full flex flex-col items-start' ref={form}>
                {byEq && 
                    <Form.Item
                        className='w-full'
                        label="Ecuacion"
                        name="equation"
                    >
                        <Input placeholder='x+2' />
                    </Form.Item>
                }
                {!byEq &&
                    <XYValuesPicker {...{setValues}}/>
                }
                <div className='flex flex-row gap-2'>
                    {!byH &&
                        <Form.Item
                            className='w-full'
                            label="N"
                            name="n"
                        >
                            <Input placeholder='10' />
                        </Form.Item>
                    }
                    {byH &&
                        <Form.Item
                            className='w-full'
                            label="H"
                            name="h"
                        >
                            <Input placeholder='10' />
                        </Form.Item>
                    }
                    <Button onClick={()=>setByH((isH)=>!isH)}>{byH? "by N": "by H"}</Button>
                </div>
                
                <Form.Item
                    className='w-1/2'
                    label="Intervalo"
                    name="interval"
                >
                    <div className='flex flex-row gap-2 items-center'>
                    <Input 
                        placeholder='0' 
                        onChange={(e)=>
                            {setInterval((interv)=>{
                                return {...interv, a: Number(e.target.value)}
                            })}
                        }
                    />
                    -
                    <Input 
                        placeholder='10' 
                        onChange={(e)=>
                            {setInterval((interv)=>{
                                return {...interv, b: Number(e.target.value)}
                            })}
                        }
                    />
                    </div>

                </Form.Item>
                <Button onClick={handleTrapecio}>Trapecios</Button>
                
                
            </Form>
            <DataPrinter {...{data}}/>
        </div>
        
        
    </div>
  )
}

export default NumericIntegration