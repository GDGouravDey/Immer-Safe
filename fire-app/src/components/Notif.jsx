import { useState, useEffect } from "react";
import styles from "../style";
import { fire_station, robot, close_circle } from "../assets";
import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notif = () => {
  const [data, setData] = useState([]);
  const [lastTimestamp, setLastTimestamp] = useState(null);
  const [displayedNotifications, setDisplayedNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNotification, setSelectedNotification] = useState(null); // State for selected notification
  const notificationsPerPage = 5;
  const time = 14;

  useEffect(() => {
    fetchData(); // Fetch data initially
    const interval = setInterval(fetchData, 5000); // Fetch data every 10 seconds
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  useEffect(() => {
    // Apply animation when notifications change
    const handleScroll = () => {
      const notificationItems = document.querySelectorAll(".notification-item");
      notificationItems.forEach((item) => {
        const itemPosition = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (itemPosition < windowHeight * 0.8) {
          item.classList.add("show");
        }
        // else {
        //   item.classList.remove("show");
        // }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://immer-safe.onrender.com/getNotif"); // Replace with your API endpoint
      const jsonData = await response.json();
      const sortedData = jsonData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Sort data based on recency
      setData(sortedData);
      if (sortedData.length > 0) {
        setLastTimestamp(sortedData[0].timestamp); // Set the last timestamp to the timestamp of the latest notification
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const showToastIfNewNotification = (notification) => {
    console.log(notification);
    const currentTime = new Date();
    const notificationTime = new Date(notification.timestamp);
    const lastTime = lastTimestamp > notificationTime ? lastTimestamp : notificationTime;
    const differenceInMinutes = (currentTime - lastTime) / (1000 * 60);
    if (lastTime != lastTimestamp &&
      differenceInMinutes <= 1 &&
      !displayedNotifications.includes(notification._id) // Check if the notification ID is not in the displayedNotifications array
    ) {
      toast.error("Fire Alert Received!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
      });

      setLastTimestamp(notification.timestamp); // Update the last timestamp to the timestamp of the new notification
      setDisplayedNotifications([...displayedNotifications, notification._id]); // Add the notification ID to the displayedNotifications array
    }
  };

  const convertToIST = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      timeZone: "Asia/Kolkata", // Set the timezone to Indian Standard Time (IST)
      hour12: true, // Use 12-hour clock format
    };
    return date.toLocaleTimeString("en-IN", options); // Convert to IST time string
  };

  // Convert timestamp to Indian Standard Date (IST)
  const convertDateToIST = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      timeZone: "Asia/Kolkata", // Set the timezone to Indian Standard Time (IST)
    };
    return date.toLocaleDateString("en-IN", options); // Convert to IST date string
  };

  // Get current notifications
  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
  const currentNotifications = data.slice(indexOfFirstNotification, indexOfLastNotification);

  // Change page
  const paginate = (pageNumber) => {
    window.scrollTo(0, 0);
    setCurrentPage(pageNumber);
  };

  // Open modal with selected notification
  const openModal = (notification) => {
    setSelectedNotification(notification);
  };

  // Close modal
  const closeModal = () => {
    setSelectedNotification(null);
  };

  // Modal component
  const NotificationModal = ({ notification, onClose }) => {
    // Open modal with selected notification
    useEffect(() => {
      // Disable scrolling on the body when the modal is open
      document.body.style.overflow = "hidden";

      // Re-enable scrolling on the body when the modal is closed
      return () => {
        document.body.style.overflow = "unset";
      };
    }, []);

    return (
      <>
        <div className="modal-background" onClick={(e) => e.stopPropagation()}></div>
        <div className="modal">
          <div className="modal-content relative">
            <img
              src={close_circle}
              alt="Close"
              className="absolute top-0 right-0 sm:mt-2 sm:mr-2 cursor-pointer w-10 h-10"
              onClick={onClose}
            />
            <h2 className="text-3xl font-bold mb-2">FIRE ALERT</h2>
            <p><b>Place:</b> {notification["a1"] < 200 ? "Room 1" : "Room 2"}</p>
            <p><b>Time:</b> {convertToIST(notification["timestamp"])}</p>
            <p><b>Date:</b> {convertDateToIST(notification["timestamp"])}</p>
            <p>Nearest Fire Station Details:</p>
            <img src={fire_station} alt='Nearest Fire Station' className="my-2 rounded-[10px]" />
            <p>Manicktala Fire Station</p>
            <p><b>Address:</b> Bagmari Lane, Kankurgachi, Kolkata, West Bengal -  700054</p>
            <p><b>Phone:</b> 033 2320 7489</p>
            <p><b>Expected Arrival Time:</b> {time} minutes</p>
          </div>
        </div>
      </>
    );
  };


  return (
    <>
      <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
        <div className={`flex-1 ${styles.flexStart} flex-col sm:px-16 px-6`}>

          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex-1 flex-col xl:px-0 px-2 sm:px-16">
              <div className="flex flex-row justify-between items-center w-full">
                <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[45px] text-white ss:leading-[100.8px] leading-[75px] sm:mt-[-50px] md:mt-[-100px] lg:mt-[0px] mb-[10px] xl:mt-[-60px]">
                  <span className="text-gradient">Notifications</span>{" "}
                </h1>
              </div>

              <div className="mt-4 hidden xs:block">
                <div id="notificationContainer" className="notification-container">
                  {currentNotifications.map((notification, index) => (
                    <div key={index} className="notification-item text-white p-7 rounded-[20px] shadow-lg mb-7 cursor-pointer" style={{ background: 'linear-gradient(160deg, #E72028 65%, #FF8733 100%)' }} onClick={() => openModal(notification)}>
                      <h2 className="text-[1.6rem] font-bold font-poppins mb-2">{notification["a1"] < 200 ? "Fire detected in Room 1" : "Fire detected in Room 2"}</h2>
                      <h3 className="text-[1.4rem] font-poppins mb-1">High Temperatures detected</h3>
                      <p className="text-xl font-poppins mb-1"><b>Place:</b> {notification["a1"] < 200 ? "Room 1" : "Room 2"}</p>
                      <p className="text-xl font-poppins mb-1"><b>Time:</b> {convertToIST(notification["timestamp"])}</p>
                      <p className="text-xl font-poppins mb-1"><b>Date:</b> {convertDateToIST(notification["timestamp"])}</p>
                      {showToastIfNewNotification(notification)}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 block xs:hidden">
                <div id="notificationContainer" className="notification-container-phone">
                  {currentNotifications.map((notification, index) => (
                    <div key={index} className="notification-item text-white p-4 rounded-[20px] shadow-lg mb-6 cursor-pointer" style={{ width: '300px', background: 'linear-gradient(160deg, #E72028 65%, #FF8733 100%)' }} onClick={() => openModal(notification)}>
                      <h2 className="text-[1.4rem] font-bold font-poppins mb-2">{notification["a1"] < 200 ? "Fire detected in Room 1" : "Fire detected in Room 2"}</h2>
                      <h3 className="text-[1.2rem] font-poppins mb-1">High Temperature detected</h3>
                      <p className="text-[1.2rem] font-poppins mb-1"><b>Place:</b> {notification["a1"] < 200 ? "Room 1" : "Room 2"}</p>
                      <p className="text-[1.2rem] font-poppins mb-1"><b>Time:</b> {convertToIST(notification["timestamp"])}</p>
                      <p className="text-[1.2rem] font-poppins mb-1"><b>Date:</b> {convertDateToIST(notification["timestamp"])}</p>
                      {showToastIfNewNotification(notification)}
                    </div>
                  ))}
                </div>
              </div>

              <nav className="mt-10">
                <ul className="pagination flex justify-center gap-4">
                  {Array.from({ length: Math.ceil(data.length / notificationsPerPage) }, (_, i) => (
                    <li key={i} className="page-item">
                      <button onClick={() => paginate(i + 1)} className="bg-red-600 text-white font-bold font-poppins py-3 px-5 mx-2 rounded-[10px]">
                        {i + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {/* Modal component */}
        {selectedNotification && (
          <NotificationModal notification={selectedNotification} onClose={closeModal} />
        )}

        <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
          <img src={robot} alt="billing" className="w-[100%] h-[100%] relative z-[5] sm:w-[50vw] sm:h-[50vw]" />

          {/* gradient start */}
          <div className="absolute z-[0] w-[40%] h-[35%] top-0 orange__gradient" />
          <div className="absolute z-[0] w-[100%] h-[50%] right-20 bottom-40 white__gradient" />
          {/* gradient end */}
        </div>
      </section>
    </>
  );
};

export default Notif;
