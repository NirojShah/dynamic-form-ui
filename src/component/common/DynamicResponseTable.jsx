import React, {
    useMemo,
    useState,
} from "react";

import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from "@tanstack/react-table";

import {
    ArrowDown,
    ArrowUp,
    ArrowUpDown,
} from "lucide-react";

import TableToolbar from "./table/TableToolbar";

import TablePagination from "./table/TablePagination";

import ExportModal from "./table/ExportModal";

import { createColumns } from "./table/TableColumn";

const DynamicResponseTable = ({
    fields = [],
    data = [],
}) => {
    const visibleFields = fields.filter(
        (f) => f.type !== "divider"
    );

    const columns = useMemo(
        () =>
            createColumns(
                visibleFields
            ),
        [fields]
    );

    const [sorting, setSorting] =
        useState([]);

    const [globalFilter, setGlobalFilter] =
        useState("");

    const [pagination, setPagination] =
        useState({
            pageIndex: 0,
            pageSize: 10,
        });

    const [columnSizing, setColumnSizing] =
        useState({});

    const [showExport, setShowExport] =
        useState(false);

    const table = useReactTable({
        data,

        columns,

        state: {
            sorting,
            globalFilter,
            pagination,
            columnSizing,
        },

        onSortingChange:
            setSorting,

        onGlobalFilterChange:
            setGlobalFilter,

        onPaginationChange:
            setPagination,

        onColumnSizingChange:
            setColumnSizing,

        enableColumnResizing: true,

        columnResizeMode:
            "onChange",

        getCoreRowModel:
            getCoreRowModel(),

        getSortedRowModel:
            getSortedRowModel(),

        getFilteredRowModel:
            getFilteredRowModel(),

        getPaginationRowModel:
            getPaginationRowModel(),

        globalFilterFn: (
            row,
            _,
            filterValue
        ) => {
            const values =
                Object.values(
                    row.original
                        .userResponse || {}
                );

            return values.some((val) =>
                String(val)
                    .toLowerCase()
                    .includes(
                        filterValue.toLowerCase()
                    )
            );
        },
    });

    return (
        <>
            <div className="w-full bg-white border border-black/10 rounded-2xl overflow-hidden">
                <TableToolbar
                    globalFilter={
                        globalFilter
                    }
                    setGlobalFilter={
                        setGlobalFilter
                    }
                    onExport={() =>
                        setShowExport(true)
                    }
                />

                <div className="overflow-auto">
                    <table
                        className="min-w-full border-collapse table-fixed"
                        style={{
                            width:
                                table.getCenterTotalSize(),
                        }}
                    >
                        <thead className="bg-[#FAFAF8]">
                            {table
                                .getHeaderGroups()
                                .map(
                                    (headerGroup) => (
                                        <tr
                                            key={
                                                headerGroup.id
                                            }
                                        >
                                            {headerGroup.headers.map(
                                                (
                                                    header
                                                ) => (
                                                    <th
                                                        key={
                                                            header.id
                                                        }
                                                        style={{
                                                            width:
                                                                header.getSize(),
                                                        }}
                                                        className=" relative border-r border-b border-black/10 px-4 py-4 text-left text-xs font-semibold uppercase
                            "
                                                    >
                                                        <div
                                                            onClick={header.column.getToggleSortingHandler()}
                                                            className="flex items-center gap-2 cursor-pointer"
                                                        >
                                                            {flexRender(
                                                                header
                                                                    .column
                                                                    .columnDef
                                                                    .header,
                                                                header.getContext()
                                                            )}

                                                            {{
                                                                asc: (
                                                                    <ArrowUp size={14} />
                                                                ),

                                                                desc: (
                                                                    <ArrowDown size={14} />
                                                                ),
                                                            }[
                                                                header.column.getIsSorted()
                                                            ] ?? (
                                                                    <ArrowUpDown size={14} />
                                                                )}
                                                        </div>

                                                        <div
                                                            onMouseDown={header.getResizeHandler()}
                                                            onTouchStart={header.getResizeHandler()}
                                                            className=" absolute top-0 right-0 h-full w-2 cursor-col-resize hover:bg-[#9FE870]
                              "
                                                        />
                                                    </th>
                                                )
                                            )}
                                        </tr>
                                    )
                                )}
                        </thead>

                        <tbody>
                            {table
                                .getRowModel()
                                .rows.map((row) => (
                                    <tr
                                        key={row.id}
                                        className="hover:bg-[#FAFAF8]"
                                    >
                                        {row
                                            .getVisibleCells()
                                            .map((cell) => (
                                                <td
                                                    key={cell.id}
                                                    style={{
                                                        width:
                                                            cell.column.getSize(),
                                                    }}
                                                    className=" border-r border-b border-black/10 px-4 py-4 text-sm
                          "
                                                >
                                                    {flexRender(
                                                        cell.column
                                                            .columnDef
                                                            .cell,
                                                        cell.getContext()
                                                    )}
                                                </td>
                                            ))}
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

                <TablePagination
                    table={table}
                />
            </div>

            <ExportModal
                visible={showExport}
                onClose={() =>
                    setShowExport(false)
                }
            />
        </>
    );
};

export default DynamicResponseTable;
















// import React, {
//     useMemo,
//     useState,
// } from "react";

// import {
//     flexRender,
//     getCoreRowModel,
//     getSortedRowModel,
//     getFilteredRowModel,
//     getPaginationRowModel,
//     useReactTable,
// } from "@tanstack/react-table";

// import {
//     ChevronLeft,
//     ChevronRight,
//     ArrowUpDown,
//     ArrowUp,
//     ArrowDown,
//     Search,
//     Eye,
//     Download,
//     X,
// } from "lucide-react";

// const DynamicResponseTable = ({
//     fields = [],
//     data = [],
// }) => {
//     const visibleFields = fields.filter(
//         (f) => f.type !== "divider"
//     );

//     const [globalFilter, setGlobalFilter] =
//         useState("");

//     const [sorting, setSorting] = useState([]);

//     const [columnSizing, setColumnSizing] =
//         useState({});

//     const [pagination, setPagination] =
//         useState({
//             pageIndex: 0,
//             pageSize: 10,
//         });

//     const [showDownloadModal, setShowDownloadModal] =
//         useState(false);

//     const [selectedFields, setSelectedFields] =
//         useState(
//             visibleFields.map((f) => f.label)
//         );

//     const [downloadAll, setDownloadAll] =
//         useState(true);

//     const columns = useMemo(() => {
//         return [
//             {
//                 accessorKey: "index",

//                 header: "#",

//                 size: 70,

//                 enableSorting: false,

//                 cell: ({ row }) => row.index + 1,
//             },

//             ...visibleFields.map((field) => ({
//                 accessorKey: field.label,

//                 header: field.label,

//                 size: 240,

//                 sortingFn: (a, b) => {
//                     const valA =
//                         a.original.userResponse?.[
//                         field.label
//                         ];

//                     const valB =
//                         b.original.userResponse?.[
//                         field.label
//                         ];

//                     return String(valA || "").localeCompare(
//                         String(valB || "")
//                     );
//                 },

//                 cell: ({ row }) => {
//                     const value =
//                         row.original.userResponse?.[
//                         field.label
//                         ];

//                     if (
//                         value === null ||
//                         value === undefined
//                     ) {
//                         return "-";
//                     }

//                     // ARRAY
//                     if (Array.isArray(value)) {
//                         return (
//                             <div className="flex flex-wrap gap-1">
//                                 {value.map((item, i) => (
//                                     <span
//                                         key={i}
//                                         className="
//                       px-2 py-1
//                       rounded-full
//                       text-xs
//                       bg-[#163300]/10
//                       text-[#163300]
//                     "
//                                     >
//                                         {item}
//                                     </span>
//                                 ))}
//                             </div>
//                         );
//                     }

//                     // DATE
//                     if (field.type === "date") {
//                         return new Date(
//                             value
//                         ).toLocaleDateString();
//                     }

//                     // RATING / SCALE
//                     if (
//                         field.type === "rating" ||
//                         field.type === "scale"
//                     ) {
//                         return (
//                             <div className="flex items-center gap-2 min-w-[140px]">
//                                 <div className="h-2 w-24 rounded-full bg-gray-200 overflow-hidden">
//                                     <div
//                                         className="h-full bg-[#9FE870]"
//                                         style={{
//                                             width: `${(value / 10) * 100}%`,
//                                         }}
//                                     />
//                                 </div>

//                                 <span className="text-xs text-gray-500">
//                                     {value}
//                                 </span>
//                             </div>
//                         );
//                     }

//                     // FILE / SIGNATURE
//                     if (
//                         field.type === "file" ||
//                         field.type === "signature"
//                     ) {
//                         return (
//                             <div className="flex items-center gap-2">
//                                 <button
//                                     onClick={() =>
//                                         console.log(
//                                             "VIEW:",
//                                             value
//                                         )
//                                     }
//                                     className="
//                     p-2 rounded-md
//                     hover:bg-black/5
//                     border border-black/10
//                   "
//                                 >
//                                     <Eye size={16} />
//                                 </button>

//                                 <button
//                                     onClick={() =>
//                                         console.log(
//                                             "DOWNLOAD:",
//                                             value
//                                         )
//                                     }
//                                     className="
//                     p-2 rounded-md
//                     hover:bg-black/5
//                     border border-black/10
//                   "
//                                 >
//                                     <Download size={16} />
//                                 </button>
//                             </div>
//                         );
//                     }

//                     return value.toString();
//                 },
//             })),
//         ];
//     }, [fields]);

//     const table = useReactTable({
//         data,

//         columns,

//         state: {
//             sorting,
//             globalFilter,
//             pagination,
//             columnSizing,
//         },

//         enableColumnResizing: true,

//         columnResizeMode: "onChange",

//         onSortingChange: setSorting,

//         onGlobalFilterChange:
//             setGlobalFilter,

//         onPaginationChange:
//             setPagination,

//         onColumnSizingChange:
//             setColumnSizing,

//         getCoreRowModel:
//             getCoreRowModel(),

//         getSortedRowModel:
//             getSortedRowModel(),

//         getFilteredRowModel:
//             getFilteredRowModel(),

//         getPaginationRowModel:
//             getPaginationRowModel(),

//         globalFilterFn: (row, _, filterValue) => {
//             const values = Object.values(
//                 row.original.userResponse || {}
//             );

//             return values.some((val) =>
//                 String(val)
//                     .toLowerCase()
//                     .includes(
//                         filterValue.toLowerCase()
//                     )
//             );
//         },
//     });

//     const exportCSV = () => {
//         const rows = downloadAll
//             ? data
//             : table.getRowModel().rows.map(
//                 (r) => r.original
//             );

//         const csvRows = [];

//         csvRows.push(selectedFields.join(","));

//         rows.forEach((row) => {
//             const values = selectedFields.map(
//                 (field) => {
//                     const value =
//                         row.userResponse?.[field];

//                     if (Array.isArray(value)) {
//                         return `"${value.join(
//                             ", "
//                         )}"`;
//                     }

//                     return `"${value || ""}"`;
//                 }
//             );

//             csvRows.push(values.join(","));
//         });

//         const blob = new Blob(
//             [csvRows.join("\n")],
//             {
//                 type: "text/csv",
//             }
//         );

//         const url =
//             window.URL.createObjectURL(blob);

//         const a =
//             document.createElement("a");

//         a.href = url;

//         a.download = "responses.csv";

//         a.click();

//         window.URL.revokeObjectURL(url);

//         setShowDownloadModal(false);
//     };

//     return (
//         <>
//             <div className="w-full bg-white border border-black/10 rounded-2xl overflow-hidden">
//                 {/* TOP */}
//                 <div className="px-6 py-5 border-b border-black/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                     <div>
//                         <h2 className="text-lg font-semibold text-[#0E0F0C]">
//                             Responses
//                         </h2>

//                         <p className="text-sm text-gray-500">
//                             Manage submitted responses
//                         </p>
//                     </div>

//                     <div className="flex items-center gap-3">
//                         {/* SEARCH */}
//                         <div className="relative">
//                             <Search
//                                 size={16}
//                                 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                             />

//                             <input
//                                 type="text"
//                                 placeholder="Search..."
//                                 value={globalFilter ?? ""}
//                                 onChange={(e) =>
//                                     setGlobalFilter(
//                                         e.target.value
//                                     )
//                                 }
//                                 className="
//                   pl-9 pr-3 py-2
//                   text-sm
//                   border border-black/10
//                   rounded-lg
//                   outline-none
//                   focus:ring-2
//                   focus:ring-[#9FE870]
//                 "
//                             />
//                         </div>

//                         {/* DOWNLOAD */}
//                         <button
//                             onClick={() =>
//                                 setShowDownloadModal(true)
//                             }
//                             className="
//                 px-4 py-2
//                 rounded-lg
//                 bg-[#163300]
//                 text-white
//                 text-sm
//                 flex items-center gap-2
//               "
//                         >
//                             <Download size={16} />
//                             Export
//                         </button>
//                     </div>
//                 </div>

//                 {/* TABLE */}
//                 <div className="overflow-auto">
//                     <table
//                         className="
//               min-w-full
//               border-collapse
//               table-fixed
//             "
//                         style={{
//                             width:
//                                 table.getCenterTotalSize(),
//                         }}
//                     >
//                         <thead className="bg-[#FAFAF8]">
//                             {table
//                                 .getHeaderGroups()
//                                 .map((headerGroup) => (
//                                     <tr key={headerGroup.id}>
//                                         {headerGroup.headers.map(
//                                             (header) => (
//                                                 <th
//                                                     key={header.id}
//                                                     style={{
//                                                         width:
//                                                             header.getSize(),
//                                                     }}
//                                                     className="
//                             relative
//                             border-r
//                             border-b
//                             border-black/10
//                             px-4 py-4
//                             text-left
//                             text-xs
//                             font-semibold
//                             uppercase
//                             tracking-wider
//                             whitespace-nowrap
//                           "
//                                                 >
//                                                     <div
//                                                         className="
//                               flex items-center gap-2
//                               cursor-pointer
//                             "
//                                                         onClick={header.column.getToggleSortingHandler()}
//                                                     >
//                                                         {flexRender(
//                                                             header.column
//                                                                 .columnDef
//                                                                 .header,
//                                                             header.getContext()
//                                                         )}

//                                                         {{
//                                                             asc: (
//                                                                 <ArrowUp
//                                                                     size={14}
//                                                                 />
//                                                             ),

//                                                             desc: (
//                                                                 <ArrowDown
//                                                                     size={14}
//                                                                 />
//                                                             ),
//                                                         }[
//                                                             header.column.getIsSorted()
//                                                         ] ?? (
//                                                                 <ArrowUpDown
//                                                                     size={14}
//                                                                 />
//                                                             )}
//                                                     </div>

//                                                     <div
//                                                         onMouseDown={header.getResizeHandler()}
//                                                         onTouchStart={header.getResizeHandler()}
//                                                         className="
//                               absolute
//                               top-0
//                               right-0
//                               h-full
//                               w-2
//                               cursor-col-resize
//                               hover:bg-[#9FE870]
//                             "
//                                                     />
//                                                 </th>
//                                             )
//                                         )}
//                                     </tr>
//                                 ))}
//                         </thead>

//                         <tbody>
//                             {table
//                                 .getRowModel()
//                                 .rows.map((row) => (
//                                     <tr
//                                         key={row.id}
//                                         className="hover:bg-[#FAFAF8]"
//                                     >
//                                         {row
//                                             .getVisibleCells()
//                                             .map((cell) => (
//                                                 <td
//                                                     key={cell.id}
//                                                     style={{
//                                                         width:
//                                                             cell.column.getSize(),
//                                                     }}
//                                                     className="
//                             border-r
//                             border-b
//                             border-black/10
//                             px-4 py-4
//                             text-sm
//                           "
//                                                 >
//                                                     {flexRender(
//                                                         cell.column
//                                                             .columnDef.cell,
//                                                         cell.getContext()
//                                                     )}
//                                                 </td>
//                                             ))}
//                                     </tr>
//                                 ))}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* PAGINATION */}
//                 <div className="px-6 py-4 flex items-center justify-between border-t border-black/10">
//                     <div className="text-sm text-gray-500">
//                         Page{" "}
//                         {table.getState().pagination
//                             .pageIndex + 1}{" "}
//                         of {table.getPageCount()}
//                     </div>

//                     <div className="flex items-center gap-2">
//                         <button
//                             onClick={() =>
//                                 table.previousPage()
//                             }
//                             disabled={
//                                 !table.getCanPreviousPage()
//                             }
//                             className="
//                 p-2 border rounded-md
//               "
//                         >
//                             <ChevronLeft size={16} />
//                         </button>

//                         <button
//                             onClick={() =>
//                                 table.nextPage()
//                             }
//                             disabled={
//                                 !table.getCanNextPage()
//                             }
//                             className="
//                 p-2 border rounded-md
//               "
//                         >
//                             <ChevronRight size={16} />
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* DOWNLOAD MODAL */}
//             {showDownloadModal && (
//                 <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//                     <div className="w-full max-w-md bg-white rounded-2xl p-6">
//                         <div className="flex items-center justify-between mb-5">
//                             <h2 className="text-lg font-semibold">
//                                 Export Responses
//                             </h2>

//                             <button
//                                 onClick={() =>
//                                     setShowDownloadModal(
//                                         false
//                                     )
//                                 }
//                             >
//                                 <X size={18} />
//                             </button>
//                         </div>

//                         <div className="space-y-3 max-h-[300px] overflow-auto">
//                             {visibleFields.map((field) => (
//                                 <label
//                                     key={field.label}
//                                     className="flex items-center gap-3"
//                                 >
//                                     <input
//                                         type="checkbox"
//                                         checked={selectedFields.includes(
//                                             field.label
//                                         )}
//                                         onChange={(e) => {
//                                             if (
//                                                 e.target.checked
//                                             ) {
//                                                 setSelectedFields(
//                                                     (prev) => [
//                                                         ...prev,
//                                                         field.label,
//                                                     ]
//                                                 );
//                                             } else {
//                                                 setSelectedFields(
//                                                     (prev) =>
//                                                         prev.filter(
//                                                             (f) =>
//                                                                 f !==
//                                                                 field.label
//                                                         )
//                                                 );
//                                             }
//                                         }}
//                                     />

//                                     <span>
//                                         {field.label}
//                                     </span>
//                                 </label>
//                             ))}
//                         </div>

//                         <div className="mt-5">
//                             <label className="flex items-center gap-2">
//                                 <input
//                                     type="checkbox"
//                                     checked={downloadAll}
//                                     onChange={() =>
//                                         setDownloadAll(
//                                             !downloadAll
//                                         )
//                                     }
//                                 />

//                                 <span>
//                                     Download all data
//                                 </span>
//                             </label>
//                         </div>

//                         <button
//                             onClick={exportCSV}
//                             className="
//                 mt-6
//                 w-full
//                 py-3
//                 rounded-xl
//                 bg-[#163300]
//                 text-white
//               "
//                         >
//                             Download CSV
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default DynamicResponseTable;