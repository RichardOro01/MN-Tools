import { Input, Form, Button } from 'antd'
import React, { useState } from 'react'
import { df, fun } from '../utils';
import math from "mathjs"
import XYValuesPicker from '../commons/XYValuesPicker';

interface XY {
    x: number;
    y: number;
}

const NumericIntegration = () => {
    const [n, setN] = useState(10);
    const [interval, setInterval] = useState({a: 0, b: 10})
    const [equation, setEquation] = useState('');
    const [values, setValues] = useState([])
    const [byEq, setbyEq] = useState(true);
    const handleTrapecio = () => {
        const {a, b} = interval;
        console.log(n, interval, equation)
        const h = ((b - a) / n) || 0;
        console.log("h:", h);
        let points: XY[] = [];
        if (byEq) {
            for (let i = a; i<=b; i+=h) {
                points.push({x: i, y: fun(equation, i)})
            }
        } else {
            points = [...values]
        }
        
        console.log(points);
        let sum = 0;
        for (let i=a; i<=b; i+=h) {
            if (i===0 || i===b) {
                if (points !== undefined) {
                    const toSum = (points?.find((val)=>val.x===i)?.y) ?? 0
                    sum += toSum/2

                }
            } else {
                sum += points?.find((val)=>val.x===i)?.y ?? 0
            }
            
        }
        const df = h * sum;
        console.log(`df= ${h} * ${sum}`)
        console.log("df:", df);
        const tError = truncError(h);
        console.log("Trunc error: ", tError);
    }

    const truncError = (h: number) => {
        const {a, b} = interval;
        const df2 = df(equation, "c", 2);
        const min = fun(df2, a).toFixed(10);
        const max = fun(df2, b).toFixed(20);
        return `${(-1 * (b -a)/12) * Math.pow(h,2)} * ${df2} x[${a}, ${b}]  ${min} <= R <= ${max}` ;
    }

    const doubleCalcError = (h: number) => {
        
    }
  return (
    <div className='flex flex-col justify-center items-center w-full p-4'>
        <Form className='w-full flex flex-col items-center'>
            {byEq && 
                <Form.Item
                    className='w-full'
                    label="Ecuacion"
                    name="equation"
                >
                    <Input placeholder='x+2' onChange={(e)=>setEquation(e.target.value)} />
                </Form.Item>
            }
            {!byEq &&
                <XYValuesPicker {...{setValues}}/>
            }
            
            <Form.Item
                className='w-1/5'
                label="N"
                name="n"
            >
                <Input placeholder='10' onChange={(e)=>setN(Number(e.target.value))} />
            </Form.Item>
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
            
        </Form>
        
    </div>
  )
}

export default NumericIntegration