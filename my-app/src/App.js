import React, {useEffect,useState} from 'react'

function App()
{
    const [backEndData,setBackendData] = useState([{}])

    useEffect(() =>{
        fetch("http://157.245.213.41:5000/api").then(
            response => response.json()
        ).then(
            data => {
                setBackendData(data)
            }
        )
    },[])
  return(
      <div>
          {(typeof backEndData.users === 'undefined') ? (
              <p>Loading...</p>
          ):(
              backEndData.users.map((user,i) =>(
                  <p key={{i}}>{user}</p>
              ))
          )}
      </div>
  )
}

export default App