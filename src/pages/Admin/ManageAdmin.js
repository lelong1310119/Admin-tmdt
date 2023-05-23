import React, { useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Navbar from '../../components/Admin/Navbar';
import { Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { createAdmin, deleteAdmin, getAdmin, updateAdmin } from '../../redux/action/adminAction';

const initialValues = {
    username: "",
    password: "",
    isSuper: "1"
  }

const admins = [
  {
    idAdmin: "1",
    username: "longle",
    password: "A123@longle",
    isSuper: "2"
  }
]

const ManageAdmin = () => {
    const dispatch = useDispatch()
    const adminList = useSelector(state => state.admin.adminList)
    const [checked, setChecked] = useState([true, true, true, true, true]);
    const [isShowAddAdmin, setIsShowAddAdmin] = useState(false)
    const [dataEdit, setDataEdit] = useState({check: false, idAdmin: '', isSuper: '', password: ''})

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

    const AdminSchema = Yup.object().shape({
        username: Yup.string()
            .min(3, "Tên tài khoản phải tối thiểu 3 ký tự")
            .max(50, "Tên tài khoản chỉ tối đa 50 ký tự")
            .required("Trường này không được bỏ trống")
            .matches(
            /^[a-zA-Z0-9_]+$/i,
            "Vui lòng không nhập ký tự đặc biệt và khoảng trắng"
            ),
        password: Yup.string()
            .min(8, "Mật khẩu tối thiểu 8 ký tự")
            .max(50, "Mật khẩu tối đa 50 ký tự")
            .required("Trường này không được bỏ trống")
            .matches(
                /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[A-Z][a-zA-Z0-9!@#$%^&*]{7,16}$/,
                "Mật khẩu phải có kí tự đầu viết hoa, phải có ít nhất một ký tự viết thường, một chữ số và một ký tự đặc biệt"
            ),           
    })
    const formik = useFormik ({
        initialValues,
        enableReinitialize: true,
        validationSchema: AdminSchema,
        onSubmit: (values) => {
            console.log(values)
            dispatch(createAdmin(values))
      }})

    const handleEdit = () => {
        dispatch(updateAdmin({idAdmin: dataEdit.idAdmin, username: dataEdit.username, password: dataEdit.password, isSuper: dataEdit.isSuper}))
        setDataEdit({...dataEdit, check: false})
    }

    const children = (
        <Box sx={{ display: 'flex', flexDirection: 'cow', ml: 3 }}>
          <FormControlLabel
            label="Mã"
            name='0'
            control={<Checkbox checked={checked[0]} onChange={handleChangeBox} />}
          />
          <FormControlLabel
            label="Tên sử dụng"
            name='1'
            control={<Checkbox checked={checked[1]} onChange={handleChangeBox} />}
          />
          <FormControlLabel
            label="Mật khẩu"
            name='2'
            control={<Checkbox checked={checked[2]} onChange={handleChangeBox} />}
          />
          <FormControlLabel
            label="Cấp độ"
            name='3'
            control={<Checkbox checked={checked[3]} onChange={handleChangeBox} />}
          />
          <FormControlLabel
            label="Quyền"
            name='4'
            control={<Checkbox checked={checked[4]} onChange={handleChangeBox} />}
           />
        </Box>
      );

    const handleDelete = (item) => {
        dispatch(deleteAdmin(item.idAdmin))
    }
    
    useEffect(() => { 
        dispatch(getAdmin())
    },[])
    return (
        <div>
            <Navbar style={{zIndex: 2}}/>
            <div className='admin-container' style={{ marginLeft: 250}}>
                <h1>Quản lý admin</h1>  
                <FormControlLabel
                    label="Tất cả"
                    style={{ position: "static"}}
                    control={
                    <Checkbox
                        checked={checked.every((item) => item !== false)}
                        indeterminate={!(checked.every((item) => item === true)) && !checked.every((item) => item === false)}
                        onChange={handleChangeAll}
                        style={{ position: "static"}}
                    />
                    }
                />
                {children}
                { isShowAddAdmin ? 
                <Button 
                  variant='contained' 
                  className='add-btn' 
                  color='error' 
                  onClick={() => setIsShowAddAdmin(false)}
                >Hủy bỏ
                </Button>
                : <Button 
                    variant='contained' 
                    className='add-btn' 
                    onClick={() => setIsShowAddAdmin(true)}
                >Thêm mới
                </Button>}
                {isShowAddAdmin &&
                    <form onSubmit={formik.handleSubmit} className="container-admin">
                    <div className='form-container'>
                      <div>
                        <div className="input-item">
                          <label>
                            Username<br/>
                            <input 
                              placeholder='Username'
                              type='text'
                              {...formik.getFieldProps("username")}
                            /><br/>
                            {formik.touched.username && formik.errors.username ? (
                              <div
                                  className="error-input"
                                  >
                                  <div>{formik.errors.username}</div>
                              </div>
                          ) : null}
                          </label>
                        </div>
                        <div className="input-item">
                          <label>
                            Mật khẩu<br/>
                            <input 
                              placeholder='Mật khẩu'
                              type='password'
                              {...formik.getFieldProps("password")}
                            />
                            {formik.touched.password && formik.errors.password ? (
                              <div
                                  className="error-input"
                                  >
                                  <div>{formik.errors.password}</div>
                              </div>
                          ) : null}
                          </label>
                        </div>
                      </div>
                      <div>
                        <div><label>
                          Level<br/>
                          <select  
                            placeholder='Quyền'
                            type='text'
                            {...formik.getFieldProps("isSuper")}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                          </select>
                        </label></div>
                      </div>
                    </div>
                    <Button
                      className="add-product"
                      type='submit'
                      variant='contained'
                      color='success'
                    >
                      Xác nhận
                    </Button>
                  </form>
                }
                <table>
                    <thead>
                    <tr>
                        {checked[0] && <th className='id'>Mã</th>}
                        {checked[1] && <th className='username'>Tên người dùng</th>}
                        {checked[2] && <th className='password'>Mật khẩu</th>}
                        {checked[3] && <th className='level'>Cấp độ</th>}
                        {checked[4] && <th className='permission'>Quyền</th>}
                        {checked.some((item) => item !== false) 
                        && <th>Hành động</th>}
                    </tr>
                    </thead>
                    <tbody>
                    {admins.map(item => (
                    <tr key={item.idAdmin}>
                        {checked[0] && <td className='id'>{item.idAdmin}</td>}
                        {checked[1] && 
                        <td className='username'>{(dataEdit.check && dataEdit.idAdmin === item.idAdmin) ?
                            <input 
                                value={dataEdit.username} 
                                onChange={(e) => setDataEdit({...dataEdit, username: e.target.value})}
                            /> 
                            : item.username}
                        </td>}
                        {checked[2] && 
                        <td className='password'>{(dataEdit.check && dataEdit.idAdmin === item.idAdmin) ?
                            <input 
                                value={dataEdit.password} 
                                onChange={(e) => setDataEdit({...dataEdit, password: e.target.value})}
                            /> 
                            : item.password}
                        </td>}
                        {checked[3] && 
                        <td className='isSuper'>{(dataEdit.check && dataEdit.idAdmin === item.idAdmin) ?
                            <select 
                                value={dataEdit.isSuper} 
                                onChange={(e) => setDataEdit({...dataEdit, isSuper: e.target.value})}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select> 
                            : item.isSuper}
                        </td>}
                        {checked[4] && <td className='permission'>{(item.isSuper==="1") ? "Thêm" : "Thêm - Sửa" }</td>}
                        {checked.some((item) => item !== false) && <td className='action' style={{zIndex: 2}}>
                        {(dataEdit.check && dataEdit.idAdmin === item.idAdmin) ? 
                        <div className='action-container'>
                            <Button
                                onClick={handleEdit}
                                variant="contained" 
                                color='success'
                            >OK
                            </Button>
                            <Button 
                                onClick={() => setDataEdit({...dataEdit, check: false})}
                                variant='contained'
                                color='error'
                                
                            >Hủy
                            </Button>
                        </div> 
                        : <div className='action-container'>  
                            <Button
                              variant="contained" 
                              color='success'
                              onClick={() => setDataEdit({check: true, username: item.username ,idAdmin: item.idAdmin, password: item.password, isSuper: item.isSuper})}>
                                Sửa
                            </Button>
                            <Button
                              variant='contained'
                              color='error' 
                              onClick={() => handleDelete(item)}>
                                Xóa
                            </Button>
                        </div>
                        }
                        </td>}
                    </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageAdmin;