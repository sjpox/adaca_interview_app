import { useMemo, useState } from 'react'
import './App.css'
import Table from './Table';
import { useMediaQuery } from 'usehooks-ts';

interface Student {
  id: number;
  name: string;
  subject: string;
  score: number;
  submissionDate: string;
} 

type DataHeader = Pick<Student, 'name' | 'id'>;

function StudentDataTable() {
  const rawClassData: Student[] = [
    { id: 1, name: "Alice Johnson", subject: "Math", score: 87, submissionDate: "2024-01-15" },
    { id: 2, name: "Bob Smith", subject: "Math", score: 92, submissionDate: "2024-01-15" },
    { id: 3, name: "Alice Johnson", subject: "Science", score: 78, submissionDate: "2024-01-16" },
    { id: 4, name: "Carol Davis", subject: "Math", score: 85, submissionDate: "2024-01-17" }
  ];

  const classDataHeader: DataHeader[] = rawClassData.map((value) => { 
    return {id: value.id, name: value.name} as DataHeader})
    .filter((value, index, self) => {
      return self.findIndex(v => v.name === value.name) === index
    })
  
  const mdMatches = useMediaQuery('(min-width: 768px)')
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [studentsData, setStudentsData] = useState<Student[]>(rawClassData)

  const average = studentsData
  .map((value)=> value.score)
  .reduce((prev, curr)=> {
    return prev + curr
  }) / studentsData.length

  const handleCheckbox = (value: string) => {
    // uncheck
    if(selectedOptions.includes(value)) {
      const opts = selectedOptions.filter((item) => item !== value)
      setSelectedOptions([...opts])
    } else {
      // check
      setSelectedOptions([...selectedOptions, value])
    }
  }

  useMemo(() => {
    if(selectedOptions.length > 0)
      setStudentsData([...rawClassData.filter((i)=> selectedOptions.includes(i.name))])
    else 
      setStudentsData([...rawClassData])
  }, [selectedOptions])
  
  return (
    <div>
      <div className='flex'>
        <div>
          <div>
            {
              classDataHeader.map((value) => {
                return (
                  <div key={value.id} onClick={()=> handleCheckbox(value.name)}>
                    <input type="checkbox" value={value.name} checked={selectedOptions.includes(value.name)}/>
                    {value.name}
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
      <Table className='border w-full'>
        {/* <Table.TableHead className='hidden md:table-cell'> */}
        {mdMatches && <Table.TableHead className=''>
          <Table.TableRow className='border'>
            <Table.TableHeadCell className='border p-2 hidden'>Id</Table.TableHeadCell>
            <Table.TableHeadCell className='border p-2'>Name</Table.TableHeadCell>
            <Table.TableHeadCell className='border p-2'>Subject</Table.TableHeadCell>
            <Table.TableHeadCell className='border p-2'>Score</Table.TableHeadCell>
            <Table.TableHeadCell className='border p-2'>Submission Date</Table.TableHeadCell>
          </Table.TableRow>
        </Table.TableHead>
        }
        {mdMatches ? <Table.TableBody>
          {studentsData.map((value, index) => {
            return (
              <Table.TableRow key={index} className='border'>
                <Table.TableData className='border p-2 hidden'>{value.id}</Table.TableData>
                <Table.TableData className='border p-2'>{value.name}</Table.TableData>
                <Table.TableData className='border p-2'>{value.subject}</Table.TableData>
                <Table.TableData className='border p-2'>{value.score}</Table.TableData>
                <Table.TableData className='border p-2'>{value.submissionDate}</Table.TableData>
              </Table.TableRow>
            )
          })
          }
        </Table.TableBody>
          :
          <Table.TableBody>
            {studentsData.map((value, index) => {
              return (
                <Table.TableRow key={index} className='border'>
                  <Table.TableData>
                  <div className='grid grid-cols-4'>
                    <div className='hidden'>
                      <h3 className='font-bold'>Id</h3>
                      <p>{value.id}</p>
                    </div>
                     <div>
                      <h3 className='font-bold'>Name</h3>
                      <p>{value.name}</p>
                    </div>
                    <div>
                      <h3 className='font-bold'>Subject</h3>
                      <p>{value.subject}</p>
                    </div>
                     <div>
                      <h3 className='font-bold'>Score</h3>
                      <p>{value.score}</p>
                    </div>
                     <div>
                      <h3 className='font-bold'>Submission Date</h3>
                      <p>{value.submissionDate}</p>
                    </div>
                  </div>
                  </Table.TableData>
                </Table.TableRow>
              )
            })
            }
          </Table.TableBody>
        }
        <Table.TableFooter>
            <Table.TableRow>
              <Table.TableData className='flex'>
                <h1 className='font-bold'>Average: </h1>
                <p className='pl-2'>{average}</p>
              </Table.TableData>
            </Table.TableRow>
        </Table.TableFooter>
      </Table>
    </div>
  )
}

export default StudentDataTable
