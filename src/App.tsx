import { useState, useRef } from "react"
import "./App.css"
import { RandomScript } from "./RandomScript"

function App() {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [value, setValue] = useState("")
  const [answer, setAnswer] = useState<string>("")
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  const handleClick = () => {
    const Answer = RandomScript(value)
    setValue("")
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
    }
    setAnswer(Answer)
  }

  return (
    <>
      <h1>Голодные игры</h1>
      <p>Введите данные в формате: 'Имя' 'номер'</p>
      <div className="card">
        <button onClick={handleClick}>
          Перемешать
        </button>
        <textarea
          ref={textareaRef}
          className="autoTextarea"
          onInput={handleInput}
          onChange={handleInput}
          value={value}
        />
      </div>
      <p>Итог</p>
      <p className="answer-text">{answer}</p>
    </>
  )
}

export default App
