import axios from 'axios'
const baseUrl = `${process.env.REACT_APP_URL}/api/dishs`

const onCreateDish = async (dish) => {
  const formData = new FormData()
  formData.append('image', dish.image)
  formData.append('name', dish.name)
  formData.append('description', dish.description)
  formData.append('price', dish.price)
  formData.append('categoryId', dish.categoryId)
  try {
    const resp = await axios.post(`${baseUrl}`, formData, {
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

export { onCreateDish }