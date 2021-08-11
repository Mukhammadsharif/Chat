import { useState, useEffect } from 'react'
import profileImage from '../static/profileImage.png'
import Group from '../static/Group.svg'
import MessageSvg from '../static/Message.svg'
import Logout from '../static/logout.svg'
import Employer from '../static/employer.png'
import Message from './Message'
import Private from "./Private";
import Axios from 'axios'

export default function Messages() {
    const [home, setHome] = useState(true)

    const [value, setValue] = useState('')
    const [message, setMessage] = useState('')
    const [updated, setUpdated] = useState('')
    const [messages, setMessages] = useState([])
    const [select, setSelect] = useState()
    const [edit, setEdit] = useState()

    const [valuePrivate, setValuePrivate] = useState('')
    const [messagePrivate, setMessagePrivate] = useState('')
    const [updatedPrivate, setUpdatedPrivate] = useState('')
    const [messagesPrivate, setMessagesPrivate] = useState([])
    const [selectPrivate, setSelectPrivate] = useState()
    const [editPrivate, setEditPrivate] = useState()

    const handleChange = (e) => {
        setValue(e.target.value)
    }


     const GetMessages = () => {
        fetch('http://127.0.0.1:8000/message-list/')
            .then(response => response.json())
            .then(data => {
                setMessages(data)
            }).catch((error) => {
                console.log(error);
            })
    }

    const CreateMessage = () => {
        Axios.post('http://127.0.0.1:8000/message-list/', {message})
            .then(res => {
                console.log(res.data)
            })
    }

    const DeleteMessage = () => {
        if(select) {
            Axios.delete(`http://127.0.0.1:8000/message-detail/${select}/`)
                .then(res => {
                    console.log(res.data)
                    setSelect('')
                })
        }
    }


    const EditMessage = () => {
        if(edit) {
            Axios.get(`http://127.0.0.1:8000/message-detail/${edit}/`)
                .then(res => {
                    console.log(res.data)
                    setValue(res.data.message)
                })
        }
    }

    const UpdateMessage = () => {
        if(edit) {
            Axios.put(`http://127.0.0.1:8000/message-detail/${edit}/`,
                {'id': edit, 'message': updated})
                .then(res => {
                    console.log(res.data)
                    setEdit(null)
                })
        }
    }
    useEffect(() => {
        GetMessages()
        DeleteMessage()
        EditMessage()
    }, [edit, select, message])

    useEffect(() => {
        if (message !== ''){
           CreateMessage()
            GetMessages()
        }
    }, [message])

    useEffect(() => {
        UpdateMessage()
        setValue('')
    }, [updated])


    const handleChangePrivate = (e) => {
        setValuePrivate(e.target.value)
    }


     const GetMessagesPrivate = () => {
        fetch('http://127.0.0.1:8000/private-list/')
            .then(response => response.json())
            .then(data => {
                setMessagesPrivate(data)
            }).catch((error) => {
                console.log(error);
                console.log(messagesPrivate)
            })
    }

    const CreateMessagePrivate = () => {
        Axios.post('http://127.0.0.1:8000/private-list/', {'private': messagePrivate})
            .then(res => {
                console.log(res.data)
            })
    }

    const DeleteMessagePrivate = () => {
        if(selectPrivate) {
            Axios.delete(`http://127.0.0.1:8000/private-detail/${selectPrivate}/`)
                .then(res => {
                    console.log(res.data)
                    setSelectPrivate('')
                })
        }
    }

    const EditMessagePrivate = () => {
        if(editPrivate) {
            Axios.get(`http://127.0.0.1:8000/private-detail/${editPrivate}/`)
                .then(res => {
                    console.log(res.data)
                    setValuePrivate(res.data.private)
                })
        }
    }

    const UpdateMessagePrivate = () => {
        if(editPrivate) {
            Axios.put(`http://127.0.0.1:8000/private-detail/${editPrivate}/`,
                {'id': editPrivate.id, 'private': updatedPrivate})
                .then(res => {
                    console.log(res.data)
                    setEditPrivate(null)
                })
        }
    }
    useEffect(() => {
        GetMessagesPrivate()
        DeleteMessagePrivate()
        EditMessagePrivate()
    }, [editPrivate, selectPrivate, messagePrivate, home])

    useEffect(() => {
        if (messagePrivate !== ''){
           CreateMessagePrivate()
            GetMessagesPrivate()
        }
    }, [messagePrivate])

    useEffect(() => {
        UpdateMessagePrivate()
        setValuePrivate('')
    }, [updatedPrivate])

    return (
        <div className='container is-flex is-flex-direction-row is-justify-content-space-around'>
            <div className='profile'>
                <div className='profileImage'>
                    <img src={profileImage} alt={profileImage}/>
                </div>

                <div className='changeMessage'>
                        <img src={Group} alt={Group} onClick={() => setHome(true)}/>
                        <img
                            src={MessageSvg}
                            style={{marginTop: '150px'}}
                            alt={MessageSvg}
                            onClick={() => setHome(false)}/>
                </div>

                <div>
                    <img src={Logout} alt={Logout}/>
                </div>
            </div>


            { home ? (
                 <div className='messages'>
                <div className='chatName'>
                    <div className='employerContainer'>
                        <img src={Employer} className='employer' alt={Employer}/>
                        <div className='indicator'></div>
                     </div>

                     <div className='textContainer'>
                        <h4 className='employerName'>Janna</h4>
                        <h2 className='employerStatus'>online</h2>
                     </div>
                </div>

                <div className='separator ml-5'></div>

                <div>
                    {messages && messages.map(message => (
                        <Message
                            message = {message.message}
                            id={message.id}
                            key={message.id}
                            setSelect={setSelect}
                            setEdit={setEdit}
                        />
                    ))}
                </div>

                <div>
                    <input
                        className='input ml-5 mt-4'
                        style={{width: '70%', height: '50px'}}
                        placeholder='Send message...'
                        value={value}
                        onInput={(event) => handleChange(event)}
                    />

                    {!edit ? (
                        <button className='button is-link mt-4 ml-5'
                            style={{ height: '50px', borderRadius: '25px'}}
                            onClick={() => {
                                setMessage(value)
                                setValue('')
                                // console.log(messages)
                            }}
                    >
                        Send message
                    </button>
                    ): (
                       <button className='button is-link mt-4 ml-5'
                            style={{ height: '50px', borderRadius: '25px'}}
                            onClick={() => {
                                setUpdated(value)
                            }}
                    >
                        Update message
                    </button>
                    )}


                </div>

            </div>
            ) : (
                 <div className='messages'>
                <div className='chatName'>
                    <div className='employerContainer'>
                        <img src={Employer} className='employer' alt={Employer}/>
                        <div className='indicator'></div>
                     </div>

                     <div className='textContainer'>
                        <h4 className='employerName'>Janna</h4>
                        <h2 className='employerStatus'>online</h2>
                     </div>
                </div>

                <div className='separator ml-5'></div>

                <div>
                    {messagesPrivate && messagesPrivate.map(messagePrivate => (
                        <Private
                            messagePrivate = {messagePrivate.private}
                            id={messagePrivate.id}
                            key={messagePrivate.id}
                            setSelectPrivate={setSelectPrivate}
                            setEditPrivate={setEditPrivate}
                        />
                    ))}
                </div>

                <div>
                    <input
                        className='input ml-5 mt-4'
                        style={{width: '70%', height: '50px'}}
                        placeholder='Send message...'
                        value={valuePrivate}
                        onInput={(event) => {
                            handleChangePrivate(event)
                        }}
                    />

                    {!editPrivate ? (
                        <button className='button is-link mt-4 ml-5'
                            style={{ height: '50px', borderRadius: '25px'}}
                            onClick={() => {
                                setMessagePrivate(valuePrivate)
                                setValuePrivate('')
                            }}
                    >
                        Send message
                    </button>
                    ): (
                       <button className='button is-link mt-4 ml-5'
                            style={{ height: '50px', borderRadius: '25px'}}
                            onClick={() => {
                                setUpdatedPrivate(valuePrivate)
                            }}
                    >
                        Update message
                    </button>
                    )}


                </div>

            </div>
            )}
        </div>
    )
}