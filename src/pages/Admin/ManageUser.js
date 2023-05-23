import React, { useEffect, useState} from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Navbar from '../../components/Admin/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUser } from '../../redux/action/userAction';

const users = [
  {
    idUser: "1",
    email: "lelong123@gmail.com"
  }
]

const ManageUser = () => {
  const userList = useSelector(state => state.user.userList)
  const [checked, setChecked] = useState([true, true, true, true, true, true, true]);
  const dispatch = useDispatch()
  const level = localStorage.getItem('login')

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
    <Box sx={{ display: 'flex', flexDirection: 'cow', ml: 3 }}>
      <FormControlLabel
        label="Mã"
        name='0'
        control={<Checkbox checked={checked[0]} onChange={handleChangeBox} />}
      />
      <FormControlLabel
        label="Email"
        name='1'
        control={<Checkbox checked={checked[1]} onChange={handleChangeBox} />}
      />
      <FormControlLabel
        label="Tên đầy đủ"
        name='2'
        control={<Checkbox checked={checked[2]} onChange={handleChangeBox} />}
      />
      <FormControlLabel
        label="Địa chỉ"
        name='3'
        control={<Checkbox checked={checked[3]} onChange={handleChangeBox} />}
      />
      <FormControlLabel
        label="Quận/Huyện"
        name='4'
        control={<Checkbox checked={checked[4]} onChange={handleChangeBox} />}
      />
      <FormControlLabel
        label="Tỉnh/Thành"
        name='5'
        control={<Checkbox checked={checked[5]} onChange={handleChangeBox} />}
      />
      <FormControlLabel
        label="Số điện thoại"
        name='6'
        control={<Checkbox checked={checked[6]} onChange={handleChangeBox} />}
      />
    </Box>
  );



  const handleDelete = (item) => {
    dispatch(deleteUser(item.idUser))
  }

  useEffect(() => {
    dispatch(getUser())
    console.log(1);
    console.log(userList);
  }, [])

  return (
    <div>
      <Navbar />
      <div className='user-container' style={{ marginLeft: 250}}>
      <h1>Quản lý người dùng</h1>
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
      <table>
        <thead>
          <tr>
            {checked[0] && <th className='id'>Mã</th>}
            {checked[1] && <th className='email'>Email</th>}
            {checked[2] && <th className='fullname'>Tên đầy đủ</th>}
            {checked[3] && <th className='address'>Địa chỉ</th>}
            {checked[4] && <th className='district'>Quận/Huyện</th>}
            {checked[5] && <th className='province'>Tỉnh/Thành</th>}
            {checked[6] && <th className='phone'>Số điện thoại</th>}
            {checked.some((item) => item !== false) && level==="3" && <th>Hành động</th>}
          </tr>
        </thead>
        <tbody>
        {userList.map(item => (
          <tr key={item.idUser}>
            {checked[0] && <td className='id'>{item.idUser}</td>}
            {checked[1] &&<td className='email'>{item.email}</td>}
            {checked[2] &&<td className='fullname'>{item.fullname}</td>}
            {checked[3] &&<td className='address'>{item.address_name}</td>}
            {checked[4] &&<td className='district'>{item.district_name}</td>}
            {checked[5] &&<td className='province'>{item.province_name}</td>}
            {checked[6] &&<td className='phone'>{item.phone}</td>}
            {checked.some((item) => item !== false) && level==="3" && <td className='action'>
              <Button
                variant='contained'
                color='error' 
                onClick={() => handleDelete(item)}>
                  Xóa
              </Button>
            </td>}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default ManageUser;