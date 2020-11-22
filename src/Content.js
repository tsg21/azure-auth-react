import { useEffect, useState } from "react"


const Content = ({}) => {
  const [text, setText] = useState("unset")

  return <p>{text}</p>
}

export default Content