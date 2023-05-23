import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Admin/Navbar";
import { getOrder, cancelOrder, confirmOrder } from "../../redux/action/orderAction";

// fake data
const orders = [
    {
        idCart: 1,
        idUser: 15,
        note: "hi",
        product: [
            {
                idProduct: 3,
                quantity: 12,
                nameProduct: "Chân váy",
                price: 3000,
                img1: null
            },
            {
                idProduct: 1,
                quantity: 21,
                nameProduct: "Áo",
                price: 1000,
                img1: null
            },
            {
                idProduct: 2,
                quantity: 99,
                nameProduct: "Quần dài",
                price: 2000,
                img1: null
            },
            {
                idProduct: 19,
                quantity: 12,
                nameProduct: "Áo Phông",
                price: 12,
                img1: null
            }
        ],
        status: 1,
        total: 123,
        address: "Ninh bình",
        createdAt: "2023-03-15T17:00:00.000Z",
        delivertAt: null,
        fullname: "taquyet",
        phone: 123456789
    },
    {
        idCart: 32,
        idUser: 6,
        note: null,
        product: [
            {
                idProduct: 3,
                quantity: 12,
                nameProduct: "Chân váy",
                price: 3000,
                img1: null
            },
            {
                idProduct: 1,
                quantity: 21,
                nameProduct: "Áo",
                price: 1000,
                img1: null
            },
            {
                idProduct: 2,
                quantity: 99,
                nameProduct: "Quần dài",
                price: 2000,
                img1: null
            },
            {
                idProduct: 19,
                quantity: 12,
                nameProduct: "Áo Phông",
                price: 12,
                img1: null
            }
        ],
        status: 3,
        total: 0,
        address: "",
        createdAt: null,
        delivertAt: null,
        fullname: "taquyet",
        phone: 123456789
    },
    {
        idCart: 34,
        idUser: 1,
        note: "xin chào",
        product: [
            {
                idProduct: 3,
                quantity: 12,
                nameProduct: "Chân váy",
                price: 3000,
                img1: null
            },
            {
                idProduct: 1,
                quantity: 21,
                nameProduct: "Áo",
                price: 1000,
                img1: null
            },
            {
                idProduct: 2,
                quantity: 99,
                nameProduct: "Quần dài",
                price: 2000,
                img1: null
            },
            {
                idProduct: 19,
                quantity: 12,
                nameProduct: "Áo Phông",
                price: 12,
                img1: null
            }
        ],
        status: 1,
        total: 122,
        address: "ha noi",
        createdAt: "2023-03-01T17:00:00.000Z",
        delivertAt: null,
        fullname: "quyet",
        phone: 123456789
    },
    {
        idCart: 37,
        idUser: 12,
        note: null,
        product: [
            {
                idProduct: 3,
                quantity: 12,
                nameProduct: "Chân váy",
                price: 3000,
                img1: null
            },
            {
                idProduct: 1,
                quantity: 21,
                nameProduct: "Áo",
                price: 1000,
                img1: null
            },
            {
                idProduct: 2,
                quantity: 99,
                nameProduct: "Quần dài",
                price: 2000,
                img1: null
            },
            {
                idProduct: 19,
                quantity: 12,
                nameProduct: "Áo Phông",
                price: 12,
                img1: null
            }
        ],
        status: 3,
        total: 0,
        address: "",
        createdAt: null,
        delivertAt: null,
        fullname: "taquyet",
        phone: 123456789
    }
]

const ManageOrder = () => {
    const dispatch = useDispatch()
    const orderList = orders;
    const [filter, setFilter] = useState("1")
    const [day, setDay] = useState("3")

    const handleConfirm = (id, createdAt) => {
        const newDate = new Date(createdAt)
        console.log(day);
        newDate.setDate(newDate.getDate() + parseInt(day));
        console.log(newDate);
        dispatch(confirmOrder({idCart: id, deliveryAt: newDate}))
    }
    useEffect( () => {
        dispatch(getOrder())
        console.log(orderList);
    }, [])
    return (
        <div>
            <Navbar />
            <div style={{ marginLeft: 250}} className="order-container">
                <h1>Quản lý đơn hàng</h1>
                <select value={filter} onChange={e => setFilter(e.target.value)}>
                    <option value="1">Đang chờ duyệt</option>
                    <option value="3">Đã hủy</option>
                    <option value="2">Đã duyệt</option>
                </select>
                {orderList.filter(item => item.status == filter).map(item => (
                    <div key={item.idCart} className="item-order">
                        <div className="info-order">
                            <p>Mã đơn hàng: {item.idCart}</p>
                            <p>Tên khách hàng: {item.fullname}</p>
                            <p>Địa chỉ: {item.address}</p>
                            <p>Số điện thoại: {item.fullname}</p>
                            <p>Tổng tiền: {item.total}</p>
                            <p>Ghi chú: {item.note}</p>
                            <p>Ngày tạo: {item.createdAt}</p>
                            <p>Ngày gửi dự kiến: {item.deliveryAt}</p>
                        </div>
                        <div className="info-product">
                            {item.product.map(i => (
                                <div key={i.idProduct} className="item-product">
                                    <p>Tên sản phẩm: {i.nameProduct}</p>
                                    <p>Số lượng: {i.quantity}</p>
                                </div>
                            ))}    
                        </div>
                        {item.status === 1 &&
                            <div className="confirm-order">
                                <h4>Thời gian giao dự kiến</h4>
                                <select value={day} onChange={e => setDay(e.target.value)}>
                                    <option value="3">3 ngày</option>
                                    <option value="5">5 ngày</option>
                                    <option value="7">7 ngày</option>
                                </select>
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() => handleConfirm(item.idCart, item.createdAt)}                             
                                >Xác nhận</Button>
                                <Button
                                    variant="contained"
                                    color="error"  
                                    onClick={() => dispatch(cancelOrder({idCart: item.idCart}))}                           
                                >Hủy đơn</Button>
                            </div>
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ManageOrder;