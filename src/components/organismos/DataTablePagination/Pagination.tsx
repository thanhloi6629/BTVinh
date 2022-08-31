import { TablePagination } from '@material-ui/core'
import React from 'react'

const Pagination = () => {
    const [page, setPage] = React.useState(2);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null,newPage: number) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log("event", event.target.value);
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

  return (
    <div>
      <TablePagination
        component="div"
        count={100}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </div>
  )
}

export default Pagination
