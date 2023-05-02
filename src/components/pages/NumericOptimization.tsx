import { Button, Form, FormInstance, Input, Select, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { useRef, useState } from 'react'
import { fun } from '../utils';
import { isRange } from 'mathjs';

interface DataSource {
    key: number;
    it: number;
    a: number;
    b: number;
    l: number;
    x1: number;
    x2: number;
    y1: number;
    y2: number
}

const NumericOptimization: React.FC = () => {
    const form = useRef<FormInstance<any>>(null);
    const [dataSource, setDataSource] = useState<DataSource[]>([]);
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
        const landa = tole * 0.1
        let [a, b] = [Number(interv_start), Number(interv_end)]; 
        const data: DataSource[] = [];
        console.log(equa, interv_start, interv_end, point, tole);
        for (let it=0; b - a > Number(tole) && it<100; it++) {
            const x1 = (( a + b ) / 2) - ( landa / 2 );
            console.log(a,b,landa, (( a + b ) / 2), ( landa / 2 ))
            const x2 = (( a + b ) / 2) + ( landa / 2 );
            const y1 = fun(equa, x1);
            const y2 = fun(equa, x2);
            data.push({
                key: it, l: b-a, ...{it, a, b, x1, x2, y1, y2}
            })
            if ( y1 < y2 ) {
                b = x2;
            } else {
                a = x1;
            }
            console.log(it)
        }
        setDataSource(data);
    }
  return (
    <div className='flex flex-col items-center p-4'>
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
            {...{columns, dataSource}}
            pagination={false}
            className='my-4'
            scroll={{x: 500}}
        />
    </div>
  )
}

export default NumericOptimization