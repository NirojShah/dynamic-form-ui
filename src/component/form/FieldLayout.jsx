import React from "react";
import formFieldStore from "../../store/fields.store";

const FieldLayout = () => {
  const type = formFieldStore((state) => state.type);

  const label = formFieldStore((state) => state.label);

  if (!type) return null;

  return (
    <div className="w-80 border-l border-black/10 bg-white flex flex-col">
      {/* HEADER */}
      <div className="p-4 border-b">
        <div className="text-sm font-semibold">Field settings</div>
        <div className="text-xs text-gray-500 capitalize">{type}</div>
      </div>

      {/* BODY */}
      <div className="p-4 flex flex-col gap-4 overflow-y-auto">
        {/* TOGGLES */}
        <div className="flex justify-between items-center">
          <span className="text-sm">Required</span>
          <input type="checkbox" />
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm">Hidden</span>
          <input type="checkbox" />
        </div>

        {/* LABEL */}
        <div>
          <div className="text-xs text-gray-500 mb-1">Label</div>
          <input
            className="w-full border px-2 py-1 rounded text-sm"
            defaultValue={label}
          />
        </div>

        {/* PLACEHOLDER */}
        <div>
          <div className="text-xs text-gray-500 mb-1">Placeholder</div>
          <input
            className="w-full border px-2 py-1 rounded text-sm"
            placeholder="Placeholder text..."
          />
        </div>

        {/* HELP TEXT */}
        <div>
          <div className="text-xs text-gray-500 mb-1">Help text</div>
          <input
            className="w-full border px-2 py-1 rounded text-sm"
            placeholder="Add help text..."
          />
        </div>

        {/* 🔥 CONDITIONAL RENDERING */}
        {type === "scale" && (
          <div>
            <div className="text-xs text-gray-500 mb-1">Range</div>
            <div className="flex gap-2">
              <input
                type="number"
                defaultValue={1}
                className="w-full border px-2 py-1 rounded text-sm"
              />
              <input
                type="number"
                defaultValue={10}
                className="w-full border px-2 py-1 rounded text-sm"
              />
            </div>
          </div>
        )}

        {type === "radio" && (
          <div>
            <div className="text-xs text-gray-500 mb-1">Options</div>
            <input
              className="w-full border px-2 py-1 rounded text-sm"
              placeholder="Option 1"
            />
          </div>
        )}

        {type === "checkbox" && (
          <div>
            <div className="text-xs text-gray-500 mb-1">Options</div>
            <input
              className="w-full border px-2 py-1 rounded text-sm"
              placeholder="Option 1"
            />
          </div>
        )}

        {/* REMOVE */}
        <button className="mt-6 bg-red-500 text-white text-sm py-2 rounded">
          Remove field
        </button>
      </div>
    </div>
  );
};

export default FieldLayout;
