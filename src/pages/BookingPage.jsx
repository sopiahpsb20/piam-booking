import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom"; // Untuk navigasi antar halaman
import { Search, Star, ChevronDown, Sliders } from "lucide-react";

const hotels = [
  {
    id: 1,
    nama: "Hotel Indonesia Kempinski",
    alamat: "Jl. MH Thamrin No. 1, Jakarta Pusat",
    jumlahKamar: 289,
    fasilitas: ["Wi-Fi", "Kolam Renang", "Spa", "Pusat Kebugaran"],
    rating: 4.9,
    hargaPerMalam: 3200000,
    kamarTersedia: 50,
    gambar: "https://images.trvl-media.com/lodging/2000000/1950000/1942700/1942665/c71c3d95.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
    tipeKamar: [
      {
        nama: "Superior Room",
        harga: 3200000,
        fasilitas: ["Wi-Fi", "TV Kabel", "Mini Bar", "AC"]
      },
      {
        nama: "Deluxe Room",
        harga: 4500000,
        fasilitas: ["Wi-Fi", "Kolam Renang Pribadi", "Spa", "Pemandangan Kota"]
      },
      {
        nama: "Executive Suite",
        harga: 6000000,
        fasilitas: ["Wi-Fi", "Spa", "Kolam Renang Pribadi", "Balkon", "TV OLED"]
      }
    ]
  },
  {
    id: 2,
    nama: "Padma Hotel Bandung",
    alamat: "Jl. Ranca Bentang No. 56-58, Ciumbuleuit, Bandung",
    jumlahKamar: 124,
    fasilitas: ["Wi-Fi", "Kolam Renang", "Restoran", "Taman Bermain Anak"],
    rating: 4.8,
    hargaPerMalam: 2500000,
    kamarTersedia: 20,
    gambar: "https://padmahotelbandung.com/images/content/home-aerial.jpg",
    tipeKamar: [
      {
        nama: "Standard Room",
        harga: 2500000,
        fasilitas: ["Wi-Fi", "TV", "Mini Bar"]
      },
      {
        nama: "Family Room",
        harga: 3500000,
        fasilitas: ["Wi-Fi", "Kolam Renang", "Tempat Tidur King", "Dapur Mini"]
      }
    ]
  },
  {
    id: 3,
    nama: "The Ritz-Carlton Bali",
    alamat: "Jl. Raya Nusa Dua Selatan Lot III, Bali",
    jumlahKamar: 313,
    fasilitas: ["Wi-Fi", "Pantai Pribadi", "Kolam Renang", "Spa"],
    rating: 4.9,
    hargaPerMalam: 4500000,
    kamarTersedia: 40,
    gambar: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/03/e7/78/exterior.jpg?w=700&h=-1&s=1",
    tipeKamar: [
      {
        nama: "Ocean View Room",
        harga: 4500000,
        fasilitas: ["Wi-Fi", "Pemandangan Laut", "Balkon Pribadi"]
      },
      {
        nama: "Villas",
        harga: 8000000,
        fasilitas: ["Kolam Renang Pribadi", "Spa", "Pemandangan Laut", "TV 4K"]
      }
    ]
  },
  {
    id: 4,
    nama: "JW Marriott Hotel Surabaya",
    alamat: "Jl. Embong Malang No. 85-89, Surabaya",
    jumlahKamar: 407,
    fasilitas: ["Wi-Fi", "Kolam Renang", "Pusat Kebugaran", "Bar"],
    rating: 4.7,
    hargaPerMalam: 2000000,
    kamarTersedia: 30,
    gambar: "https://id.jwmarriottsurabaya.com/resourcefiles/home-content-section-image/jw-marriott-surabaya-facade.jpg?version=11052024081947",
    tipeKamar: [
      {
        nama: "Deluxe Room",
        harga: 2000000,
        fasilitas: ["Wi-Fi", "AC", "Mini Bar", "TV Kabel"]
      },
      {
        nama: "Marriott Suite",
        harga: 4500000,
        fasilitas: ["Spa", "Kolam Renang", "Balkon", "TV OLED"]
      }
    ]
  },
  {
    id: 5,
    nama: "The Phoenix Hotel Yogyakarta",
    alamat: "Jl. Jenderal Sudirman No. 9, Yogyakarta",
    jumlahKamar: 144,
    fasilitas: ["Wi-Fi", "Restoran", "Spa", "Kolam Renang"],
    rating: 4.6,
    hargaPerMalam: 1500000,
    kamarTersedia: 25,
    gambar: "https://www.ahstatic.com/photos/5451_ho_00_p_1024x768.jpg",
    tipeKamar: [
      {
        nama: "Superior Room",
        harga: 1500000,
        fasilitas: ["Wi-Fi", "AC", "TV Kabel"]
      },
      {
        nama: "Deluxe Room",
        harga: 2000000,
        fasilitas: ["Kolam Renang", "Mini Bar", "Balkon"]
      },
      {
        nama: "Royal Suite",
        harga: 3500000,
        fasilitas: ["Spa", "Kolam Renang Pribadi", "Pemandangan Kota"]
      }
    ]
  },
  {
    id: 6,
    nama: "Harris Hotel & Conventions Malang",
    alamat: "Jl. A. Yani Utara Riverside Blok C No. 1, Malang",
    jumlahKamar: 229,
    fasilitas: ["Wi-Fi", "Restoran", "Kolam Renang", "Pusat Kebugaran", "Spa"],
    rating: 4.5,
    hargaPerMalam: 900000,
    kamarTersedia: 50,
    gambar: "https://pix10.agoda.net/hotelImages/408/408193/408193_16042513020041769119.jpg?ca=6&ce=1&s=414x232",
    tipeKamar: [
      {
        nama: "Standard Room",
        harga: 900000,
        fasilitas: ["Wi-Fi", "AC", "TV Kabel"]
      },
      {
        nama: "Family Suite",
        harga: 1500000,
        fasilitas: ["Kolam Renang", "Balkon", "Tempat Tidur King"]
      }
    ]
  },
  {
    id: 7,
    nama: "Grand Aston City Hall Medan",
    alamat: "Jl. Balai Kota No. 1, Medan",
    jumlahKamar: 250,
    fasilitas: ["Wi-Fi", "Restoran", "Kolam Renang", "Spa"],
    rating: 4.5,
    hargaPerMalam: 1200000,
    kamarTersedia: 35,
    gambar: "https://asset-2.tstatic.net/tribunmedanwiki/foto/bank/images/bangunan-hotel-grand-city-hall.jpg",
    tipeKamar: [
      {
        nama: "Superior Room",
        harga: 1200000,
        fasilitas: ["Wi-Fi", "Mini Bar", "AC"]
      },
      {
        nama: "Deluxe Room",
        harga: 1600000,
        fasilitas: ["Kolam Renang", "Pemandangan Kota", "Spa"]
      },
      {
        nama: "Executive Suite",
        harga: 2500000,
        fasilitas: ["Kolam Renang Pribadi", "Spa", "TV LED"]
      }
    ]
  },
  {
    id: 8,
    nama: "Swiss-Belhotel Makassar",
    alamat: "Jl. Ujung Pandang No. 8, Makassar",
    jumlahKamar: 207,
    fasilitas: ["Wi-Fi", "Restoran", "Kolam Renang", "Pusat Kebugaran"],
    rating: 4.3,
    hargaPerMalam: 1000000,
    kamarTersedia: 40,
    gambar: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/9f/79/bb/hotel-facade.jpg?w=700&h=-1&s=1",
    tipeKamar: [
      {
        nama: "Standard Room",
        harga: 1000000,
        fasilitas: ["Wi-Fi", "AC", "TV Kabel"]
      },
      {
        nama: "Superior Room",
        harga: 1500000,
        fasilitas: ["Kolam Renang", "Mini Bar", "Balkon"]
      },
      {
        nama: "Suite Room",
        harga: 2500000,
        fasilitas: ["Pemandangan Laut", "Balkon", "TV 4K"]
      }
    ]
  },
  {
    id: 9,
    nama: "Plataran Borobudur Resort & Spa",
    alamat: "Dusun Tanjungan, Borobudur, Magelang",
    jumlahKamar: 21,
    fasilitas: ["Wi-Fi", "Kolam Renang", "Spa", "Pemandangan Candi"],
    rating: 4.9,
    hargaPerMalam: 5000000,
    kamarTersedia: 10,
    gambar: "https://plataran-borobudur-resort-yogyakarta.hotelmix.id/data/Photos/OriginalPhoto/12834/1283459/1283459428/Plataran-Borobudur-Hotel-Magelang-Exterior.JPEG",
    tipeKamar: [
      {
        nama: "Deluxe Room",
        harga: 5000000,
        fasilitas: ["Wi-Fi", "Balkon", "Kolam Renang"]
      },
      {
        nama: "Villas",
        harga: 7000000,
        fasilitas: ["Kolam Renang Pribadi", "Pemandangan Candi", "Spa"]
      }
    ]
  },
  {
    id: 10,
    nama: "Novotel Balikpapan",
    alamat: "Jl. Brigjen Ery Suparjan No. 2, Balikpapan",
    jumlahKamar: 198,
    fasilitas: ["Wi-Fi", "Kolam Renang", "Restoran", "Pusat Kebugaran"],
    rating: 4.4,
    hargaPerMalam: 1100000,
    kamarTersedia: 30,
    gambar: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/38125356.jpg?k=920bff0138a62489c9374d387f8637da2825ab28b21f147c236f6b6b976068df&o=&hp=1",
    tipeKamar: [
      {
        nama: "Standard Room",
        harga: 1100000,
        fasilitas: ["Wi-Fi", "AC", "Mini Bar"]
      },
      {
        nama: "Superior Room",
        harga: 1500000,
        fasilitas: ["Kolam Renang", "TV Kabel", "Balkon"]
      }
    ]
  },
  {
    id: 11,
    nama: "Aston Jambi Hotel & Conference Center",
    alamat: "Jl. Sultan Agung No. 99, Jambi",
    jumlahKamar: 153,
    fasilitas: ["Wi-Fi", "Restoran", "Kolam Renang", "Pusat Kebugaran"],
    rating: 4.5,
    hargaPerMalam: 900000,
    kamarTersedia: 40,
    gambar: "https://jambiekspres.disway.id/foto_berita/2021/05/18/610.jfif",
    tipeKamar: [
      {
        nama: "Standard Room",
        harga: 900000,
        fasilitas: ["Wi-Fi", "AC", "Mini Bar"]
      },
      {
        nama: "Deluxe Room",
        harga: 1300000,
        fasilitas: ["Kolam Renang", "Pemandangan Kota", "TV LED"]
      }
    ]
  },

  {
    id: 12,
    nama: "Alila Villas Uluwatu",
    alamat: "Jl. Belimbing Sari, Banjar Tambiyak, Pecatu, Bali",
    jumlahKamar: 65,
    fasilitas: ["Wi-Fi", "Kolam Renang Pribadi", "Spa", "Restoran", "Pemandangan Laut"],
    rating: 4.9,
    hargaPerMalam: 8500000,
    kamarTersedia: 10,
    gambar: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/376826697.jpg?k=b19a3f533c01517b3835aa140bad02cb07f457ab3016488e297888acfb500132&o=&hp=1",
    tipeKamar: [
      {
        nama: "Pool Villa",
        harga: 8500000,
        fasilitas: ["Kolam Renang Pribadi", "Pemandangan Laut", "Balkon"]
      },
      {
        nama: "Ocean View Pool Villa",
        harga: 10500000,
        fasilitas: ["Kolam Renang Pribadi", "Pemandangan Laut", "Layanan Butik"]
      }
    ]
  },
  {
    id: 13,
    nama: "Plataran Komodo Resort & Spa",
    alamat: "Waecicu Beach, Labuan Bajo, Nusa Tenggara Timur",
    jumlahKamar: 21,
    fasilitas: ["Wi-Fi", "Pantai Pribadi", "Spa", "Restoran"],
    rating: 4.9,
    hargaPerMalam: 6000000,
    kamarTersedia: 10,
    gambar: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/319782546.jpg?k=924b7e388d7e13c93c695ed4b31b0fbfeb47bda6fbb6fb6c3856d90a1b80d2f9&o=&hp=1",
    tipeKamar: [
      {
        nama: "Ocean View Bungalow",
        harga: 6000000,
        fasilitas: ["Pantai Pribadi", "Wi-Fi", "Balkon"]
      },
      {
        nama: "Beachfront Suite",
        harga: 8000000,
        fasilitas: ["Pemandangan Laut", "Kolam Renang Pribadi", "Layanan Spa"]
      }
    ]
  },
  {
    id: 14,
    nama: "Mercure Padang",
    alamat: "Jl. Purus IV No. 8, Padang",
    jumlahKamar: 146,
    fasilitas: ["Wi-Fi", "Kolam Renang", "Restoran", "Spa"],
    rating: 4.5,
    hargaPerMalam: 1100000,
    kamarTersedia: 50,
    gambar: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/60721466.jpg?k=2435c173aac95770c295572861e035b4be5a2311ef475041d7f6ac47f59f2cc9&o=&hp=1",
    tipeKamar: [
      {
        nama: "Standard Room",
        harga: 1100000,
        fasilitas: ["Wi-Fi", "AC", "TV Kabel"]
      },
      {
        nama: "Deluxe Room",
        harga: 1400000,
        fasilitas: ["Kolam Renang", "Mini Bar", "Balkon"]
      },
      {
        nama: "Suite Room",
        harga: 1800000,
        fasilitas: ["Spa", "Pemandangan Kota", "Layanan Butik"]
      }
    ]
  },
  {
    id: 15,
    nama: "Hermes Palace Hotel Banda Aceh",
    alamat: "Jl. T. Panglima Nyak Makam, Banda Aceh",
    jumlahKamar: 159,
    fasilitas: ["Wi-Fi", "Kolam Renang", "Restoran", "Spa"],
    rating: 4.3,
    hargaPerMalam: 950000,
    kamarTersedia: 35,
    gambar: "https://content.skyscnr.com/available/1681084124/1681084124_350x160.jpg",
    tipeKamar: [
      {
        nama: "Superior Room",
        harga: 950000,
        fasilitas: ["Wi-Fi", "AC", "TV Kabel"]
      },
      {
        nama: "Deluxe Room",
        harga: 1200000,
        fasilitas: ["Kolam Renang", "Mini Bar", "Balkon"]
      },
      {
        nama: "Executive Suite",
        harga: 1500000,
        fasilitas: ["Spa", "Pemandangan Kota", "Layanan Butik"]
      }
    ]
  }
];

const BookingPage = () => {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [roomsToBook, setRoomsToBook] = useState(1);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [selectedRoomType, setSelectedRoomType] = useState({});
  const [searchQuery, setSearchQuery] = useState(""); // Untuk pencarian
  const [selectedRating, setSelectedRating] = useState(0); // Untuk filter rating
  const [selectedFacility, setSelectedFacility] = useState(""); // Untuk filter fasilitas
  const [sortBy, setSortBy] = useState("hargaTermurah"); // Untuk pengurutan (harga termurah atau termahal)

  const navigate = useNavigate();

  const handleSelectHotel = (hotel) => {
    setSelectedHotel(hotel);
    setShowModal(true);
  };

  const handleBooking = (e) => {
    e.preventDefault();

    // Ambil order dari localStorage dan parse ke JSON
    const storedOrder = JSON.parse(localStorage.getItem("order")) || [];

    const checkInDateObj = new Date(checkInDate);
    const checkOutDateObj = new Date(checkOutDate);
    const numberOfDays = Math.ceil((checkOutDateObj - checkInDateObj) / (1000 * 3600 * 24)); // Menghitung jumlah hari
    const totalPrice = selectedRoomType.harga * roomsToBook * numberOfDays;

    // Buat objek order baru
    const order = {
      guestName,
      guestEmail,
      hotel: selectedHotel.nama,
      roomType: selectedRoomType, // Store the complete room object
      roomsToBook,
      checkInDate,
      checkOutDate,
      harga: totalPrice // Calculate total price
    };

    console.log(order);
    console.log(selectedRoomType);

    // Tambahkan order baru ke array storedOrder
    storedOrder.push(order);

    // // Simpan array order ke localStorage dalam bentuk string JSON
    localStorage.setItem("order", JSON.stringify(storedOrder));

    // // Arahkan ke halaman pesanan
    navigate("/my-orders");
  };
  const closeModal = () => {
    setShowModal(false);
    setSelectedHotel(null);
  };

  // Filter hotels berdasarkan pencarian, rating, dan fasilitas
  const filteredHotels = hotels
    .filter((hotel) => {
      // Filter berdasarkan pencarian nama hotel
      return hotel.nama.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .filter((hotel) => {
      // Filter berdasarkan rating
      return selectedRating ? hotel.rating >= selectedRating : true;
    })
    .filter((hotel) => {
      // Filter berdasarkan fasilitas
      if (selectedFacility) {
        return hotel.fasilitas.includes(selectedFacility);
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "hargaTermurah") {
        return a.hargaPerMalam - b.hargaPerMalam; // Harga Termurah
      } else if (sortBy === "hargaTermahal") {
        return b.hargaPerMalam - a.hargaPerMalam; // Harga Termahal
      } else if (sortBy === "rating") {
        return b.rating - a.rating; // Rating
      }
      return 0;
    });

  return (
    <div className="app">
      <Header />
      <section className="booking-section">
        {/* Search Field */}
        <div className="search-bar">
          <input type="text" placeholder="Cari hotel..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          {/* <Search className="bookpagesearchicon" /> */}
        </div>

        {/* Filters */}
        <div className="filters">
          <label>
            <Star className="bintang" /> Rating:
          </label>
          <select value={selectedRating} onChange={(e) => setSelectedRating(Number(e.target.value))}>
            <option value={0}>Semua</option>
            <option value={4.5}>4.5 ke atas</option>
            <option value={4.8}>4.8 ke atas</option>
          </select>
          <label>
            <Sliders className="" /> Fasilitas:
          </label>{" "}
          <select value={selectedFacility} onChange={(e) => setSelectedFacility(e.target.value)}>
            <option value="">Semua</option>
            <option value="Kolam Renang">Kolam Renang</option>
            <option value="Spa">Spa</option>
            <option value="Wi-Fi">Wi-Fi</option>
          </select>
          <label> Urutkan Berdasarkan:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="hargaTermurah">Harga Termurah</option>
            <option value="hargaTermahal">Harga Termahal</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        {/* Hotel List */}
        <div className="hotel-list">
          {filteredHotels.map((hotel) => (
            <div key={hotel.id} className="hotel-item">
              <img src={hotel.gambar} alt={hotel.nama} />
              <div className="hotel-details">
                <h3>{hotel.nama}</h3>
                <p>{hotel.alamat}</p>
                <p>Rating: {hotel.rating}</p>
                <p>Harga per malam: Rp {hotel.hargaPerMalam.toLocaleString()}</p>

                <div className="hotel-facilities">
                  <h4>Fasilitas:</h4>
                  <ul>
                    {hotel.fasilitas.map((fasilitas, index) => (
                      <li key={index}>{fasilitas}</li>
                    ))}
                  </ul>
                </div>

                <button className="booking-button" onClick={() => handleSelectHotel(hotel)}>
                  Booking
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Form Modal */}
        {showModal && selectedHotel && (
          <div className="booking-form">
            <div className="modal-overlay">
              <div className="modal">
                <button className="close-button" onClick={closeModal}>
                  ✖
                </button>
                <h3>Pesan Kamar di {selectedHotel.nama}</h3>
                <form onSubmit={handleBooking}>
                  <div>
                    <label>Nama :</label>
                    <input type="text" value={guestName} onChange={(e) => setGuestName(e.target.value)} required />
                  </div>
                  <div>
                    <label>Email :</label>
                    <input type="email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} required />
                  </div>
                  <div>
                    <label>Tipe Kamar :</label>
                    <select
                      onChange={(e) => {
                        const selectedRoom = selectedHotel.tipeKamar.find((room) => room.nama === e.target.value);
                        setSelectedRoomType(selectedRoom); // Store complete room object
                      }}
                      required
                    >
                      {selectedHotel.tipeKamar.map((room) => (
                        <option key={room.nama} value={room.nama}>
                          {room.nama} - Rp{room.harga.toLocaleString()} per malam
                        </option>
                      ))}
                    </select>
                    <p>Total Harga: Rp{(selectedRoomType?.harga * roomsToBook).toLocaleString()}</p>
                  </div>

                  <div>
                    <label>Jumlah Kamar :</label>
                    <input type="number" value={roomsToBook} onChange={(e) => setRoomsToBook(Number(e.target.value))} min="1" max={selectedHotel.kamarTersedia} />
                  </div>
                  <div>
                    <label>Tanggal Check-in :</label>
                    <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} required />
                  </div>
                  <div>
                    <label>Tanggal Check-out :</label>
                    <input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} required />
                  </div>
                  <button type="submit" className="submit-button">
                    Confirm Booking
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default BookingPage;
