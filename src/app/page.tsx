'use client';

import { FormField } from '@/components/layouts/form-field';
import { Table } from '@/components/layouts/table/table';
import { TableData } from '@/types/table-data';
import { useEffect, useState } from 'react';

export default function Home() {
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [state, setState] = useState(true);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('urls')!);
    setTableData(data || []);
  }, []);

  return (
    <>
      <h1 className="text-4xl min-[350px]:text-5xl min-[550px]:text-6xl lg:text-7xl xl:text-8xl text-center tracking-tight font-bold min-[300px]:font-black bg-clip-text bg-gradient-to-br from-gray-500 to-gray-950 to-50% text-transparent mt-28 mb-10 min-[420px]:mb-16 leading-3 antialiased">
        Make {"URL's"}
        <span className="bg-clip-text bg-gradient-to-br from-gray-500 to-gray-950 to-75% text-transparent block">
          Shorter
        </span>
      </h1>

      <FormField setTableData={setTableData} />

      {tableData.length && <Table data={tableData} setState={setState} />}
    </>
  );
}
