import {ChangeEvent, FC, useState} from "react";
import {Log} from "types";


interface TableComponentProps {
    items: Log[] | [];
    page: number;
    skip: number;
    total: number;
    date: string;
    changePage: (page: number) => void;
    changeSkip: (skip: number) => void;
    dateChange: (date: string) => void
    filter: () => void
}

const TableComponent: FC<TableComponentProps> = ({items, page, skip, total, date, changeSkip, changePage, dateChange, filter}) => {
    const [show, setShow] = useState<boolean>(false);
    const [isDateChaged, setDateChanged] = useState<boolean>(false);

  const totalPages= Math.ceil(total / skip);

  const th = ['Id', 'Date', 'Status', 'User', 'Description'];

  const filterHandler = (): void => {
      setDateChanged(false);

      filter()
  }

  const dateChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
      setDateChanged(true)

      dateChange(e.target.value);
  }

  return (
      <div className='table-section'>
        <div className='table-container'>
          <table className="styled-table">
            <thead>
            <tr>
                {th.map((item: string) => (
                    <th key={item}>
                        <div>
                            <span>{item}</span>

                            {item === 'Date' && <span className='filter' onClick={() => setShow(!show)}>
                            <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.437988 0V1L6.20934 6V13L8.51788 11V6L14.2892 1V0H0.437988Z" fill="white" fillOpacity="0.87"/>
                            </svg>
                        </span>}
                        </div>

                        {(item === 'Date' && show) &&
                            <div className='date-filter'>
                                <input type="date" value={date} onChange={dateChangeHandler}/>

                                <button disabled={ !isDateChaged } onClick={filterHandler}>Filter</button>
                            </div>
                        }
                    </th>
                ))}
            </tr>
            </thead>
              <tbody>
              {items.map((item: Log) => (
                  <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.date ? new Date(item.date).toLocaleString() : null}</td>
                  <td>{item.status}</td>
                  <td>{item.firstName} {item.lastName}</td>
                  <td>{item.description}</td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>

        <div className='pagination'>
          <div className='pager'>
            <button className='pagination-nav prev' onClick={() => changePage(page - 1)} disabled={page === 1}></button>

            <div>
              {Array.from(Array(totalPages)).map((_, pageIndex) => (
                  <span key={pageIndex} className={'page-btn' + (pageIndex+1 === page ? ' active' : '')} onClick={() => changePage(pageIndex + 1)}>{pageIndex + 1}</span>))}
            </div>

            <button className='pagination-nav next' onClick={() => changePage(page + 1)} disabled={page === totalPages}></button>
          </div>

            <span className='total-items'>Total: {total}</span>

          <div className='per-page-block'>
            <select name="pages" onChange={(e) => changeSkip(Number(e.target.value))}>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
            </select>

            <span className='per-page'>items per page</span>
          </div>
        </div>

      </div>

  );
}

export default TableComponent;
