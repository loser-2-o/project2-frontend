import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Submit() {
  const [title, setTitle] = useState('')
  const [abstract, setAbstract] = useState('')
  const [message, setMessage] = useState('')
  const [submissions, setSubmissions] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      const res = await axios.get('https://project2-backend-8nz7.onrender.com/submissions/public')
      setSubmissions(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async () => {
    if (!title || !abstract) {
      setMessage('Please fill all fields!')
      return
    }
    try {
      await axios.post('https://project2-backend-8nz7.onrender.com/submissions', { title, abstract })
      setMessage('Submitted successfully!')
      setTitle('')
      setAbstract('')
      fetchSubmissions()
    } catch (err) {
      setMessage('Something went wrong!')
    }
  }

  const statusStyle = (status) => {
    if (status === 'approved') return 'text-green-400 bg-green-900 border border-green-700'
    if (status === 'rejected') return 'text-red-400 bg-red-900 border border-red-700'
    return 'text-yellow-400 bg-yellow-900 border border-yellow-700'
  }

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <div className="max-w-2xl mx-auto">

        <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-800 mb-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-blue-400">Research Submission</h1>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-500"
              onClick={() => navigate('/login')}
            >
              Admin Login
            </button>
          </div>

          {message && (
            <p className={`mb-4 text-center font-medium ${message.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
              {message}
            </p>
          )}

          <input
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-3 mb-4 placeholder-gray-500 focus:outline-none focus:border-blue-500"
            placeholder="Research Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && document.getElementById('abstract').focus()}
          />
          <textarea
            id="abstract"
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-3 mb-6 h-32 placeholder-gray-500 focus:outline-none focus:border-blue-500"
            placeholder="Abstract"
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
          />
          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-500 transition"
            onClick={handleSubmit}
          >
            Submit Research
          </button>
        </div>

        {submissions.length > 0 && (
          <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-800">
            <h2 className="text-xl font-bold text-blue-400 mb-4">All Submissions</h2>
            <ul className="space-y-3">
              {submissions.map((sub) => (
                <li key={sub._id} className="border border-gray-700 rounded-xl p-4 bg-gray-800">
                  <h3 className="font-bold text-white mb-1">{sub.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyle(sub.status)}`}>
                    {sub.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  )
}

export default Submit