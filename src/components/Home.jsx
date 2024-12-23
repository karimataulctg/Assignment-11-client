import React from 'react';
import Slider from './Slider';

import BookCategories from '../pages/BookCategories ';

import BookDetails from '../pages/BookDetails';
import ExampleComponent from './ExampleComponent ';

const Home = () => {
    return (
        <div>
            <ExampleComponent></ExampleComponent>
            {/* <h1 className='text-4xl'>Welcome to Library Management System</h1> */}
            <Slider></Slider>
            <BookCategories></BookCategories>
            <BookDetails></BookDetails>
        </div>
    );
};

export default Home;