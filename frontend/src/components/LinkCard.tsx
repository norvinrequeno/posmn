import React, { JSX } from "react";
import { Link } from "react-router-dom";

export default function LinkCard({
  bgCard = "bg-white",
  textColor = "text-amber-900",
  iconColor = "text-amber-700",
  icon,
  title,
  to,
  sm = true,
}: {
  bgCard?: string;
  textColor?: string;
  iconColor?: string;
  icon: JSX.Element;
  title: string;
  to: string;
  sm: boolean;
}) {
  return (
    <Link
      to={to}
      className={`w-full ${
        sm ? "sm:basis-1/2" : "hidden"
      } md:basis-1/3 lg:basis-1/4 min-h-32 mx-auto items-center justify-center rounded-2xl shadow p-6 flex flex-col hover:shadow-md transition-all ${bgCard}`}
    >
      <div>
        <div className={`flex items-center space-x-3 text-3xl ${iconColor}`}>
          <span>{React.cloneElement(icon, { className: "w-6 h-6" })}</span>
          <h2 className={`text-lg font-semibold uppercase ${textColor}`}>
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
}
