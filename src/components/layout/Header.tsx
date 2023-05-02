import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header:React.FC = () => {
    const navigate = useNavigate();
  return (
    <div className='h-14 bg-slate-200 flex flex-row justify-between items-center px-8 py-6 shadow-lg mb-6'>
        <div className='font-bold text-3xl text-slate-500'>
            MN Tools
        </div> 
        <div className='flex flex-row gap-2'>
            <Button onClick={()=>navigate('interpolation')}>Interpolación</Button>
            <Button onClick={()=>navigate('jacobi')}>Jacobi</Button>
            <Button onClick={()=>navigate('roots_separation')}>Separación de raíces</Button>
            <Button onClick={()=>navigate('numeric_integration')}>Integracion numérica</Button>
            <Button onClick={()=>navigate('numeric_optimization')}>Optimización numérica</Button>
        </div>
    </div>
  )
}

export default Header