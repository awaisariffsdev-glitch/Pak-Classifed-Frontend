// ShowAllCars wrapper — renders CarBoardMain with showAll={true} to display every car on a dedicated page
import React from 'react';
import CarBoardMain from '../Components/CarBoardMain';

const ShowAllCars = () => {
    return <CarBoardMain showAll={true} />;
};

export default ShowAllCars;