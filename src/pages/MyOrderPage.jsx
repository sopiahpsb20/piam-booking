import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Edit, Trash, Plus } from "lucide-react";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrders = localStorage.getItem("order");
    const parsedOrders = storedOrders ? JSON.parse(storedOrders) : [];
    setOrders(Array.isArray(parsedOrders) ? parsedOrders : [parsedOrders]);
  }, []);

  const handleEditOrder = (index) => {
    setEditing(index);
  };

  const handleSaveOrder = (index) => {
    const updatedOrders = [...orders];
    localStorage.setItem("order", JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
    setEditing(null);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setOrders((prevOrders) => {
      const updatedOrders = [...prevOrders];
      updatedOrders[index] = { ...updatedOrders[index], [name]: value };
      return updatedOrders;
    });
  };

  const handleCancelBooking = () => {
    const updatedOrders = orders.filter((_, i) => i !== selectedOrderIndex);
    setOrders(updatedOrders);
    localStorage.setItem("order", JSON.stringify(updatedOrders));
    setShowCancelDialog(false);
  };

  const handleAddBooking = () => {
    navigate("/booking");
  };

  // Hitung jumlah malam dari tanggal check-in dan check-out
  const calculateNights = (checkInDate, checkOutDate) => {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDiff = Math.abs(checkOut - checkIn);
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Konversi milidetik ke hari
  };

  // Hitung total harga berdasarkan jenis kamar, jumlah malam, dan jumlah kamar
  const calculateTotalPrice = (roomPrice, nights, roomsToBook) => {
    return roomPrice * nights * roomsToBook;
  };

  return (
    <div className="app">
      <Header />
      <section className="my-orders">
        <h1>Pesanan Saya</h1>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="order-details">
              <p>Nama: {editing === index ? <input type="text" name="guestName" value={order.guestName} onChange={(e) => handleChange(e, index)} /> : order.guestName}</p>
              <p>Email: {editing === index ? <input type="email" name="guestEmail" value={order.guestEmail} onChange={(e) => handleChange(e, index)} /> : order.guestEmail}</p>
              <p>Hotel: {order.hotel}</p>
              <p>Jenis Kamar: {order.roomType.nama}</p>
              <p>Harga per Malam: Rp {order.roomType.harga.toLocaleString("id-ID")}</p>

              <p>Tanggal Check-in: {editing === index ? <input type="date" name="checkInDate" value={order.checkInDate} onChange={(e) => handleChange(e, index)} /> : order.checkInDate}</p>
              <p>Tanggal Check-out: {editing === index ? <input type="date" name="checkOutDate" value={order.checkOutDate} onChange={(e) => handleChange(e, index)} /> : order.checkOutDate}</p>
              <p>Jumlah Malam: {calculateNights(order.checkInDate, order.checkOutDate)}</p>
              <p>Jumlah Kamar: {order.roomsToBook}</p>
              <p>Total Harga: {order.harga.toLocaleString("id-ID")}</p>
              <div className="order-actions">
                {editing === index ? (
                  <button onClick={() => handleSaveOrder(index)}>
                    <Edit /> Simpan Perubahan
                  </button>
                ) : (
                  <button className="cancel-btn" onClick={() => handleEditOrder(index)}>
                    <Edit /> Edit Pesanan
                  </button>
                )}
                <button
                  onClick={() => {
                    setSelectedOrderIndex(index);
                    setShowCancelDialog(true);
                  }}
                  className="cancel-btn"
                >
                  <Trash /> Batalkan Pesanan
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Tidak ada pesanan!</p>
        )}
        <button onClick={handleAddBooking} className="add-booking-btn">
          <Plus /> Tambah Pemesanan
        </button>
      </section>
      {showCancelDialog && (
        <>
          <div className="dialog-overlay" onClick={() => setShowCancelDialog(false)}></div>
          <div className="cancel-dialog">
            <p>Apakah Anda yakin ingin membatalkan pesanan ini?</p>
            <button onClick={handleCancelBooking}>Ya</button>
            <button onClick={() => setShowCancelDialog(false)}>Tidak</button>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};

export default MyOrdersPage;
