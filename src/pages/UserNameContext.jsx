import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const UsernameContext = createContext();

const UsernameProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [films, setFilms] = useState([]);
  const [filmCount, setFilmCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchData = () => {
    fetch("/films.json")
      .then(
        (res) => res.json()
        // console.log(res);
      )
      .then((result) => {
        setIsLoaded(true);
        setFilms(result.films);
        // console.log(result);
      })
      .catch((error) => {
        setError(error);
        setIsLoaded(true);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

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
  }, []);

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

  const removeFromCart = (filmId) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = { ...prevCartItems };

      // Находим фильм в корзине по его id
      const filmToRemoveKey = Object.keys(updatedCartItems).find(
        (filmTitle) => updatedCartItems[filmTitle].id === filmId
      );

      if (filmToRemoveKey) {
        // Уменьшаем количество данного фильма на 1
        updatedCartItems[filmToRemoveKey].quantity -= 1;

        // Если количество стало равно 0, удаляем фильм из корзины
        if (updatedCartItems[filmToRemoveKey].quantity <= 0) {
          delete updatedCartItems[filmToRemoveKey];
        }
      }
      updateTotalPrice();
      // Сохранение состояния корзины в localStorage
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

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
      }}
    >
      {children}
    </UsernameContext.Provider>
  );
};

export { UsernameContext, UsernameProvider };
