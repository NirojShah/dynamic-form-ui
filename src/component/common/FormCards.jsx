import React, { useState, useRef, useEffect } from "react";
import formsApi from "../../utility/forms.api";

const sizeStyles = {
  sm: "p-4 text-sm",
  md: "p-6 text-base",
  lg: "p-8 text-lg",
};

const variantStyles = {
  default: "bg-white border border-black/10",
  outline: "bg-transparent border border-black/20",
  ghost: "bg-transparent border-none shadow-none",
};

const FormCard = ({
  title,
  organization,
  description,
  onClick,
  size = "md",
  variant = "default",
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  const classes = [
    "relative w-full rounded-2xl cursor-pointer transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-black/10",
    sizeStyles[size],
    variantStyles[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const handleCopy = async () => {
    try {
      const resp = await formsApi.getPublicLink(title, organization);
      const url = `${window.location.origin}/public/${resp}`
      await navigator.clipboard.writeText(url);
      setOpen(false);
      // replace with toast ideally
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick(title, organization)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onClick(title, organization);
      }}
      className={classes + " border-t-4 border-t-[#348303]"}    >
      {/* 3-dot menu */}
      <div
        ref={menuRef}
        className="absolute top-3 right-3 "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="p-1 rounded-md hover:bg-black/10"
        >
          ⋮
        </button>

        {open && (
          <div className="absolute right-0 p-2 mt-2 w-40 rounded-lg border bg-white shadow-md z-10">
            <button
              type="button"
              onClick={handleCopy}
              className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
            >
              Copy form link
            </button>
            <button
              className="block w-full px-4 py-2 text-left text-sm hover:bg-red-300"
            >
              delete
              \
            </button>
          </div>
        )}
      </div>

      {organization && (
        <div className="mb-3">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#454745]">
            {organization}
          </p>
        </div>
      )}

      <div>
        <h2 className="font-semibold tracking-[-0.02em] text-[#0E0F0C]">
          {title}
        </h2>

        {description && (
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#454745]">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default FormCard;