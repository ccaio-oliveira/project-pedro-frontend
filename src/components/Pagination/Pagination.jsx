import { usePagination } from "../../hooks/usePagination"
import { PropTypes } from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { PaginationContainer, PaginationItem } from "./Pagination.styles";

library.add(faArrowRight, faArrowLeft);

const Pagination = ({ onPageChange, totalCount, siblingCount = 1, currentPage, pageSize }) => {
    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    if(currentPage === 0 || paginationRange.length < 2){
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    }

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    }

    const lastPage = paginationRange[paginationRange.length - 1];
    const disabledLeft = currentPage === 1 ? true : false;
    const disabledRight = currentPage === lastPage ? true : false;

    console.log(disabledLeft, disabledRight, paginationRange, currentPage, lastPage)

    return (
        <PaginationContainer>
            <PaginationItem onClick={onPrevious} disabled={disabledLeft}>
                <FontAwesomeIcon icon={['fas', 'arrow-left']} />
            </PaginationItem>
            {paginationRange.map((pageNumber, index) => {
                if(pageNumber === "..."){
                    return <PaginationItem className="dots" key={index}>&#8230;</PaginationItem>;
                }

                return (
                    <PaginationItem key={index} onClick={() => onPageChange(pageNumber)}>
                        {pageNumber}
                    </PaginationItem>
                )
            })}
            <PaginationItem onClick={onNext} disabled={disabledRight}>
                <FontAwesomeIcon icon={['fas', 'arrow-right']} />
            </PaginationItem>
        </PaginationContainer>
    )
}

Pagination.propTypes = {
    onPageChange: PropTypes.func.isRequired,
    totalCount: PropTypes.number.isRequired,
    siblingCount: PropTypes.number,
    currentPage: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    className: PropTypes.string
}

export default Pagination;