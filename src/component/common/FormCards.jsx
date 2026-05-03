import React from "react";

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
  const classes = [
    "w-full rounded-2xl text-left transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-black/10",
    sizeStyles[size],
    variantStyles[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      onClick={() => {
        onClick(title, organization);
      }}
      className={classes}
    >
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
    </button>
  );
};

export default FormCard;
