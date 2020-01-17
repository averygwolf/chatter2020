import React, {useState} from 'react';
import './App.css';


function App() {
  return <main>

    <header>  
      <img className='logo' 
        alt='logo'
        src='https://www.pinclipart.com/picdir/big/369-3696201_chat-group-conversation-svg-png-icon-free-.png'
      />
      Chatter
    </header>

    <TextInput onSend={t => console.log(t)}/>
    
  </main>
}

function Message() {
  return <div className='message'>
    <header> hey how is it going? </header>
  </div> 
}

function TextInput(props) {
  const [text, setText] = useState('')
  

  return <div className='text-input'>
    <input className='input'
      value={text}
      onChange={e=> setText(e.target.value)}
    />
    <button className='button'
      onClick={() => {
      props.onSend(text) 
      setText('')
      }}> 
      <img className='sendbutton'
        src='https://freepngimg.com/download/web_design/24677-8-up-arrow-transparent-image.png'
      />
    </button>
  </div>
}

export default App;
