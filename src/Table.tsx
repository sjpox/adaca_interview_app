import type { ReactNode } from "react"

type TableProps = {
    className?: string,
    children: ReactNode
}

function Table({className = '', children}: TableProps) {
    return <table className={className}>
        {children}
    </table>
}


type TableHeadProps = TableProps

function TableHead({className ='', children}: TableHeadProps) {
    return <thead className={className}>
        {children}
    </thead>
}


type TableRowProps = TableProps
function TableRow({className = '', children}: TableRowProps){
    return <tr className={className}>
        {children}
    </tr>
}

type TableDataProps = TableProps
function TableData({className = '', children}: TableDataProps) {
    return <td className={className}>
        {children}
    </td>
}

type TableBodyProps = TableProps
function TableBody({className = '', children}: TableBodyProps) {
    return <tbody className={className}>
        {children}
    </tbody>
}

type TableHeadCellProps = TableProps
function TableHeadCell({className = '', children}:  TableHeadCellProps){
    return <th className={className}>
        {children}
    </th>
}

type TableFooterProps = TableProps
function TableFooter({className = '', children}: TableFooterProps) {
    return <tfoot className={className}>
        {children}
    </tfoot>
}

Table.TableHead = TableHead
Table.TableRow = TableRow
Table.TableData = TableData
Table.TableBody = TableBody
Table.TableHeadCell = TableHeadCell
Table.TableFooter = TableFooter

export default Table