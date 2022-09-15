import {createContext, useState, useEffect} from 'react'
import React from 'react'
import {v4 as uuidv4} from 'uuid'



const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(true)
  const[feedback, setFeedback] = useState([])
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  })

  useEffect(() => {
    console.log(123)
  }, [])

  const fetchFeedback = async () => {
    const response = await fetch('http://localhost:5000/feedback?_sort=id&_order=desc')

    const data = await response.json()

    setFeedback(data)
    setIsLoading(false)
  }

  //Edit Feedback
  const deleteFeedback = (id) => {
    if(window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  //Add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback]) //Spread operator
  }

  //Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  const updateFeedback = (id, updItem) => {
    setFeedback(feedback.map((item) => item.id === id ? {...item, ...updItem} : item))
  }

  return <FeedbackContext.Provider value={{
    feedback: feedback,
    deleteFeedback: deleteFeedback,
    addFeedback: addFeedback,
    editFeedback: editFeedback,//The method edit feedback
    feedbackEdit: feedbackEdit,  //Object we get from editFeedback method
    updateFeedback: updateFeedback,
    isLoading: isLoading
  }}>
    {children}
  </FeedbackContext.Provider>
}

export default FeedbackContext