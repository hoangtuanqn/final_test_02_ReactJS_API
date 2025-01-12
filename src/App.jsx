import { useEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Form from "./components/Form";
import ListData from "./components/ListData";
import { getCountries } from "./assets/apis/methodApiCountries";
const App = () => {
    const [listData, setListData] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [idEdit, setIdEdit] = useState();
    const dataProps = {
        listData,
        setListData,
        idEdit,
        setIdEdit,
        isEdit,
        setIsEdit,
    };
    useEffect(() => {
        // Cập nhật dữ liệu
        //?_sort=id&_order=desc
        getCountries("/countries").then((data) => {
            setListData(data);
        });
    }, []);
    return (
        <>
            <Header />
            <main>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<ListData {...dataProps} />}></Route>
                        <Route path="/add" element={<Form {...dataProps} />}></Route>
                        <Route path="/edit" element={<Form {...dataProps} />}></Route>
                    </Routes>
                </div>
            </main>
        </>
    );
};

export default App;
