import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCategoryData } from "../services/operations/categoryDataAPI"
import { categories } from "../services/apis"
import { apiConnector } from "../services/apiConnector"
import Footer from "../components/common/Footer"
import CourseSlider from "../components/core/Catalog/CourseSlider"
import { Loader } from "../components/common/Loader"

const Catalog = () => {
  const { categoryName } = useParams()
  const [data, setData] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)

  useEffect(() => {
    const fetchData = async function () {
      try {
        const categoryList = await apiConnector(
          "GET",
          categories.CATEGORIES_API
        )

        let category = categoryList.data.data.filter(
          (ct) => ct.name.replace(" ", "-").toLowerCase() === categoryName
        )[0]

        const res = await getCategoryData(category._id)
        setSelectedCategory(category)
        setData(res)
        //console.log(res)
      } catch (error) {
        //console.log(error)
      }
    }

    fetchData()

    return () => {
      setData(null)
    }
  }, [categoryName])
  return (
    <>
      {!data ? (
        <div className="h-[calc(100vh-3.5rem)]">
          <Loader />
        </div>
      ) : (
        <div className="overflow-auto">
          <div className="flex min-w-[765px] flex-col gap-3 bg-richblack-800 px-[2rem] py-8 lg:px-[7.5rem]">
            <div className="flex items-start gap-2 text-richblack-300">
              <p>Home</p>
              <p>/</p>
              <p>Catalog</p>
              <p>/</p>
              <p className="text-yellow-50">{selectedCategory?.name}</p>
            </div>
            <h1 className="text-3xl md1:text-4xl font-semibold leading-[2.75rem] text-richblack-5">
              {selectedCategory?.name}
            </h1>
            <p className="self-stretch  text-base font-medium text-richblack-300 ">
              {selectedCategory?.description}
            </p>
          </div>
          <div className="flex min-w-[765px] flex-col px-[2rem] py-8 lg:px-[7.5rem]">
            {data?.selectedCourses.length > 0 && (
              <div>
                <h1 className="pb-4 text-3xl md1:text-4xl font-semibold leading-[2.75rem] text-richblack-5">
                  Courses to get you started
                </h1>
                <CourseSlider courses={data?.selectedCourses} />
              </div>
            )}
            {data?.differentCourses.length > 0 && (
              <div>
                <h1 className="pb-4 text-3xl md1:text-4xl font-semibold leading-[2.75rem] text-richblack-5">
                  Top Courses
                </h1>
                <CourseSlider courses={data?.differentCourses} />
              </div>
            )}
            {data?.mostSellingCourses.length > 0 && (
              <div>
                <h1 className="pb-4 text-3xl md1:text-4xl font-semibold leading-[2.75rem] text-richblack-5">
                  Frequently Bought
                </h1>
                <CourseSlider courses={data?.mostSellingCourses} />
              </div>
            )}
          </div>
        </div>
      )}
      <Footer />
    </>
  )
}

export default Catalog
