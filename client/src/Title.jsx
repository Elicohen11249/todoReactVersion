import { useState ,useEffect} from "react";

export default function Title() {
const [titling, setTitle ] = useState(null)
  const title = "To Do App!"
  

  function displayTitleTillIndex(index) {
    let subTitle = title.substring(0, index + 1)
    if (index < title.length - 1) subTitle += '_';
       setTitle(subTitle)
  }
  function displayTitle() {
    for (let i = 0; i < title.length; i++) {
      setTimeout(function () { displayTitleTillIndex(i) }, i * 100)
    }
  }
useEffect(()=>{ displayTitle()}, [])
  return (
    <h1>{titling }</h1>
  )
} 