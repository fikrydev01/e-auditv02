import React, { use, useState } from 'react'
import Breadcrumbs from '../../../components/Breadcrumbs'
import List from './revdok/List'
import AddRevdok from './revdok/AddRevdok'

const RevDok = () => {
  const [mod, setMod] = useState('list')
  const kembali = () => setMod('list')
  return (
    <section className="section-container">
      <Breadcrumbs title="Review Dokumen" />

      {mod==='list' && <List setMod={setMod} />}
      {mod==='add' && <AddRevdok kembali={kembali} />}
      {/* <List /> */}
      
    </section>
  )
}

export default RevDok