import { Button, Form, FormInstance, Input, Select, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { useRef } from 'react'

const NumericOptimization: React.FC = () => {
    const form = useRef<FormInstance<any>>(null);
    const columns: ColumnsType<any> | undefined = [
        {
            dataIndex: 'it',
            key: 'it',
            title: 'i'
        },
        {
            dataIndex: 'a',
            key: 'a',
            title: 'a'
        },
        {
            dataIndex: 'b',
            key: 'b',
            title: 'b'
        },
        {
            dataIndex: 'l',
            key: 'l',
            title: 'l'
        },
        {
            dataIndex: 'x1',
            key: 'x1',
            title: 'x1'
        },
        {
            dataIndex: 'x2',
            key: 'x2',
            title: 'x2'
        },
        {
            dataIndex: 'y1',
            key: 'y1',
            title: 'y1'
        },
        {
            dataIndex: 'y2',
            key: 'y2',
            title: 'y2'
        },
    ]

    const handleBisection = () => {
        const {equa, interv_start, interv_end, point, tole} = form.current?.getFieldsValue();
        console.log(equa, interv_start, interv_end, point, tole);
    }
  return (
    <div className='flex flex-col items-center'>
        <Form ref={form}>
            <Form.Item
                name='equa'
                label='Ecuacion'
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label='Intervalo'
            >
                <div className='flex flex-row gap-2'>
                    <Form.Item
                        name='interv_start'
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name='interv_end'
                    >
                        <Input/>
                    </Form.Item>
                </div>
            </Form.Item>
            <Form.Item
                name='point'
                label='Punto'
            >
                <Select 
                    options={[
                        {value: 'Max'},
                        {value: 'Min'},
                    ]}
                />
            </Form.Item>
            <Form.Item
                name='tole'
                label='Tolerancia'
            >
                <Input/>
            </Form.Item>
        </Form>
        <Button onClick={handleBisection}>Biseccion</Button>
        <Table
            {...{columns}}
        />
    </div>
  )
}

export default NumericOptimization