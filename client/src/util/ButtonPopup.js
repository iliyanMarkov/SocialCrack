import { Popup } from 'semantic-ui-react'
import React from 'react'

function ButtonPopup({ content, children }) {
   return <Popup inverted content={content} trigger={children} position='top center'/> 
}

export default ButtonPopup