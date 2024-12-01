import { FaRegEye, FaSearch, FaAngleDown } from "react-icons/fa";
import { FiEdit, FiTrash2 } from "react-icons/fi";
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

const getStatusStyle = (status) => {
  switch (status) {
    case "Case In RIB":
      return "text-green-500";
    case "Unsigned":
      return "text-red-500";
    case "In court":
      return "text-[#C3841D]";
    default:
      return "text-[#C3841D]";
  }
};

const VictimIdentification = () => {
  const columns = useMemo(
    () => [
      { header: "National ID", accessorKey: "national_id" },
      { header: "Victim Name", accessorKey: "victim_name" },
      { header: "Victim Contact", accessorKey: "victim_phone" },
      { header: "Gender", accessorKey: "gender" },
      { header: "Risk Type", accessorKey: "risk_type" },
      { header: "Location", accessorKey: "location" },
      {
        header: "Actions",
        accessorKey: "actions",
        cell: () => (
          <div className="flex space-x-2">
            <FiTrash2 className="text-red-500 cursor-pointer" />
            <FiEdit className="text-blue-500 cursor-pointer" />
          </div>
        ),
      },
    ],
    []
  );

  const [showDropdown, setShowDropdown] = useState(false);
  const [sorting, setSorting] = useState<ColumnSort[]>([]);
  const [sortBy, setSortBy] = useState("Status");
  const [filtering, setFiltering] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await fetch(
          "https://isange-pro-be.onrender.com/api/v1/Case/getAllCases",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const jsonData = await response.json();
        setData(jsonData.cases);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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

  return (
    <div className="ml-2 mt-8">
      <div className="grid md:grid-cols-3 lg:flex lg:justify-between">
        <div className="flex items-center relative">
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
          <div className="flex items-center space-x-3">
            <p className="font-semibold ml-4">SORT BY</p>
            <div className="relative">
              <div
                className="flex items-center space-x-1 px-2 py-1 cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <span>{sortBy}</span>
                <FaAngleDown />
              </div>
              {showDropdown && (
                <div className="absolute left-0 mt-2 bg-white border border-gray-200 rounded shadow-md">
                  <button
                    onClick={() => handleSortBy("Unsigned", "Unsigned")}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Unsigned
                  </button>
                  <button
                    onClick={() => handleSortBy("Case In RIB", "Case In RIB")}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Case In RIB
                  </button>
                  <button
                    onClick={() => handleSortBy("In court", "In court")}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    In court
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 p-2 rounded-lg w-[100%] md:flex lg:justify-between"></div>
      <table className="table-auto border-collapse border-none w-[95%] bg-white rounded-lg ml-4 h-full shadow-md mt-4">
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
            <tr key={row.id} className="">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 border-none mt-20">
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
    </div>
  );
};

export default VictimIdentification;
