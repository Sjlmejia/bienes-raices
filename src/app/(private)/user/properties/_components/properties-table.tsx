import prisma from '@/config/db'
import React from 'react'
import ClientSidePropertiesTable from './properties-table-clientside';

async function PropertiesTable() {
  const properties = await prisma.property.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div>
      <ClientSidePropertiesTable properties={properties} />
    </div>
  )
}

export default PropertiesTable
