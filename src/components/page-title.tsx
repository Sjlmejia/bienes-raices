import React from 'react'

function PageTitle({title}: {title: string}) {
  return (
  <h1 className='text-sx font-bold text-primary mb-5'>{title}</h1>
  )
}

export default PageTitle
