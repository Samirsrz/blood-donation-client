
const SearchTableRow = ({donor, idx}) => {
    return (
        <tr className="hover">
         <th>{idx+1}</th>
         <td>{donor?.name}</td>
         <td>{donor?.email}</td>
        </tr>
    );
};

export default SearchTableRow;