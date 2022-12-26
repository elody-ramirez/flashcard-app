import { useEffect, useState } from 'react'
import FlashCardList from './FlashCardList'
import './app.css'
import axios from 'axios'

function App() {
	const [flashcards, setFlashcards] = useState([])

	useEffect(() => {
        const decodeString = (str) => {
            const textArea = document.createElement('textarea')
            textArea.innerHTML = str
            return textArea.value
        }

        axios
        .get('http://localhost:3500/questions')
        .then(res => {
            console.log(res.data)
            setFlashcards(res.data.map((questionItem, index) => {
                const answer = decodeString(questionItem.correct_answer)
                const options = [
                ...questionItem.incorrect_answers.map(a => decodeString(a)), answer]
                return {
                id: `${index}-${Date.now()}`,
                question: decodeString(questionItem.question),
                answer: answer,
                options: options.sort(() => Math.random() - .5)
                }
            }))
        })
	}, [])

	return (
		<>  
            <div>
                <h1>Score: 0</h1>
            </div>
			<div className='container'>
				<FlashCardList flashcards={flashcards} />
			</div>
		</>
	)
}

export default App