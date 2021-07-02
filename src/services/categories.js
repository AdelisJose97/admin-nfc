import axios from 'axios'
const baseUrl = `${process.env.REACT_APP_URL}/api/categories`

const onCreateCategory = async (category) => {
  console.log(category)
  const formData = new FormData()
  formData.append('icon', category.icon)
  formData.append('name', category.name)
  formData.append('serviceId', category.serviceId)
  try {
    const resp = await axios.post(`${baseUrl}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      }
    })
    console.log(resp)
    return resp

  } catch (error) {
    return error.response
  }
}

const onEditCategory = async (category) => {
  console.log(category)
  const formData = new FormData()
  formData.append('_id', category._id)
  formData.append('icon', category.icon)
  formData.append('name', category.name)
  try {
    const resp = await axios.put(`${baseUrl}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      }
    })
    return resp

  } catch (error) {
    return error.response
  }
}

const onDeleteCategory = async (category) => {
  console.log(category)
  try {
    const response = await axios.delete(`${baseUrl}`, {
      data: { category },
      headers: {
        authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      }
    })
    return response

  } catch (error) {
    console.log(error)
  }

}

export { onCreateCategory, onEditCategory, onDeleteCategory }

