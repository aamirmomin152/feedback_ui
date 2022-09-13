import {createContext, useState} from 'react'
import React from 'react'
import {v4 as uuidv4} from 'uuid'



const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
  const[feedback, setFeedback] = useState([
    {
      id: 1,
      text: 'This is an item from context',
      rating: 10,
    }
  ])

  const deleteFeedback = (id) => {
    if(window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback]) //Spread operator
  }

  return <FeedbackContext.Provider value={{
    feedback: feedback,
    deleteFeedback: deleteFeedback,
    addFeedback: addFeedback
  }}>
    {children}
  </FeedbackContext.Provider>
}

export default FeedbackContext