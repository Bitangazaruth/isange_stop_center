import React, { useState,useEffect } from "react";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnSort,
} from "@tanstack/react-table";
// import { BsThreeDotsVertical } from "react-icons/bs";
import tabledataj from "./tabledata.json";
import { useMemo } from "react";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
//  import { MdOutlineIndeterminateCheckBox } from "react-icons/md";
// import { IoMdArrowDown } from "react-icons/io";

const Tablesub = () => {
   const [subscriberCount, setSubscriberCount] = useState(0);
  const data = useMemo(() => tabledataj, []);

   useEffect(() => {
     // Update subscriber count when data changes
     setSubscriberCount(data.length);
   }, [data]);

  const [sorting, setSorting] = useState<ColumnSort[]>([]);

  const [filtering, setfiltering] = useState("");
   const handleDelete = (index: number) => {
     // Implement delete logic here
     const updatedData = [...data];
     updatedData.splice(index, 1);
     setSubscriberCount(updatedData.length);
     // Update table data
     // Assuming you have a function to set data
     // setData(updatedData);
   };
  const columns = [
 
    {
      accessorKey: "id",
      header: "ID",
      cell: (info: { row: { index: number } }) => (
        <span>{info.row.index + 1}</span>
      ),
    },
   
    {
      header: () => (
        <div className="    flex">
          <div className="text-gray-500 font-medium font-['Inter'] leading-[18px]">
            Name
          </div>
           
        </div>
      ),
      accessorKey: "name",
    },
    
   
   
 
    {
      header: () => (
        <div className=" justify-start items-center gap-1 inline-flex">
          <div className="text-gray-500 font-medium font-['Inter'] leading-[18px]">
            Start-date
          </div>
        
        </div>
      ),
      accessorKey: "date",
    },
    {
      header: () => (
        <div className=" justify-start items-center gap-1 inline-flex">
          <div className="text-gray-500 font-medium font-['Inter'] leading-[18px]">
           End-Date
          </div>
          
        </div>
      ),
      accessorKey: "end",
    },
    {
      header: () => (
        <div className=" justify-start items-center gap-1 inline-flex">
          <div className="text-gray-500 font-medium font-['Inter'] leading-[18px]">
           Feature
          </div>
         
        </div>
      ),
      accessorKey: "feature",
    },
    {
      header: () => (
        <div className=" justify-start items-center gap-1 inline-flex">
          <div className="text-gray-500 font-medium font-['Inter'] leading-[18px]">
            Cost
          </div>
          
        </div>
      ),
      accessorKey: "cost",
    },
    {
      accessorKey: "farm",
      header: () => (
        <div className="  justify-start items-center gap-1 inline-flex">
          <div className="text-gray-500 font-medium font-['Inter'] leading-[18px]">
            Farm
          </div>
          
        </div>
      ),
    },
      {
        header: () => (
        <div className=" justify-start items-center gap-1 inline-flex">
          <div className="text-gray-500 font-medium font-['Inter'] leading-[18px]">
           Action
          </div>
         
        </div>
      ),
      accessorKey: "action",
    
      cell: (info: { row: { index: number } }) => {
       
        

        return (
          <div>
            <div className="w-2 h-2 justify-center text-white items-center flex">
              <button className=" bg-green-800 rounded-md  hover:text-black  hover:bg-white " onClick={() => handleDelete(info.row.index)}>
                <p className="w-10">Delete</p>
              </button>

              <button className=" ml-1 bg-slate-500 rounded-md text-1xl  hover:text-black  hover:bg-white">
                <p className="w-10">Edit</p>
              </button>
            </div>
          </div>
        );
      },
},
     
  ];
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 9,
  });
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
      pagination,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setfiltering,
  });

  return (
    <div className="w-full  ml-3  mb-4 h-full">
      <div className="bg-white text-gray-700 font-semibold h-16 items-center ml-2 w-36">
        <p className="ml-2">No of subscriber</p>
        <div className="text-2xl ml-4">{subscriberCount}</div>
      </div>

      <table className="table-auto mt-12  w-[93%] bg-white ml-2">
        <thead>
          <tr className="font-['Inter'] font-medium text-[#667085] text-[9px] border-b-[1px]">
            {table.getHeaderGroups().map((headerGroup) => (
              <React.Fragment key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left font-medium text-gray-700"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  </th>
                ))}
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody className="w-[101px] text-[#667085] text-[10px] font-normal font-['Inter']">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-100">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 border-b-[1px]">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="w-[50%] h-[40px] relative bg-white rounded-lg  flex justify-between items-center mt-2 ml-3 border border-[#00743F] left-[25rem]">
        <button
          className="w-1/3 h-7 text-center font-medium font-sans  flex justify-center items-center "
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          <span>
            <GrFormPrevious />
          </span>
        </button>
        <button
          className="w-1/3 h-7 text-center  font-medium font-sans flex justify-center items-center"
          onClick={() => table.setPageIndex(0)}
        >
          <span>1</span>
        </button>
        <button
          className="w-1/3 h-7 text-center  font-medium font-sans flex justify-center items-center"
          onClick={() => table.setPageIndex(1)}
        >
          <span>2</span>
        </button>
        <button
          className="w-1/3 h-7 text-center  font-normal font-sans flex justify-center items-center"
          onClick={() => table.setPageIndex(2)}
        >
          <span>3</span>
        </button>
        <button
          className="w-1/3 h-7 text-center  font-medium font-sans rounded-r-full flex justify-center items-center"
          onClick={() => table.nextPage()}
        >
          <span>
            {" "}
            <MdOutlineNavigateNext />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Tablesub;
