import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Admin() {
  const [submissions, setSubmissions] = useState([])
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get('https://project2-backend-8nz7.onrender.com/submissions', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setSubmissions(res.data)
    } catch (err) {
      navigate('/login')
    }
  }

  const handleStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token')
      await axios.patch(`https://project2-backend-8nz7.onrender.com/submissions/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (status === 'rejected') {
        setSubmissions(prev => prev.filter(sub => sub._id !== id))
      } else {
        setMessage(`Marked as ${status}!`)
        fetchSubmissions()
      }
    } catch (err) {
      setMessage('Something went wrong!')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  const statusStyle = (status) => {
    if (status === 'approved') return 'text-green-400 bg-green-900 border border-green-700'
    if (status === 'rejected') return 'text-red-400 bg-red-900 border border-red-700'
    return 'text-yellow-400 bg-yellow-900 border border-yellow-700'
  }

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <div className="max-w-3xl mx-auto bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-800">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-400">Admin Panel</h2>
          <div className="flex gap-2">
            <button
              className="bg-gray-800 text-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition"
              onClick={() => navigate('/')}
            >
              Back
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-500 transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        {message && <p className="text-green-400 mb-4">{message}</p>}

        {submissions.length === 0 ? (
          <p className="text-gray-500 text-center">No submissions yet!</p>
        ) : (
          <ul className="space-y-4">
            {submissions.map((sub) => (
              <li key={sub._id} className="border border-gray-700 rounded-xl p-5 bg-gray-800">
                <h3 className="font-bold text-white mb-1">{sub.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{sub.abstract}</p>
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyle(sub.status)}`}>
                    {sub.status}
                  </span>
                  <div className="flex gap-2">
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-500 transition"
                      onClick={() => handleStatus(sub._id, 'approved')}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-500 transition"
                      onClick={() => handleStatus(sub._id, 'rejected')}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

      </div>
    </div>
  )
}

export default Admin