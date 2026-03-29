import React from "react"

export const Badge = ({ children, variant = "default", className = "" }) => {
  let bg = "bg-gray-200 text-gray-800"
  if (variant === "secondary") bg = "bg-gray-400 text-white"
  if (variant === "destructive") bg = "bg-red-600 text-white"
  if (variant === "outline") bg = "border border-gray-400 text-gray-800"

  return <span className={`px-2 py-1 rounded text-xs ${bg} ${className}`}>{children}</span>
}
