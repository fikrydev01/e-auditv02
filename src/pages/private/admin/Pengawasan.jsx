import React from 'react'
import Breadcrumbs from '../../../components/Breadcrumbs'
import TablePenugasan from './pengawasan/TablePenugasan'

const Pengawasan = () => {
  return (
       <section className='section-container'>
      <Breadcrumbs title="Pegawasan" />

      <TablePenugasan />
      </section>
  )
}

export default Pengawasan