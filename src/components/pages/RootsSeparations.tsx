import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'

const RootsSeparations: React.FC = () => {
    const [equation, setEquation] = useState('');
    const [iteration, setIterations] = useState(4);
    const [error, setError] = useState(0.003);

    const bisection = () =>{
        console.log(equation);
    }
    const regulaFalsi = () =>{
        console.log(equation);
    }
    const newton = () =>{
        console.log(equation);
    }
    const secant = () =>{
        console.log(equation);
    }

  return (
    <div className='flex flex-col justify-center items-center w-full p-4'>
        <Form className='w-1/2'>
        
            <Form.Item
                label='Ecuación'
            >
                <Input placeholder='2x + 3y = 3' onChange={(e)=>setEquation(e.target.value)}/>
            </Form.Item>
            <Form.Item
                label='Intervalo | puntos'
            >
                <div className='flex flex-row gap-2 w-1/2'>
                    <Input placeholder='2' onChange={(e)=>setEquation(e.target.value)}/>
                    <Input placeholder='3' onChange={(e)=>setEquation(e.target.value)}/>
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