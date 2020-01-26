import {useState, useEffect} from 'react'
import * as firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"

let store
const coll = 'messages'

function useDB(room) {
    const [messages, setMessages] = useState([])
    function add(m) {
        setMessages(current => {
            const msgs = [m, ...current]
            msgs.sort((a,b)=> b.ts.seconds - a.ts.seconds)
            return msgs
        })
    }
    function remove(id) {
        setMessages(current=> current.filter(m=> m.id!==id))
    }
    useEffect(() => {
        store.collection(coll)
        .where('room','==',room)
        .onSnapshot(snap=> snap.docChanges().forEach(c=> {
            const {doc, type} = c
            if (type==='added') add({...doc.data(),id:doc.id})
            if (type==='removed') remove(doc.id)
        }))
    }, [])
    return messages
}

const db = {}
db.send = function(msg) {
    return store.collection(coll).add(msg)
}
db.delete = function(id) {
    return store.collection(coll).doc(id).delete()
}

export { db, useDB }

const firebaseConfig = {
    apiKey: "AIzaSyB3oC-bD-Hv5ANYV6pMRTkWcc-OBtLZzko",
    authDomain: "chatter2020-a7441.firebaseapp.com",
    databaseURL: "https://chatter2020-a7441.firebaseio.com",
    projectId: "chatter2020-a7441",
    storageBucket: "chatter2020-a7441.appspot.com",
    messagingSenderId: "478921202788",
    appId: "1:478921202788:web:0acc7a42a6e19671281371"
  };

firebase.initializeApp(firebaseConfig)
store = firebase.firestore()