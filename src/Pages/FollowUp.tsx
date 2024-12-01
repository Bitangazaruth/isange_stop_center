import { FaRegEye, FaSearch, FaAngleDown } from "react-icons/fa";

import { useMemo, useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnSort,
} from "@tanstack/react-table";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import Counter from "../components/Counter";
import Modal from "../components/shared/FollowUpModal";

const FollowUp = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [sorting, setSorting] = useState<ColumnSort[]>([]);
  const [sortBy, setSortBy] = useState("Victim Name");
  const [filtering, setFiltering] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

  useEffect(() => {
    fetch("https://isange-pro-be.onrender.com/api/v1/follow")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const columns = useMemo(
    () => [
      { header: "Victim Name", accessorKey: "victim_name" },
      { header: "Gender", accessorKey: "gender" },
      { header: "Doctor Name", accessorKey: "doctor_name" },
      { header: "Needed Aid", accessorKey: "needed_aid" },
      { header: "Next Appointment", accessorKey: "next_appointment" },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
      pagination,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    onPaginationChange: setPagination,
  });

  const handleSortBy = (key, label) => {
    setSortBy(label);
    setFiltering(key);
    setShowDropdown(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="ml-2 mt-8">
      <div className="grid md:grid-cols-3 lg:flex lg:justify-between">
        <div className="flex items-center relative  space-x-40">
          <div className="relative ml-4">
            <input
              value={filtering}
              onChange={(e) => setFiltering(e.target.value)}
              type="text"
              placeholder="Search..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 w-[400px]"
            />
            <FaSearch className="absolute right-3 top-3 text-gray-400 " />
          </div>
          <div className="flex items-center  space-x-7">
            <Counter />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={handleOpenModal}
            >
              Add New
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-8 p-2 rounded-lg w-[100%] md:flex lg:justify-between"></div>
      <table className="table-auto border-collapse border-none w-[90%] bg-white rounded-lg ml-4 h-full shadow-md mt-4">
        <thead>
          <tr className="text-[#000] text-[12px] bolder bg-[#f4f4f5]">
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-4 py-2 text-left font-semibold text-gray-700"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-black text-xs font-normal">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 border-none">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-[40%] h-[32px] relative bg-white rounded-lg flex justify-end items-center mt-2 shadow border-[#00743F] left-[33rem]">
        <button
          className="w-1/3 h-7 text-center font-medium font-sans flex justify-center items-center"
          onClick={() =>
            setPagination((prevState) => ({
              ...prevState,
              pageIndex: prevState.pageIndex - 1,
            }))
          }
          disabled={pagination.pageIndex === 0}
        >
          <span>
            <GrFormPrevious />
          </span>
        </button>
        {[...Array(table.getPageCount()).keys()].map((index) => (
          <button
            key={index}
            className={`w-1/3 h-7 text-center font-medium font-sans flex justify-center items-center ${
              index === pagination.pageIndex
                ? "border bg-[#084287]  text-white"
                : ""
            }`}
            onClick={() =>
              setPagination((prevState) => ({
                ...prevState,
                pageIndex: index,
              }))
            }
          >
            <span>{index + 1}</span>
          </button>
        ))}
        <button
          className="w-1/3 h-7 text-center font-medium font-sans rounded-r-full flex justify-center items-center"
          onClick={() =>
            setPagination((prevState) => ({
              ...prevState,
              pageIndex: prevState.pageIndex + 1,
            }))
          }
          disabled={pagination.pageIndex === table.getPageCount() - 1}
        >
          <span>
            <MdOutlineNavigateNext />
          </span>
        </button>
      </div>
      {isModalOpen && <Modal onClose={handleCloseModal} />}
    </div>
  );
};

export default FollowUp;
