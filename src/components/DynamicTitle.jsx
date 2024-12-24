import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DynamicTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const route = location.pathname;
    let title = 'Book Mgt Sys.'; // Default title

    // Update title based on route
    switch (route) {
      case '/':
        title = 'Home - Book Mgt Sys.';
        break;
      case '/login':
        title = 'Login - Book Mgt Sys.';
        break;
      case '/register':
        title = 'Register - Book Mgt Sys.';
        break;
      case '/addBook':
        title = 'Add Book - Book Mgt Sys.';
        break;
      case '/bookDetails/:bookId':
        title = 'Book Details - Book Mgt Sys.';
        break;
      case '/books':
        title = 'All Books - Book Mgt Sys.';
        break;
      case '/borrowedBooks':
        title = 'Borrowed Books - Book Mgt Sys.';
        break;
      default:
        if (route.startsWith('/bookDetails/')) {
          title = 'Book Details - Book Mgt Sys.';
        } else if (route.startsWith('/categories/')) {
          title = 'Category - Book Mgt Sys.';
        } else {
          title = 'Page Not Found - Book Mgt Sys.';
        }
    }

    document.title = title;
  }, [location]);

  return null;
};

export default DynamicTitle;
