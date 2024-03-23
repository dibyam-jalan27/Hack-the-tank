import React from "react"
import TopicCreateForm from "../components/core/Topic/TopicCreateForm"

const Community = () => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="m-2 text-xl text-white">Top Posts</h1>
      </div>
      <div>
        <TopicCreateForm />
      </div>
    </div>
  )
}

export default Community
