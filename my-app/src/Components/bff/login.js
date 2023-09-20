import React, {useEffect,useState} from 'react'

function Login(email, password) // needs to start a session
{
    const [backEndData,setBackendData] = useState([{}])

    useEffect(() =>{
        fetch("http://157.245.213.41:5000/api_Login").then(
            response => response.json() // Idk what's hear yet
        ).then(
            data => {
              setBackendData(data) //idk what's here yet
            }
        )
    },[])
  return(
    //   <div>
    //       {(typeof backEndData.users === 'undefined') ? (
    //           <p>Loading...</p>
    //       ):(
    //           backEndData.users.map((user,i) =>(
    //               <p key={{i}}>{user}</p>
    //           ))
    //       )}
    //   </div>
    <h1>logged in</h1>
  )

}

export default Login