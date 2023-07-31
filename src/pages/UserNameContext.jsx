import React, { createContext, useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";

const UsernameContext = createContext();
const BASE_URL = "https://books-ciklum-default-rtdb.firebaseio.com/films.json";

const UsernameProvider = ({ children }) => {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [films, setFilms] = useState([]);
  const [filmCount, setFilmCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      setIsLoaded(true);
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setFilms(data);
    } catch (error) {
      setError(error);
      console.log(error.message);
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (username && location.pathname === "/signin") {
      navigate("/filmlist");
    }
  }, [username, location, navigate]);

  useEffect(() => {
    // При первом рендере, проверяем наличие информации об аутентификации в localStorage
    const storedUsername = localStorage.getItem("username");
    const storedAuthentication = localStorage.getItem("authentication");
    if (storedUsername) {
      setUsername(storedUsername); // Устанавливаем имя пользователя из localStorage в состояние
    }
    if (storedAuthentication === "true") {
      setIsAuthenticated(true); // Устанавливаем состояние аутентификации из localStorage
    }

    const storedCartItems = Cookies.get("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    // При зміні стану isAuthenticated зберігаємо його в localStorage
    localStorage.setItem("authentication", isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    Cookies.set("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Функция для установки имени пользователя и сохранения в localStorage
  const login = (newUsername) => {
    setIsAuthenticated(true);
    setUsername(newUsername); // Устанавливаем новое имя пользователя в состояние перед сохранением в localStorage

    localStorage.setItem("authentication", "true");
    localStorage.setItem("username", newUsername);
  };

  const logout = () => {
    setUsername("");
    setIsAuthenticated(false);
    localStorage.removeItem("username"); // Используем removeItem для удаления ключа из localStorage
    localStorage.setItem("authentication", "false");
    Cookies.remove("cartItems", "0");
    console.log("removed films data");
  };

  const updateTotalPrice = () => {
    let total = 0;
    for (const filmTitle in cartItems) {
      total += cartItems[filmTitle].price * cartItems[filmTitle].quantity;
    }
    setTotalPrice(total);
  };

  const addToCart = (film, count) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = { ...prevCartItems };
      const quantityToAdd = parseInt(count, 10);

      // Если фильм уже присутствует в корзине, увеличиваем количество на указанное значение filmCount.
      if (updatedCartItems[film.title]) {
        updatedCartItems[film.title].quantity += quantityToAdd;
      } else {
        // Если фильм отсутствует в корзине, добавляем новый объект с информацией о фильме.
        updatedCartItems[film.title] = {
          quantity: quantityToAdd,
          price: film.price,
        };
      }
      updateTotalPrice();

      // Сохранение состояния корзины в localStorage
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

      return updatedCartItems;
    });
  };
  useEffect(() => {
    // При обновлении состояния cartItems сохраняем его в localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const removeFromCart = (filmId, filmTitle) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = { ...prevCartItems };

      // Находим фильм в корзине по его id
      const filmToRemove = updatedCartItems[filmTitle];

      if (filmToRemove) {
        // Уменьшаем количество данного фильма на 1
        filmToRemove.quantity -= 1;

        // Если количество стало равно 0, удаляем фильм из корзины
        if (filmToRemove.quantity <= 0) {
          delete updatedCartItems[filmTitle];
        }
      }

      return updatedCartItems;
    });
  };

  const handleFilmCount = (event) => {
    setFilmCount(() => event.target.value);
  };
  return (
    <UsernameContext.Provider
      value={{
        username,
        setUsername,
        logout,
        login,
        isAuthenticated,
        setIsAuthenticated,
        cartItems,
        addToCart,
        removeFromCart,
        error,
        isLoaded,
        films,
        filmCount,
        handleFilmCount,
        totalPrice,
        setTotalPrice,
        fetchData,
      }}
    >
      {children}
    </UsernameContext.Provider>
  );
};

export { UsernameContext, UsernameProvider };
