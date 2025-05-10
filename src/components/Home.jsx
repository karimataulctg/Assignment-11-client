import React from 'react';
import Slider from './Slider';
import BookCategories from '../pages/BookCategories ';
import ExampleComponent from './ExampleComponent ';
import FeaturesBook from '../pages/FeaturesBook';
import LibraryServices from '../pages/LibraryServices';
import Reviews from '../pages/Reviews';
import { useTheme } from './ThemeContext';

const Home = () => {
    const { isDarkMode } = useTheme();
    return (
        <div className={` ${isDarkMode ? "bg-gray-800" : "bg-blue-50"}`} >
            <ExampleComponent></ExampleComponent>
            {/* <h1 className='text-4xl'>Welcome to Library Management System</h1> */}
            <Slider></Slider>
            <BookCategories></BookCategories>
            <FeaturesBook></FeaturesBook>
            <LibraryServices></LibraryServices>
            <Reviews></Reviews>
        </div>
    );
};

export default Home;