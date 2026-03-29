import React from "react"

export const Card = ({ children, className = "" }) => (
  <div className={`bg-white shadow rounded-lg p-4 ${className}`}>{children}</div>
)

export const CardHeader = ({ children, className = "" }) => (
  <div className={`mb-2 ${className}`}>{children}</div>
)

export const CardTitle = ({ children, className = "" }) => (
  <h3 className={`font-bold text-lg ${className}`}>{children}</h3>
)

export const CardDescription = ({ children, className = "" }) => (
  <p className={`text-gray-500 text-sm ${className}`}>{children}</p>
)

export const CardContent = ({ children, className = "" }) => (
  <div className={`mt-2 ${className}`}>{children}</div>
)
