import React, { useEffect, useState } from "react"

const RequirementField = ({
  register,
  name,
  placeholder,
  label,
  errors,
  setValue,
  getValues,
}) => {
  const [requirement, setRequirement] = useState("")
  const [requirementList, setRequirementList] = useState([])

  useEffect(() => {
    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    })
    if (getValues(name)) {
      setRequirementList(getValues(name))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setValue(name, requirementList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requirementList])

  function addRequirement() {
    if (requirement !== "") {
      setRequirementList([...requirementList, requirement])
      setRequirement("")
    }
  }
  function clearRequirement(ind) {
    let updated = [...requirementList]
    updated.splice(ind, 1)
    setRequirementList(updated)
  }
  return (
    <div>
      <label htmlFor={name} className="labelStyle">
        {label}
        <sup className="text-pink-200">*</sup>{" "}
      </label>
      <div>
        <input
          id={name}
          type="text"
          onChange={(e) => setRequirement(e.target.value)}
          value={requirement}
          autoComplete="off"
          placeholder={placeholder}
          className="inputStyle w-full"
        />
        <button
          onClick={(e) => {
            e.preventDefault()
            addRequirement()
          }}
          className="text text-base font-bold text-yellow-50 "
        >
          Add
        </button>
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-yellow-100">
          {label} is required
        </span>
      )}
      {requirementList.length > 0 && (
        <ul>
          {requirementList.map((ele, ind) => (
            <li key={ind} className="m-2 w-fit ">
              <span>{ele}</span>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  clearRequirement(ind)
                }}
                className="mx-2 rounded-md bg-richblack-500 px-1 text-yellow-25"
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default RequirementField
