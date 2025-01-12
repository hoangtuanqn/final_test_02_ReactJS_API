import { useLayoutEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { updateCountry, postCountry } from "../assets/apis/methodApiCountries";
const Form = ({ listData, setListData, idEdit, isEdit, setIsEdit, setIdEdit }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const initialValue = { name: "", code: "", capital: "" };
    const [dataForm, setDataForm] = useState(initialValue);

    const refCode = useRef();
    const refName = useRef();
    const refCapital = useRef();

    const checkPathEdit = () => {
        return location.pathname === "/edit";
    };

    const resetForm = (e) => {
        e?.preventDefault();
        refCode.current.focus();
        setDataForm(checkPathEdit() ? { ...initialValue, code: dataForm.code } : initialValue);
    };

    const inputFocus = (e) => {
        e.style.outline = "2px solid red";
        e.focus();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (dataForm.code.trim().length === 0) {
            inputFocus(refCode.current);

            window.alert("Code field cannot be left blank");
        } else if (dataForm.name.trim().length === 0) {
            inputFocus(refName.current);

            window.alert("Name field cannot be left blank");
        } else if (dataForm.capital.trim().length === 0) {
            inputFocus(refCapital.current);

            window.alert("Capital City field cannot be left blank");
        } else {
            const newArray = [...listData];
            if (isEdit) {
                newArray[idEdit] = dataForm;  
                if (updateCountry(`/countries/${listData[idEdit].id}`, dataForm)) {
                    window.alert("Data added successfully!");
                }
            } else {
                newArray.unshift(dataForm);
                if (postCountry(`/countries`, dataForm)) {
                    setIsEdit(false);
                    window.alert("Data updated successfully!");
                }
            }
            setListData(newArray);
            resetForm(null);
            navigate("/");
        }
    };

    const handleOnChange = (e) => {
        e.target.style.outline = "";
        const { name, value } = e.target;
        setDataForm((prev) => ({ ...prev, [name]: value }));
    };

    useLayoutEffect(() => {
        if (!checkPathEdit()) {
            setIsEdit(false);
            setIdEdit(null);
        }
        refCode.current.focus();
        setDataForm({ ...(listData[idEdit] ?? initialValue) });
    }, [idEdit]);
    return (
        <>
            <div className="form dfcenter">
                <form action="">
                    <div className="form-group">
                        <label htmlFor="code">Country Code (*):</label>
                        <input
                            type="text"
                            name="code"
                            id="code"
                            ref={refCode}
                            placeholder="Enter Country Code"
                            value={dataForm.code}
                            onChange={handleOnChange}
                            disabled={checkPathEdit()}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Country Name (*):</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            ref={refName}
                            placeholder="Enter Country Name"
                            value={dataForm.name}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="capital">Capital City (*):</label>
                        <input
                            type="text"
                            name="capital"
                            id="capital"
                            ref={refCapital}
                            placeholder="Enter Capital City"
                            value={dataForm.capital}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="country"></label>
                        <button className="btn" onClick={handleSubmit}>
                            {isEdit ? "Save" : "Add new"}
                        </button>
                        <button className="btn btn-reset" onClick={resetForm}>
                            Reset Form
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Form;
