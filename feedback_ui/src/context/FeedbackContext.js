import {createContext, useState} from 'react'
import React from 'react'


const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
  const[feedback, setFeedback] = useState([
    {
      id: 1,
      text: 'This is an item from context',
      rating: 10,
    }
  ])
  return <FeedbackContext.Provider value={{
    feedback: feedback
  }}>
    {children}
  </FeedbackContext.Provider>
}

export default FeedbackContext