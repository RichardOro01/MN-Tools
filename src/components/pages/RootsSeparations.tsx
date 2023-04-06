import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'

const RootsSeparations: React.FC = () => {
    const [equation, setEquation] = useState('');
    const [values, setValues] = useState([0,0])
    const [iterations, setIterations] = useState(4);
    const [error, setError] = useState(0.003);

    const bisection = () =>{
        console.log(equation, values);
        let [a, b] = [...values];
        if (fun(a) * fun(b) < 0) {
            for (let i=0; i<iterations; i++) {
                let x = (a + b) / 2;
                let fx = fun(x);
                if (fx===0) {
                    console.log(x);
                } else if (fx * fun(a) < 0) {
                    b = x;
                } else {
                    a = x;
                }  
                console.log(`it ${i+1}:`, [a, b])
            }
        } else {
            console.log('No se cumple Bolsano!')
        }
    }

    const regulaFalsi = () =>{
        console.log(equation, values);
        let [a, b] = [...values];
        if (fun(a) * fun(b) < 0) {
            for (let i=0; i<iterations; i++) {
                let fa = fun(a)
                let fb = fun(b)
                let x = a - ((b - a) / (fb - fa)) * fa;
                let fx = fun(x);
                if (fx===0) {
                    console.log(x);
                } else if (fx * fa < 0) {
                    b = x;
                } else {
                    a = x;
                }  
                console.log(`it ${i+1}:`, [a, b])
            }
        } else {
            console.log('No se cumple Bolsano!')
        }
    }
    const newton = () =>{
        console.log(equation, values);
        let [a, b] = [...values];
        if (fun(a) * fun(b) < 0) {
            for (let i=0; i<iterations; i++) {
                let fa = fun(a)
                let fb = fun(b)
                let x = a - ((b - a) / (fb - fa)) * fa;
                let fx = fun(x);
                if (fx===0) {
                    console.log(x);
                } else if (fx * fa < 0) {
                    b = x;
                } else {
                    a = x;
                }  
                console.log(`it ${i+1}:`, [a, b])
            }
        } else {
            console.log('No se cumple Bolsano!')
        }
    }
    const secant = () =>{
        console.log(equation);
    }

    const fun = (x: number) => {
        return eval(equation.replace(' ',''));
    }

  return (
    <div className='flex flex-col justify-center items-center w-full p-4'>
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
            <Form.Item
                label='Intervalo | puntos'
            >
                <div className='flex flex-row gap-2 w-1/2'>
                    <Input placeholder='2' onChange={(e)=>setValues((val)=>[Number(e.target.value),val[1]])}/>
                    <Input placeholder='3' onChange={(e)=>setValues((val)=>[val[0],Number(e.target.value)])}/>
                </div>
            </Form.Item>
            <Form.Item
                label='Iteraciones | error'
            >
                <div className='flex flex-row gap-2'>
                    <Input placeholder='4' onChange={(e)=>setIterations(Number(e.target.value))}/>
                    <Input placeholder='0.003' onChange={(e)=>setError(Number(e.target.value))}/>
                </div>
            </Form.Item>
            <div className='flex flex-row gap-2'>
                <Button onClick={bisection}>Bisección</Button>
                <Button onClick={regulaFalsi}>Regula Falsi</Button>
                <Button onClick={newton}>Newton</Button>
                <Button onClick={secant}>Secante</Button>
            </div>
        </Form>
    </div>
  )
}

export default RootsSeparations