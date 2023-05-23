import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Admin/Navbar";
import { createCategory, deleteCategory, getCategory, updateCategory } from "../../redux/action/categoryAction";
import { Button } from "@mui/material";

const categories = [
    {
        idCategory: "1",
        title: "Áo"
    },
    {
        idCategory: "2",
        title: "Quần"
    },
]

const ManageCategory = () => {
    const dispatch = useDispatch()
    const level = localStorage.getItem('login')
    const categoryList = useSelector(state => state.category.categoryList)
    const [category, setCategory] = useState()
    const [dataEdit, setDataEdit] = useState({check: false, idCategory: '', title: ''})

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(category)
        if (category) {
            dispatch(createCategory({title: category}))
        }
    }

    const handleEdit = () => {
        dispatch(updateCategory({idCategory: dataEdit.idCategory, title: dataEdit.title}))
        setDataEdit({...dataEdit, check: false})
        console.log({idCategory: dataEdit.idCategory, title: dataEdit.title});
    }

    const handleDelete = (item) => {
        console.log("item")
        console.log(item)
        dispatch(deleteCategory(item.idCategory))
    }

    useEffect(() => {
        dispatch(getCategory())
    },[])
    
    return (
        <div>
            <Navbar />
            <div className="category-container" style={{ marginLeft: 250}}>
                <h1>Quản lý danh mục</h1>
                <p>Thêm mới</p>
                <form className="add-category" 
                    style={{ marginBottom: 10}} 
                    onSubmit={handleSubmit}
                >
                    <input onChange={(e) => setCategory(e.target.value)}/>
                    <button type="submit">Thêm</button>
                </form>
                <table>
                    <thead>
                    <tr>
                        <th className='id'>Mã danh mục</th>
                        <th className='title'>Tiêu đề</th>
                        {(level === "2" || level === "3") && 
                        <th className='action'>Hành động</th>}
                    </tr>
                    </thead>
                    <tbody>
                    {categoryList.map(item => (
                    <tr key={item.idCategory}>
                        <td className='id'>{item.idCategory}</td>
                        <td className='title'>
                            {(dataEdit.check && dataEdit.idCategory === item.idCategory) ? 
                            <form className="form-editcategory">
                                <input 
                                    onChange={(e) => setDataEdit({...dataEdit, title: e.target.value})} 
                                    value={dataEdit.title} 
                                />
                            </form>
                        : item.title}</td>
                        {(level === "2" || level === "3") && 
                        <td 
                            className='action' 
                            style={{margin: "auto"}}
                        >
                            {(dataEdit.check && dataEdit.idCategory === item.idCategory) ?
                            (<div className="action-container">
                                <Button
                                    onClick={handleEdit}
                                    variant="contained" 
                                    color='success'
                                >Ok
                                </Button>
                                <Button 
                                    onClick={() => setDataEdit({...dataEdit, check: false})}
                                    variant='contained'
                                    color='error'
                                >Hủy
                                </Button>
                                </div>)
                            : (
                                <div className="action-container">
                                    <Button
                                        variant="contained" 
                                        color='success'
                                        onClick={() => setDataEdit({check: true, idCategory: item.idCategory, title: item.title})}>
                                        Sửa
                                    </Button>
                                    {level === "3" &&
                                    <Button
                                        variant='contained'
                                        color='error' 
                                        onClick={() => handleDelete(item)}>
                                        Xóa
                                    </Button>}
                                </div>
                            )}
                        </td>}
                    </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageCategory;