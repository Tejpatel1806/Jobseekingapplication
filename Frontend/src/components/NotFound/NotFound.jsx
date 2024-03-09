import React from 'react'
import { Link } from 'react-router-dom'
const Notfound = () => {
  return (
    <>
    <section className='page notfound'>
      <div className="content">
        <img src="/notfound.png" alt="notfound" />
        <Link to={'/'}>RETURN TO HOME PAGE</Link>
      </div>
    </section>
</>
  )
}

export default Notfound
