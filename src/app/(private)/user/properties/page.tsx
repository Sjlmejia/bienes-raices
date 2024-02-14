import PageTitle from '@/components/page-title'
import React, { Suspense } from 'react'
import PropertiesTable from './_components/properties-table'
import LinkButton from '@/components/link-button'
import Loader from '@/components/loader'

function Properties() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Properties" />
        <LinkButton title="Create Property" path="/user/properties/create-property" />
      </div>
      <Suspense fallback={<Loader />}>
        <PropertiesTable />
      </Suspense>
    </div>
  )
}

export default Properties
