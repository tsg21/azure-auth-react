import { useEffect, useState } from "react"
import {authProvider} from './authProvider'


const Content = ({}) => {
  const [text, setText] = useState("unset")
  useEffect(() => {
      const tokenRequest = {
          scopes: ["api://backend1/Read"]
      }
      const accessTokenResponse = authProvider.getAccessToken(tokenRequest)

      setText(accessTokenResponse.accessToken)
  }, [])

  return <p>{text}</p>
}

export default Content