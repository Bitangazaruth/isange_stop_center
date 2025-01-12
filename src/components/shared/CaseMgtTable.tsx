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
import { FaRegEye } from "react-icons/fa";
import { FiTrash2, FiEdit } from "react-icons/fi";
import Modal from "./Modal";
import EditModal from "./EditModal";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { MdLocalHospital } from "react-icons/md";
import { Link } from "react-router-dom";
import Notiflix from "notiflix";
import axios from "axios";
import { Paginate } from "../Paginate";

const CaseMgtTable = () => {
  const [data, setData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [sorting, setSorting] = useState<ColumnSort[]>([]);
  const [sortBy, setSortBy] = useState("Date");
  const [filtering, setFiltering] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const userString = localStorage.getItem("IsLoggedIn");
  const user = userString ? JSON.parse(userString) : null;

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        let url = "";
        if (user.USER.role === "user") {
          url =
            "https://isange-pro-be.onrender.com/api/v1/Case/getAllCasesUser";
        } else if (user.USER.role === "admin") {
          url = "https://isange-pro-be.onrender.com/api/v1/Case/getAllCases";
        } else if (user.USER.role === "RIB") {
          url =
            "https://isange-pro-be.onrender.com/api/v1/Case/getCasesAssignedToRIB";
        } else if (user.USER.role === "hospital") {
          url =
            "https://isange-pro-be.onrender.com/api/v1/Case/getCasesAssignedToHospital";
        }

        if (url) {
          const response = await fetch(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result = await response.json();
          const data = user.USER.role === "admin" ? result.cases : result;

          setData(
            data.map((r: any) => {
              if (r.isRIBAccepted) r.statusMsg = "Case accepted by RIB";
              else if (r.isHospitalAccepted)
                r.statusMsg = "Case accepted by Hospital";
              else r.statusMsg = "pending";
              return r;
            })
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [showModal]);

  const handleEditClick = (id: string) => {
    console.log("Clicked case ID:", id);
    setSelectedCaseId(id); // Set the selected case ID
    setShowEditModal(true); // Show the edit modal
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedCaseId(null);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSortBy = (option: string, label: string) => {
    let newSorting: ColumnSort[] = [];
    if (option === "date") {
      newSorting = [{ id: "createdAt", desc: false }];
    } else if (option === "name") {
      newSorting = [{ id: "caseTitle", desc: false }];
    }
    setSorting(newSorting);
    setSortBy(label);
    setShowDropdown(false);
  };

  const handleDelete = (id: string) => {
    Notiflix.Confirm.show(
      "Confirmation",
      "Do you want to delete this case?",
      "Yes",
      "No",
      async () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
          console.error("No token found");
          return;
        }

        try {
          const response = await fetch(
            `https://isange-pro-be.onrender.com/api/v1/Case/deleteCase/${id}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          setData(data.filter((caseItem) => caseItem._id !== id));
          Notiflix.Notify.success("Case deleted successfully");
        } catch (error) {
          console.error("Error deleting case:", error);
          Notiflix.Notify.failure("Failed to delete case");
        }
      }
    );
  };

  const handleEmergency = async (id: string) => {
    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        console.error("No token found");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios
        .put(
          `https://isange-pro-be.onrender.com/api/v1/Case/emergency/${id}`,
          { isEmergency: true },
          config
        )
        .then((res) => {
          console.log(res);
          Notiflix.Notify.success("Case updated to emergency");
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.error("Error changing user role:", error);
    }
  };

  const columns = [
    {
      header: "Case Name",
      accessorKey: "caseTitle",
      cell: ({ getValue }) => <div className="w-32 truncate">{getValue()}</div>,
    },
    {
      header: "Description",
      accessorKey: "description",
      cell: ({ getValue }) => (
        <span
          className="w-40 block overflow-hidden text-ellipsis whitespace-nowrap"
          title={getValue()}
        >
          {getValue()}
        </span>
      ),
    },
    {
      header: "Victim Name",
      accessorKey: "victim_name",
      cell: ({ getValue }) => (
        <div className="w-20 truncate ">{getValue()}</div>
      ),
    },
    {
      header: "Risk Type",
      accessorKey: "risk_type",
      cell: ({ getValue }) => <div className="w-20 truncate">{getValue()}</div>,
    },
    {
      header: "Date",
      accessorKey: "dateOfIncident",
      cell: ({ getValue }) => <div className="w-24 truncate">{getValue()}</div>,
    },
    {
      header: "Status",
      cell: ({ getValue }) => (
        <div
          className={`w-24 
      ${
        getValue() === "pending"
          ? "py-2 rounded-[10px] bg-green-500 text-white text-center capitalize"
          : getValue() === "accepted"
          ? "py-2 rounded-[10px] bg-blue-500 text-white text-center capitalize"
          : "py-2 rounded-[10px] bg-red-500 text-white text-center capitalize"
      }

      `}
        >
          {getValue()}
        </div>
      ),
      accessorKey: "statusMsg",
    },
    {
      accessorKey: "Actions",
      Header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Link to={`/admin/caseDetails/${row.original._id}`}>
            <FaRegEye className="text-green-500 cursor-pointer" size={18} />
          </Link>
          <MdLocalHospital
            onClick={() => handleEmergency(row.original._id)}
            className="text-red-500 cursor-pointer hover:scale-150"
            size={18}
          />
          <FiEdit
            className="text-blue-500 cursor-pointer"
            onClick={() => handleEditClick(row.original._id)}
            size={18}
          />
          <FiTrash2
            className="text-red-500 cursor-pointer"
            onClick={() => handleDelete(row.original._id)}
            size={18}
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

  const handleCaseCreated = (newCase: any) => {
    setData((prevData) => [newCase, ...prevData]);
  };

  return (
    <div className="mt-4 h-full p-4">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-3">
          <p className="font-semibold ml-4 text-gray-400">SORT BY</p>
          <div className="relative">
            <div
              className="flex items-center space-x-1 px-2 py-1 cursor-pointer "
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
        <button
          className="ml-3 px-4 py-2 bg-[#084287] text-white rounded-lg hover:bg-black focus:outline-none focus:bg-[#000]"
          onClick={() => setShowModal(true)}
        >
          Add Case
        </button>
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
            <tr key={row.id} className="border-b border-gray-200 py-4">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2">
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

      {showModal && (
        <Modal onClose={handleModalClose} onCaseCreated={handleCaseCreated} />
      )}
      {showEditModal && (
        <EditModal
          onClose={handleCloseEditModal}
          id={selectedCaseId}
          onCaseUpdated={(updatedCase) => {
            setData((prevData) =>
              prevData.map((caseItem) =>
                caseItem._id === updatedCase._id ? updatedCase : caseItem
              )
            );
            handleCloseEditModal();
          }}
        />
      )}
    </div>
  );
};

export default CaseMgtTable;
