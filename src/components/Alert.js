import React from 'react';

export default function Alert(props) {
  return (
    <div className='h-14 sm:h-9'>
       {props.alert && <div className={`${props.alert.color} border px-4 py-2 rounded relative`} role="alert">
  {/* <strong className="font-bold"></strong> */}
  <span className="block sm:inline">{props.alert.msg}</span>
  <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
  </span>
</div>}
    </div>
   
  );
}
