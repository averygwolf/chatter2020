import React, {useState} from 'react';
import './App.css';
import NamePicker from './namePicker'

function App() {
  const [messages, setMessages] = useState([])


  return <main>

    <header>  
      <div className='logo-wrap'>
      <img className='logo' 
        alt='logo'
        src='https://www.pinclipart.com/picdir/big/369-3696201_chat-group-conversation-svg-png-icon-free-.png'
      />
      Chatter
      </div>
      <NamePicker onSave={name=>{}}/> 
    </header>

    <div className='allmessages'>
    {messages.map((m,i) => {
      return <div key={i} className='text-wrapper'> 
        <div className='messages'>{m}</div> 
      </div>
      /* displays messages that are sent, looping through the message array and printing the message */
    })}
    </div>

    <TextInput onSend={t => {
      setMessages([t, ...messages]) /* ... is called the spread operator, more functional operator, react likes it better*/
    }} />
    
  </main>
}

/* function Message() {
  return <div className='message'>
    <header> hey how is it going? </header>
  </div> 
} */

function TextInput(props) {
  const [text, setText] = useState('')
  

  return <div className='text-input'>
    <input className='input'
      value={text}
      placeholder='write your message'
      onChange={e=> setText(e.target.value)}
    />
    <button className='button'
      onClick={() => {
      if(text) {
        props.onSend(text) 
      }
      setText('')
      }}>
      <img className='sendbutton'
        src='https://freepngimg.com/download/web_design/24677-8-up-arrow-transparent-image.png'
      />
    </button>
  </div>
}

export default App;

