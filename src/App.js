// потрібно створити логіку, яка задовільнить наступні вимоги
// в нас має бути 6 кнопок, які дозволяють нам переключатись між 
// 'табами' (posts, comments, albums, photos, todos, users)
// дефолтно обрана таба- пости
// по кліку на кнопку ми повинні підтягнути відповідний список і зрендерити його через .map
// лише 1 список видимий одночасно
// потрібно створити 6 компонент, які займатимуться рендерінгом списків 
// (отримуватимуть пропсами список)- PostList, CommentsList...
import React, { useEffect, useState } from 'react'
import './App.css'
const posts = 'https://jsonplaceholder.typicode.com/posts'
const comments = 'https://jsonplaceholder.typicode.com/comments'
const albums = 'https://jsonplaceholder.typicode.com/albums'
const photos = 'https://jsonplaceholder.typicode.com/photos'
const todos = 'https://jsonplaceholder.typicode.com/todos'
const users = 'https://jsonplaceholder.typicode.com/users'
const PostList=(props)=>{
  let elem = props.data
  return(
    <>
    {elem.map(elem=>(
      <div key={elem.id}>
        <h3>{elem.title}</h3>
        <p>{elem.body}</p>
      </div>
    ))}
    </>
  )
}
const AlbumsList=(props)=>{
  let elem = props.data
  return(
    <>
    {elem.map(elem=>(
      <div key={elem.id}>
        <h3>{elem.title}</h3>
      </div>
    ))}
    </>
  )
}
const TodosList=(props)=>{
  let elem = props.data
  return(
    <>
    {elem.map(elem=>(
      <div key={elem.id}>
        <h3>{elem.title} - {elem.completed.toString()}</h3>
      </div>
    ))}
    </>
  )
}
const UsersList=(props)=>{
  let elem = props.data
  return(
    <>
    {elem.map(elem=>(
      <div key={elem.id}>
        <h3>{elem.name}</h3>
        <h4>{elem.username}</h4>
        <h4>{elem.phone}</h4>
        <hr/>
      </div>
    ))}
    </>
  )
}
const PhotosList=(props)=>{
  let elem = props.data
  return(
    <>
    {elem.map(elem=>(
      <div key={elem.id}>
        <h3>{elem.title}</h3>
        <p>{elem.url}</p>
      </div>
    ))}
    </>
  )
}
const CommentsList=(props)=>{
  let elem = props.data
  return(
    <>
    {elem.map(elem=>(
      <div key={elem.id}>
        <h3>{elem.name}</h3>
        <h4>{elem.email}</h4>
        <p>{elem.body}</p>
        <br/>
      </div>
    ))}
    </>
  )
}
function App() {
  let [state, setState] = useState(posts)
  let [list, setList] = useState([])
  const ShowData = (props) => {
    if(props!==state){
    setState(props); 
    setList([])}}
  const fetchData = async () => {
    const response = await fetch(state)
    const data = await response.json();
    setList(data)
  }
  useEffect(()=>{
    fetchData()
  },
  [state])
  return (
    <div  className='Body'>
      <div className='Main'>
        <button className='Button' onClick={() => ShowData(posts)} >Posts</button>
        <button className='Button' onClick={() => ShowData(albums)} >Albums</button>
        <button className='Button' onClick={() => ShowData(todos)} >Todos</button>
        <button className='Button' onClick={() => ShowData(users)} >Users</button>
        <button className='Button' onClick={() => ShowData(photos)} >Photos</button>
        <button className='Button' onClick={() => ShowData(comments)} >Comments</button>
      </div>
      <div className='Content'>
        {state === posts &&<PostList data={list}/>}
        {state === albums &&<AlbumsList data={list}/>}
        {state === todos &&<TodosList data={list}/>}
        {state === users &&<UsersList data={list}/>}
        {state === photos &&<PhotosList data={list}/>}
        {state === comments &&<CommentsList data={list}/>}
      </div>

    </div>
  )
}
export default App