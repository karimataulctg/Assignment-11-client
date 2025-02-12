import React from 'react';
import errorImage from '../assets/ErrorImage.jpeg';
import { Link } from 'react-router-dom';


const PageNotFound = () => {
    return (
        <div>
            <img src={errorImage} alt="Error, Page Not Found." />
            <Link to="/">
            <button className='btn btn-outline bg-yellow-500 font-bold my-4'> Go to Home..</button>
            </Link>
        </div>
    );
};

export default PageNotFound;