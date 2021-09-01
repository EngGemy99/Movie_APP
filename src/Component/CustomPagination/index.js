import Pagination from "@material-ui/lab/Pagination";
import { createTheme, ThemeProvider } from "@material-ui/core";
const darkTheme = createTheme({
    palette: {
        type: "dark",
    },
});
const CustomPagination = ({ setPage, numOfPages = 10, type }) => {

    // Scroll to top when page changes
    const handlePageChange = (page) => {
        localStorage.setItem(type, page);

        setPage(page);
        window.scroll(0, 0);
    };
    return (
        <div className='d-flex justify-content-center'>
            <ThemeProvider theme={darkTheme}>
                <Pagination
                    onChange={(e) => handlePageChange(e.target.textContent)}
                    count={numOfPages}
                    variant="outlined"
                    size="large"
                    page={parseInt(localStorage.getItem(type))}
                />
            </ThemeProvider>
        </div>

    );
}

export default CustomPagination;