import { useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCountry } from "../assets/apis/methodApiCountries";

const ListData = ({ listData, setListData, setIsEdit, setIdEdit, idEdit }) => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const searchRef = useRef();
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete?")) {

            let newArr = [...listData];
            newArr.splice(id, 1);

            setListData(newArr);
            if (!deleteCountry(`/countries/${listData[id].id}`)) {
                window.alert("Error delete");
            }
        }
    };
    const handleModify = (id) => {
        setIsEdit(true);
        setIdEdit(id);
        navigate("/edit");
    };
    const arrayNoSearch = () => {
        return listData;
    };
    const arraySearch = () => {
        return listData.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    };
    const renderListData = (arr) => {
        return arr.map((item, index) => (
            <tr key={item.id} onClick={() => handleModify(index)}>
                <td>{item.code}</td>
                <td>{item.name}</td>
                <td>{item.capital}</td>
                <td className="action" onClick={(e) => e.stopPropagation()}>
                    <a href="#!" onClick={() => handleDelete(index)}>
                        Remove
                    </a>
                </td>
            </tr>
        ));
    };

    useLayoutEffect(() => {
        searchRef.current.focus();
    }, []);
    return (
        <>
            <div className="control-search">
                <input
                    type="text"
                    name="search"
                    ref={searchRef}
                    value={search}
                    placeholder="Search by Country name ..."
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="table-data">
                <table>
                    <thead>
                        <tr>
                            <th>Country Code</th>
                            <th>Country Name</th>
                            <th>Capital City</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listData.length > 0 ? (
                            renderListData(search ? arraySearch() : arrayNoSearch())
                        ) : (
                            <tr>
                                <td colSpan="4">No data yet</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ListData;
