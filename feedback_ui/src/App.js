function App() {
  return (
    React.cloneElement('div', {className: 'containe'},
    React.createElement('h1', {}, 'My App')
    )
  )
}


export default App