import React from 'react'

const PurchaseRow = ({purchase}) => {
  return (
    <div>
      <TableRow>
        <TableCell component="th" scope="row">
          {id}
        </TableCell>
        <TableCell align="left" className="cell">
          {name}
        </TableCell>
        <TableCell align="left" className="cell">
          {category}
        </TableCell>
        <TableCell align="left" className="cell">
          {price}
        </TableCell>
        <TableCell align="left" className="cell">
          {totalSales}
        </TableCell>
        <TableCell align="left" className="cell">
          {stock}
        </TableCell>
        <TableCell align="left" className="cell">
          {totalOrder}
        </TableCell>
        <Link to={`/editProduct/${id}`}>
          <TableCell align="left" className="cell">
            <EditIcon />
          </TableCell>
        </Link>
        <TableCell align="left" className="cell">
          <DeleteIcon onClick={handleDelete} />
        </TableCell>
      </TableRow>
    </div>
  );
}

export default PurchaseRow