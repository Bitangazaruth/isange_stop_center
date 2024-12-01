import { Outlet } from 'react-router-dom'
import Tablesub from './Tablesub'

export default function Sub() {
  return (
<div>
    <Outlet/>
    <Tablesub/>
    </div>
  )
}
