import React from 'react';
import Slider from './Slider';
import BookCategories from '../pages/BookCategories ';
import ExampleComponent from './ExampleComponent ';
import FeaturesBook from '../pages/FeaturesBook';
import LibraryServices from '../pages/LibraryServices';

const Home = () => {
    return (
        <div>
            <ExampleComponent></ExampleComponent>
            {/* <h1 className='text-4xl'>Welcome to Library Management System</h1> */}
            <Slider></Slider>
            <BookCategories></BookCategories>
            <FeaturesBook></FeaturesBook>
            <LibraryServices></LibraryServices>
        </div>
    );
};

export default Home;