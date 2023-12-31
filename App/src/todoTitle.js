import axios from 'axios'

// Get the title of a To do note from a 3rd party API
const todoTitle = id =>
     axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`).then(res => res.data)

export default todoTitle