import { Form, Input } from 'antd'
import { Button } from 'antd/es/radio'
import React, { useState } from 'react'

const Jacobi: React.FC = () => {
    const [equations, setEquations] = useState<string[]>([])
    const jacobi = () => {
        const {matrix, indepTerms} = extractMatrix();
        const {despMatrix, despIndepTerms} = solveMatrix(matrix, indepTerms);
        const alpha = calculateAlpha(despMatrix);
        console.log('alpha: ', alpha);

        //iterate
        const n = 5;
        let multVector = [0, 0, 0];
        for (let it=0; it<n; it++) {
            let multiVectorCopy = [...multVector];
            for (let i=0; i<despMatrix.length; i++) {
                let sum = 0;
                for (let j=0; j<despMatrix[i].length; j++) {
                    sum+=despMatrix[i][j]*multiVectorCopy[j];
                }
                multVector[i] = sum + despIndepTerms[i];
            }
            const landa = Math.max(...substractMatrix(multiVectorCopy, multVector));
            const error = Math.abs(((alpha/(1-alpha))*landa) | 0);
            console.log(`it ${it+1}: ${multVector}`);
            console.log(`error: ${error}`);
        }
        
    }

    const seider = () => {
        const {matrix, indepTerms} = extractMatrix();
        const {despMatrix, despIndepTerms} = solveMatrix(matrix, indepTerms);
        const alpha = calculateAlpha(despMatrix);
        const beta = calculateBeta(despMatrix);
        console.log('alpha: ', alpha);
        console.log('beta: ', beta);

        //iterate
        const n = 5;
        let multVector = [0, 0, 0];
        for (let it=0; it<n; it++) {
            
            for (let i=0; i<despMatrix.length; i++) {
                let sum = 0;
                for (let j=0; j<despMatrix[i].length; j++) {
                    sum += despMatrix[i][j] * multVector[j];
                }
                multVector[i] = sum + despIndepTerms[i];
            }
            console.log(`it ${it+1}: ${multVector}`);
            // console.log(`error: ${error}`);
        }
    }

    const substractMatrix = (matrix1: number[], matrix2: number[]) => {
        const resultMatrix = [];
        for (let i=0; i<matrix1.length; i++) {
            resultMatrix[i] = matrix1[i] - matrix2[i];
        }
        return resultMatrix;
    }

    const calculateAlpha = (matrix: number[][]) => {
        const candidates: number[] = [];
        matrix.forEach((row)=>{
            let sum = 0;
            row.forEach((element)=>{
                sum += Math.abs(element);
            })
            candidates.push(sum);
        })
        return Math.max(...candidates);
    }

    const calculateBeta = (matrix: number[][]) => {
        const candidates: number[] = [];
        for (let i=0; i<matrix.length; i++) {
            let [q, p] = [0, 0];
            for (let j=i; j<matrix[i].length; j++) {
                q += Math.abs(matrix[i][j]);
            }
            for (let j=0; j<i; j++) {
                p += Math.abs(matrix[i][j]);
            }
            candidates.push((q/(1-p)) | 0);
        }
        return Math.max(...candidates);
    }

    const extractMatrix = () => {
        let matrix: number[][] = [];
        let indepTerms: number[] = [];
        console.log(equations)
        equations.forEach((eq)=>{
            eq=eq.replaceAll(' ','');
            let numbers: number[] = [];
            const xReg = /-?[0-9]+x/i.exec(eq);
            const x = Number(xReg?xReg[0].substring(0,xReg[0].length-1):0);
            const yReg = /-?[0-9]+y/i.exec(eq);
            const y = Number(yReg?yReg[0].substring(0,yReg[0].length-1):0);
            const zReg = /-?[0-9]+z/i.exec(eq);
            const z = Number(zReg?zReg[0].substring(0,zReg[0].length-1):0);
            const nReg = /=-?[0-9]+/i.exec(eq);
            const n = Number(nReg?nReg[0].substring(1,nReg[0].length):0);
            numbers = [x, y, z];
            matrix.push(numbers);
            indepTerms.push(n);
        })
        console.log(matrix);
        console.log(indepTerms);
        return {...{matrix},...{indepTerms}};
    }

    const solveMatrix = (matrix: number[][], indepTerms: number[]) => {
        let despMatrix: number[][] = [];
        let despIndepTerms: number[] = [];
        for (let i=0; i<matrix.length; i++) {
            despMatrix[i] = [];
            const div = matrix[i][i];
            despIndepTerms[i] = (indepTerms[i]/div) | 0;
            for (let j = 0; j<matrix[i].length; j++) {
                if (j===i) {
                    despMatrix[i][j]=0;
                } else {
                    despMatrix[i][j]=((matrix[i][j]/div) | 0)*-1;
                }
            }
        }
        console.log(despMatrix);
        console.log(despIndepTerms);
        return {...{despMatrix},...{despIndepTerms}};
    }

    const handleChange = (e: any, eq: number) => {
        setEquations((equa)=>{
            equa[eq] = e.target.value;

            return [...equa.filter((element)=>element)];
        })
    }
  return (
    <div className='flex flex-col justify-center items-center w-full p-4'>
        <Form className='w-1/2'>
            <Form.Item
                label='Ecuación 1'
            >
                <Input placeholder='2x + 3y = 3' onChange={(e)=>handleChange(e,0)}/>
            </Form.Item>
            <Form.Item
                label='Ecuación 2'
            >
                <Input placeholder='2x + 3y = 3' onChange={(e)=>handleChange(e,1)}/>
            </Form.Item>
            <Form.Item
                label='Ecuación 3'
            >
                <Input placeholder='2x + 3y = 3' onChange={(e)=>handleChange(e,2)}/>
            </Form.Item>
            <Button onClick={jacobi}>Jacobi</Button>
            <Button onClick={seider}>Seider</Button>
        </Form>
    </div>
  )
}

export default Jacobi