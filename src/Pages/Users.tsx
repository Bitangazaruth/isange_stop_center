import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnSort,
} from "@tanstack/react-table";
import { FaSearch, FaCalendarAlt } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { FiTrash2, FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import Notiflix from "notiflix";
import { Paginate } from "@/components/Paginate";
const Users = () => {
  const [data, setData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [sorting, setSorting] = useState<ColumnSort[]>([]);
  const [sortBy, setSortBy] = useState("Date");
  const [filtering, setFiltering] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 15,
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await fetch(
          "https://isange-pro-be.onrender.com/api/v1/user/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result.clients);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (id) => {
    console.log("Clicked user ID:", id);
    setShowEditModal(true);
  };

  const handleDeleteUser = async (userId) => {
    Notiflix.Confirm.show(
      "Confirmation",
      "Do you want to delete this user?",
      "Yes",
      "No",
      async () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
          console.error("No token found");
          Notiflix.Notify.failure("No token found");
          return;
        }

        try {
          const response = await fetch(
            `https://isange-pro-be.onrender.com/api/v1/user/delete/${userId}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            setData((prevData) =>
              prevData.filter((user) => user._id !== userId)
            );
            Notiflix.Notify.success(`User deleted successfully.`);
          } else {
            console.error(`Failed to delete user with ID ${userId}`);
            Notiflix.Notify.failure(`Failed to delete user with ID ${userId}`);
          }
        } catch (error) {
          console.error("Error deleting user:", error);
          Notiflix.Notify.failure("Error deleting user");
        }
      }
    );
  };

  const handleSortBy = (option, label) => {
    let newSorting = [];
    if (option === "date") {
      newSorting = [{ id: "date", desc: false }];
    } else if (option === "name") {
      newSorting = [{ id: "name", desc: false }];
    }
    setSorting(newSorting);
    setSortBy(label);
    setShowDropdown(false);
  };

  const columns = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Phone",
      accessorKey: "phone",
    },
    {
      header: "Role",
      accessorKey: "role",
    },
    {
      header: "Type",
      accessorKey: "userType",
    },
    {
      header: "Date",
      accessorKey: "date",
      cell: ({ getValue }) => new Date(getValue()).toLocaleDateString(),
    },
    {
      accessorKey: "Actions",
      Header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Link to={`/admin/single/${row.original._id}`}>
            <FiEdit className="text-green-500 cursor-pointer" size={15} />
          </Link>
          <FiTrash2
            className="text-red-500 cursor-pointer"
            onClick={() => handleDeleteUser(row.original._id)}
            size={15}
          />
        </div>
      ),
    },
  ];

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
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div className="mt-4 h-full p-4">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-3">
          <p className="font-semibold ml-4 text-gray-400">SORT BY</p>
          <div className="relative">
            <div
              className="flex items-center space-x-1 px-2 py-1 cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <FaCalendarAlt />
              <span>{sortBy}</span>
              <FaAngleDown />
            </div>
            {showDropdown && (
              <div className="absolute left-0 mt-2 bg-white border border-gray-200 rounded shadow-md">
                <button
                  onClick={() => handleSortBy("date", "Date")}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Date
                </button>
                <button
                  onClick={() => handleSortBy("name", "Name")}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Name
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="relative">
          <input
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 w-[400px]"
          />
          <FaSearch className="absolute right-3 top-3 text-gray-400" />
        </div>
      </div>

      <table className="table-auto border-collapse border-none w-[96%] bg-white rounded-[5px] ml-2 overflow-hidden">
        <thead>
          <tr className="text-[#000] text-[12px] bolder rounded-[5px]">
            {table.getHeaderGroups().map((headerGroup) => (
              <React.Fragment key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-4 text-left font-semibold text-gray-700 bg-slate-300 p-2"
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
        <tbody className="w-[101px] h-[19px] text-black text-xs font-normal font-['Inter']">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-gray-100 py-4 border-b border-gray-200"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 border-none">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Paginate
        table={table}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  );
};

export default Users;
