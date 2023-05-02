import { Button, Dropdown, MenuProps, Space } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuOutlined } from '@ant-design/icons'

const Header:React.FC = () => {
    const navigate = useNavigate();

    const options = [
      {
        url: 'interpolation',
        label: 'Interpolación'
      },
      {
        url: 'jacobi',
        label: 'Jacobi'
      },
      {
        url: 'roots_separation',
        label: 'Separación de raíces'
      },
      {
        url: 'numeric_integration',
        label: 'Integracion numérica'
      },
      {
        url: 'numeric_optimization',
        label: 'Optimización numérica'
      },
    ]

    const items: MenuProps['items'] = options.map(({label, url})=>{
      return {key: url, label: (<div onClick={()=>navigate(url)}>{label}</div>)}
    })

  return (
    <div className='h-14 bg-slate-200 flex flex-row justify-between items-center px-8 py-6 shadow-lg mb-6'>
        <div className='font-bold text-3xl text-slate-500'>
            MN Tools
        </div> 
        <div className='md:flex flex-row gap-2 hidden'>
            {options.map(({label, url})=><Button key={url} onClick={()=>navigate(url)}>{label}</Button>)}
        </div>
        <Dropdown
          menu={{items}}
          className='md:hidden'
        >
          <Space>
            <MenuOutlined className='cursor-pointer'/>
          </Space>
        </Dropdown>
    </div>
  )
}

export default Header