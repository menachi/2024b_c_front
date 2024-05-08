import axios, { CanceledError } from "axios"
import { useEffect, useState } from "react"

interface Student {
  name: string
  age: number
  _id: string
}

function StudentsList() {
  console.log('StudentsList')
  const [students, setStudents] = useState<Student[]>()
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true)
    axios.get('http://localhost:3000/student', { signal: controller.signal }).then(response => {
      console.log(response.data)
      setStudents(response.data)
      setIsLoading(false)
    }).catch(error => {
      if (error instanceof CanceledError) return
      console.log(error);
      setError(error.message)
      setIsLoading(false)
    })
    return () => controller.abort()
  }, [])

  return (
    <div>
      <h1>Students</h1>
      {isLoading && <div className="spinner-border text-primary" />}
      {error && <div className="alert alert-danger">{error}</div>}
      {students?.map((item, index) => (<li className="list-group-item" key={index}>{item.name}</li>))}
    </div>
  )
}

export default StudentsList