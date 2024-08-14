'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredData } from '@/redux/slices/cars';

const ResultPage = () => {
  const { type, year } = useParams();
  const dispatch = useDispatch();
  const { filteredData, loading, error } = useSelector((state) => state.cars);

  const vehicleResults = filteredData?.Results || [];

  useEffect(() => {
    if (type && year) {
      dispatch(getFilteredData({ makeId: type, year }));
    }
  }, [type, year, dispatch]);

  if (loading) {
    return <p className="text-center text-xl">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="p-4">
      {vehicleResults.length === 0 ? (
        <p className="text-center">No data</p>
      ) : (
        <ul className="space-y-4">
          {vehicleResults.map((car, index) => (
            <li key={index} className="p-4 border border-gray-300 rounded-lg shadow-md">
              <p>{car.ModelName}</p>
              <p>Make: {car.MakeName}</p>
              <p>Year: {car.ModelYear}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResultPage;
