import { useState } from "react";
import ReactPaginate from 'react-paginate';
import User from "./User";
//print list of users (user component)
function Print({ currentUsers }) {
    console.log(currentUsers);
    return (
      <>
        {currentUsers.map(user => <User key={user.id} user={user} />)}
      </>
    );
}
  
function PaginatedItems({ itemsPerPage ,users }) {
const [itemOffset, setItemOffset] = useState(0);
const endOffset = itemOffset + itemsPerPage;

console.log(`Loading items from ${itemOffset} to ${endOffset}`);
//users that need to be showcased in this page
const currentUsers = users.slice(itemOffset, endOffset);
//total number of pages 
const pageCount = Math.ceil(users.length / itemsPerPage);

// Invoke when user click to request another page.
const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % users.length;
    console.log(
    `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
};

return (
    <>
    <Print currentUsers={currentUsers} />
    <div className="flex justify-center items-center">
        <ReactPaginate className="flex gap-4 mt-4 max-w-30  "
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        />
    </div>
    
    </>
);
}
export default PaginatedItems;