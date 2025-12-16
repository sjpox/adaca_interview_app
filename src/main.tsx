import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import StudentDataTable from './StudentDataTable.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StudentDataTable />
  </StrictMode>,
)
