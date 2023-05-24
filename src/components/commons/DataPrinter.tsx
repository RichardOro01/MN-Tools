import React from 'react'

interface DataPrinterProps {
    data: string[];
}

const DataPrinter: React.FC<DataPrinterProps> = ({data}) => {
  return (
    <div className='flex flex-col gap-2 w-full'>
        {data.map((row)=><div className='font-normal text-lg'>{row}</div>)}
    </div>
  )
}

export default DataPrinter