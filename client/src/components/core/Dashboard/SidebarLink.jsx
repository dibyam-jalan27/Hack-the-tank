import React from "react"
import * as Icons from "react-icons/vsc"
import { NavLink, matchPath, useLocation } from "react-router-dom"

const SidebarLink = ({ link }) => {
  const Icon = Icons[link.icon]
  const location = useLocation()

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }
  return (
    // onCLick ?? 👻👻👻👻
    <NavLink
      to={link.path}
      className={`relative px-8 py-2 text-sm font-medium ${
        matchRoute(link.path) ? "bg-yellow-800" : "bg-opacity-0"
      }`}
    >
      <span
        className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        }`}
      ></span>

      <div className="item-center flex gap-x-2">
        <Icon className="text-lg" />
        <span>{link.name}</span>
      </div>
    </NavLink>
  )
}

export default SidebarLink
