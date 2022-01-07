import React,{useState} from "react"
import axios from "axios"

const App = () => {
  const [data,setData] = useState(null)
  const onClick= async () => {
    try{
      const responce= await axios.get('https://newsapi.org/v2/top-headlines?country=kr&apiKey=41617cd0a1b246dfb3d63d4cd3f65767')
      setData(responce.data)
    }
    catch(e){
      console.log(e)
    }
  }
  return (
    <>
      <>
        <button onClick={onClick}>불러오기</button>
      </>
      {data && <textarea rows={7} value={JSON.stringify(data,null,2)} readOnly={true}/>}
    </>
  )
}
export default App