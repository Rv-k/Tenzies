import React from 'react'

const Dies = (props) => {


 const color = {
    backgroundColor: props.bool? "#32CD32": "#4B0082"
 }

  return (
   
         <div className='btn m-2' id="dies-btn" style={color} onClick={props.click}>
           <div id="text">
                {props.value}
           </div>
         </div>
    
  )
}

export default Dies