import { Table } from "@tanstack/react-table";
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";

export const Paginate = ({
  table,
  pagination,
  setPagination,
}: {
  table: Table<never>;
  pagination: { pageIndex: number; pageSize: number };
  setPagination: (
    value: React.SetStateAction<{ pageIndex: number; pageSize: number }>
  ) => void;
}): JSX.Element => {
  return (
    <div className="w-[40%] h-[32px]  bg-white rounded-lg flex justify-center items-center mt-2 shadow border-[#00743F] left-[33rem] m-auto mt-4">
      <button
        className="px-2 mr-4 h-7 text-center font-medium font-sans flex justify-center items-center"
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
          className={`px-2  mr-3 text-center font-medium font-sans flex justify-center items-center ${
            index === pagination.pageIndex
              ? "border bg-[#084287] text-white"
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
        className="px-2 ml-3  h-7 text-center font-medium font-sans rounded-r-full flex justify-center items-center"
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
  );
};
