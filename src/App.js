import React, {useState, useEffect} from 'react';
import './App.css';
import NamePicker from './namePicker'
import {db, useDB} from './db'
import { BrowserRouter, Route } from 'react-router-dom'
import Camera from 'react-snap-pic'
import { FiSend, FiCamera } from 'react-icons/fi'
import * as firebase from "firebase/app"
import "firebase/storage"


function App() {
  useEffect(()=> {
    const {pathname} = window.location /* destructuring format */
    if(pathname.length<2) window.location.pathname='home'
  }, [])
  return <BrowserRouter>
    <Route path='/:room' component={Room}/>
  </BrowserRouter>
}


function Room(props) {
  const {room} = props.match.params
  const [name, setName] = useState('')
  const messages = useDB(room)
  const [showCamera, setShowCamera] = useState(false)

  // async allows you to use 'await' 
  async function takePicture(img) {
    setShowCamera(false)
    const imgID = Math.random().toString(36).substring(7)
    var storageRef = firebase.storage().ref()
    var ref = storageRef.child(imgID + '.jpg')
    await ref.putString(img, 'data_url')
    db.send({ img: imgID, name, ts: new Date(), room })
  }

  return <main>

    {showCamera && <Camera takePicture={takePicture} />}

    <header>  
      <div className='logo-wrap'>
      <img className='logo' 
        alt='logo'
        src='https://www.pinclipart.com/picdir/big/369-3696201_chat-group-conversation-svg-png-icon-free-.png'
      />
      Chatter
      </div>
      <NamePicker onSave={setName}/> 
    </header>

    <div className='allmessages'>
      {messages.map((m,i) => <Message key={i} m={m} name={name} />)}
    </div>

    <TextInput onSend={(text)=> {
        db.send({
          text, name, ts: new Date(), room
        })
      }}
      showCamera={()=>setShowCamera(true)}
    />
    
  </main>
}

const bucket = 'https://firebasestorage.googleapis.com/v0/b/chatter2020-a7441.appspot.com/o/'
const suffix = '.jpg?alt=media'

function Message({m, name}) {
  return <div className='text-wrapper' 
    from={m.name===name?'me':'you'}> 
    <div className='msg-name'> {m.name}</div>
    <div className='messages'>
      {m.text}
      {m.img && <img src={bucket + m.img + suffix} alt='pic' />}
      </div> 
  </div>
}


function TextInput(props) {
  const [text, setText] = useState('')
  
  return <div className='text-input'>
    <button className='cam' onClick={props.showCamera}
      style={{position:'absolute', left:2, top:10}}>
      <FiCamera style={{height:15, width:15}} />
    </button>
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

