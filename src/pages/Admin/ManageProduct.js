import React, {useEffect, useState} from 'react';
import { useFormik } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, deleteProduct, getProduct, updateProduct } from '../../redux/action/productAction';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Navbar from '../../components/Admin/Navbar';
import Button from '@mui/material/Button';
import { getCategory } from '../../redux/action/categoryAction';

const initialValues = {
  nameProduct: '',
  idCategory: '1',
  price: '',
  description: '',
  type: '',
  status: '',
  total: '',
  img: '',
}

const products = [
  {
  idProduct: '',
  title: "",
  nameProduct: '',
  idCategory: '1',
  price: '',
  description: '',
  type: '',
  status: '',
  total: '',
  img: '',
  }
]

const ManageProduct = () => {
  const dispatch = useDispatch();
  const level = localStorage.getItem('login')
  const productList = useSelector(state => state.product.productList);
  const category = useSelector(state => state.category.categoryList);
  const [isShowAddProduct, setIsShowAddProduct] = useState(false);
  const [isShowEditProduct, setIsShowEditProduct] = useState(false);
  const [file, setFile] = useState(null);
  const [checked, setChecked] = useState([true, true, true, true, true, true, true, true, true]);
  const [dataEdit, setDataEdit] = useState({idProduct: '', nameProduct: '', idCategory: '', price: '',description: '', type: '', status: '', total: '', img: null, productRating: ''})


  const handleChangeAll = (event) => {
    let arr = [...checked]
    arr.fill(event.target.checked)
    setChecked(arr)
  };

  const handleChangeBox = (event) => {
    let arr = [...checked]
    arr[event.target.name] = event.target.checked;
    setChecked(arr);
  }

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'cow', ml: 3}}>
      <FormControlLabel
        label="Mã"
        name='0'
        control={<Checkbox checked={checked[0]} onChange={handleChangeBox} />}
      />
      <FormControlLabel
        label="Tên"
        name='1'
        control={<Checkbox checked={checked[1]} onChange={handleChangeBox} />}
      />
      <FormControlLabel
        label="Giá"
        name='2'
        control={<Checkbox checked={checked[2]} onChange={handleChangeBox} />}
      />
      <FormControlLabel
        label="Mô tả"
        name='3'
        control={<Checkbox checked={checked[3]} onChange={handleChangeBox} />}
      />
      <FormControlLabel
        label="Danh mục"
        name='4'
        control={<Checkbox checked={checked[4]} onChange={handleChangeBox} />}
      />
      <FormControlLabel
        label="Loại"
        name='5'
        control={<Checkbox checked={checked[5]} onChange={handleChangeBox} />}
      />
      <FormControlLabel
        label="Tổng"
        name='6'
        control={<Checkbox checked={checked[6]} onChange={handleChangeBox} />}
      />
      <FormControlLabel
        label="Trạng thái"
        name='7'
        control={<Checkbox checked={checked[7]} onChange={handleChangeBox} />}
      />
      <FormControlLabel
        label="Ảnh"
        name='8'
        control={<Checkbox checked={checked[8]} onChange={handleChangeBox} />}
      />
    </Box>
  );

  const handleDelete = (item) => {
    console.log("item")
    console.log(item)
    dispatch(deleteProduct(item.idProduct))
  }

  const handleEdit = (item) => {
    console.log(dataEdit);
    setDataEdit({...item})
    setIsShowEditProduct(true)
    console.log("item")
    console.log(dataEdit)
  }

  const formik = useFormik ({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
        const formData = new FormData();
        console.log(values.img);
        formData.append('image', values.img);
        values.img = formData;
        // const res = await postAPI('upload', formData)
        console.log(1);
        // console.log(res);
        console.log(values)
        dispatch(createProduct(values))
    },
  })

  const handleUpdate = (event) => {
    event.preventDefault()
    console.log(dataEdit);
    console.log(1);
    dispatch(updateProduct({...dataEdit}))
    setIsShowEditProduct(false)
  }

  useEffect( () => {
    dispatch(getProduct())
    dispatch(getCategory())
    console.log(productList)
  } ,[])

  const handleFile = (event) => {
    setFile(event.target.files[0])
    console.log(file);
  }

  return (
    <div>
      <Navbar />
      <div className='product-container' style={{ marginLeft: 250}} >
        <h1>Quản lý sản phẩm</h1>
        <FormControlLabel
          label="Tất cả"
          control={
            <Checkbox
              checked={checked.every((item) => item !== false)}
              indeterminate={!(checked.every((item) => item === true)) && !checked.every((item) => item === false)}
              onChange={handleChangeAll}
            />
          }
        />
      {children}
      <Button
        variant='contained' 
        className='add-btn'
        onClick={() => setIsShowAddProduct(true)}
      >Thêm mới
      </Button>
      <table>
        <thead>
          <tr>
            {checked[0] && <th className='id'>Mã</th>}
            {checked[1] && <th className='name'>Name</th>}
            {checked[2] && <th className='price'>Giá</th>}
            {checked[3] && <th className='description'>Mô tả</th>}
            {checked[4] && <th className='category'>Danh mục</th>}
            {checked[5] && <th className='type'>Loại</th>}
            {checked[6] && <th className='total'>Tổng</th>}
            {checked[7] && <th className='status'>Trạng thái</th>}
            {checked[8] && <th className='img'>Ảnh</th>}
            {(level === "2" || level === "3") && checked.some((item) => item !== false) && <th className='action'>Hành động</th>}
          </tr>
        </thead>
        <tbody>
        {productList.map(item => (
          <tr key={item.idProduct}>
            {checked[0] && <td className='id'>{item.idProduct}</td>}
            {checked[1] &&<td className='name'>{item.nameProduct}</td>}
            {checked[2] &&<td className='price'>{item.price}</td>}
            {checked[3] &&<td className='description'>{item.description}</td>}
            {checked[4] &&<td className='category'>{item.title}</td>}
            {checked[5] &&<td className='type'>{item.type}</td>}
            {checked[6] &&<td className='total'>{item.total}</td>}
            {checked[7] &&<td className='status'>{item.status}</td>}
            {checked[8] &&<td className='img'>{item.img}</td>}
            {(level === "2" || level === "3") && checked.some((item) => item !== false) && <td className='action'>
            <div className="action-container">
              <Button
                variant="contained" 
                color='success'
                onClick={() => handleEdit(item)}>
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
            </td>}
          </tr>
        ))}
        </tbody>
      </table>
      
      {isShowAddProduct &&
        <div className="back-form">
          <div className="modal-form"></div>
          <form onSubmit={formik.handleSubmit} className="container-addproduct">
            <h1>Thêm mới sản phẩm</h1>
            <div className='form-container'>
              <div>
                <label>
                  <span>Tên sản phẩm</span>
                  <input 
                    placeholder='Tên sản phẩm'
                    type='text'
                    {...formik.getFieldProps("nameProduct")}
                  />
                </label>
                <label>
                    <span>Danh mục</span>
                    <select {...formik.getFieldProps("idCategory")}>
                        {category.map((item, index) => (
                            <option value={item.idCategory} key = {index}>{item.title}</option>
                        ))}
                    </select>
                </label>
                <label>
                  <span>Mô tả</span>
                  <input 
                    placeholder='Mô tả'
                    type='text'
                    {...formik.getFieldProps("description")}
                  />
                </label>
                <label>
                  <span>Giá</span>
                  <input 
                    placeholder='Giá (VNĐ)'
                    type='text'
                    {...formik.getFieldProps("price")}
                  />
                </label>
              </div>
              <div>
                <label>
                  <span>Loại</span>
                  <input 
                    placeholder='Loại'
                    type='text'
                    {...formik.getFieldProps("type")}
                  />
                </label>
                <label>
                  <span>Trạng thái</span>
                  <input 
                    placeholder='Trạng thái'
                    type='text'
                    {...formik.getFieldProps("status")}
                  />
                </label>
                <label>
                  <span>Số lượng</span>
                  <input 
                    placeholder='Số lượng'
                    type='text'
                    {...formik.getFieldProps("total")}
                  />
                </label>
                <label>
                  <span>Ảnh</span>
                  <input placeholder='Ảnh'        
                    type={'file'}
                    {...formik.getFieldProps("img")}
                    onChange={handleFile}
                  />
                </label>
              </div>
            </div>

            <div className="form-footer">
                <Button
                  variant='contained'
                  color='success'
                  className="add-product"
                  type='submit'
                >
                  Thêm mới
                </Button>
                <Button
                  variant='contained'
                  color='error'
                  className="exit"
                  onClick={() => setIsShowAddProduct(false)}
                >
                  Hủy bỏ
                </Button>
            </div>
          </form>
        </div>
      }
      {isShowEditProduct &&
        <div className="back-form">
          <div className="modal-form"></div>
          <form onSubmit={(event) => handleUpdate(event)} className="container-addproduct">
            <h1>Chỉnh sửa sản phẩm</h1>
            <div className='form-container'>
              <div>
                <label>
                  <span>Tên sản phẩm</span>
                  <input 
                    placeholder='Tên sản phẩm'
                    type='text'
                    value={dataEdit.nameProduct}
                    onChange={e => setDataEdit({...dataEdit, nameProduct: e.target.value})}
                  />
                </label>
                <label>
                    <span>Danh mục</span>
                    <select 
                      value={dataEdit.idCategory}
                      onChange={e => setDataEdit({...dataEdit, idCategory: e.target.value})}
                    >
                        {category.map((item, index) => (
                            <option value={item.idCategory} key = {index}>{item.title}</option>
                        ))}
                    </select>
                </label>
                <label>
                  <span>Mô tả</span>
                  <input 
                    placeholder='Mô tả'
                    type='text'
                    value={dataEdit.description}
                    onChange={e => setDataEdit({...dataEdit, description: e.target.value})}
                  />
                </label>
                <label>
                  <span>Giá</span>
                  <input 
                    placeholder='Giá (VNĐ)'
                    type='text'
                    value={dataEdit.price}
                    onChange={e => setDataEdit({...dataEdit, price: e.target.value})}
                  />
                </label>
              </div>
              <div>
                <label>
                  <span>Loại</span>
                  <input 
                    placeholder='Loại'
                    type='text'
                    value={dataEdit.type}
                    onChange={e => setDataEdit({...dataEdit, type: e.target.value})}
                  />
                </label>
                <label>
                  <span>Trạng thái</span>
                  <input 
                    placeholder='Trạng thái'
                    type='text'
                    value={dataEdit.status}
                    onChange={e => setDataEdit({...dataEdit, status: e.target.value})}
                  />
                </label>
                <label>
                  <span>Số lượng</span>
                  <input 
                    placeholder='Số lượng'
                    type='text'
                    value={dataEdit.total}
                    onChange={e => setDataEdit({...dataEdit, total: e.target.value})}
                  />
                </label>
                <label>
                  <span>Ảnh</span>
                  <input placeholder='Ảnh'        
                    type={'file'}
                    // value={dataEdit.img}
                    onChange={e => setDataEdit({...dataEdit, img: e.target.value})}
                  />
                </label>
              </div>
            </div>

            <div className="form-footer">
                <Button
                  variant='contained'
                  color='success'
                  className="add-product"
                  type='submit'
                >
                  Chỉnh sửa
                </Button>
                <Button
                  variant='contained'
                  color='error'
                  className="exit"
                  onClick={() => setIsShowEditProduct(false)}
                >
                  Hủy bỏ
                </Button>
            </div>
          </form>
        </div>
      }
    </div>
    </div>
  );
}

export default ManageProduct;