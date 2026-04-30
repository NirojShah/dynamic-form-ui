import React, { useState } from "react";

const FieldLibrary = ({ onSelect }) => {
  const [search, setSearch] = useState("");

  const groups = [
    {
      title: "Basic",
      color: "bg-[#163300]/10 text-[#163300]",
      fields: [
        { label: "Short text", icon: "T", type: "text" },
        { label: "Long text", icon: "¶", type: "textarea" },
        { label: "Email", icon: "@", type: "email" },
        { label: "Phone", icon: "✆", type: "phone" },
        { label: "Number", icon: "#", type: "number" },
        { label: "Multiple choice", icon: "◉", type: "radio" },
        { label: "Checkboxes", icon: "☑", type: "checkbox" },
        { label: "Dropdown", icon: "▾", type: "select" },
      ],
    },
    {
      title: "Advanced",
      color: "bg-cyan-100 text-cyan-700",
      fields: [
        { label: "Rating", icon: "★", type: "rating" },
        { label: "Scale", icon: "⟷", type: "scale" },
        { label: "Date", icon: "⊡", type: "date" },
        { label: "File upload", icon: "↑", type: "file" },
        { label: "Signature", icon: "✎", type: "signature" },
      ],
    },
    {
      title: "Layout",
      color: "bg-orange-100 text-orange-700",
      fields: [
        { label: "Divider", icon: "—", type: "divider" },
        { label: "Heading", icon: "H", type: "heading" },
      ],
    },
  ];

  const handleSelect = (field) => {
    console.log("Selected field:", field);
    onSelect?.(field);
  };

  const filterFields = (fields) =>
    fields.filter((f) =>
      f.label.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="w-full h-full flex flex-col border-r border-black/10 bg-white">
      
      {/* SEARCH */}
      <div className="p-3 border-b border-black/10">
        <input
          type="text"
          placeholder="Search fields…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 text-sm border rounded-md outline-none focus:ring-1 focus:ring-[#9FE870]"
        />
      </div>

      {/* FIELD GROUPS */}
      <div className="flex-1 overflow-y-auto p-3 space-y-6">
        {groups.map((group) => {
          const filtered = filterFields(group.fields);
          if (filtered.length === 0) return null;

          return (
            <div key={group.title}>
              
              {/* GROUP TITLE */}
              <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                {group.title}
              </div>

              {/* FIELDS */}
              <div className="flex flex-col gap-2">
                {filtered.map((field) => (
                  <div
                    key={field.type}
                    onClick={(e) => {
                      e.stopPropagation(); // ✅ prevent unwanted bubbling
                      handleSelect(field);
                    }}
                    className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer hover:bg-black/5 transition"
                  >
                    {/* ICON */}
                    <div
                      className={`w-7 h-7 flex items-center justify-center rounded ${group.color} text-xs font-semibold`}
                    >
                      {field.icon}
                    </div>

                    {/* LABEL */}
                    <span className="text-sm text-[#0E0F0C]">
                      {field.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FieldLibrary;