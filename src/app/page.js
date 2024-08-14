'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '@/redux/slices/cars';
import { useRouter } from 'next/navigation';

const Home = () => {
  const dispatch = useDispatch();
  const { data: carsData, loading } = useSelector((state) => state.cars);
  const router = useRouter();

  const [selectedType, setSelectedType] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const isButtonEnabled = selectedType.length > 0 && selectedYear.length > 0;

  const vehicleResults = carsData?.Results || [];
  const currentYear = new Date().getFullYear();

  let years = [];

  for (let i = currentYear; i >= 2015; i--) {
    years.push(i);
  }

  const uniqueTypes = [...new Set(vehicleResults.map((vehicle) => vehicle.VehicleTypeId))];

  const handleClick = () => {
    if (selectedType && selectedYear) {
      router.push(`/result/${selectedType}/${selectedYear}`);
    }
  };

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const handleChangeType = (event) => {
    setSelectedType(event.target.value);
  };

  const handleChangeYear = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {loading ? (
        <p className="text-center text-xl text-gray-500">Loading...</p>
      ) : (
        <div className="flex flex-col space-y-4">
          {vehicleResults.length > 0 && (
            <div className="w-1/4 mx-auto">
              <select
                id="vehicleType"
                value={selectedType}
                onChange={handleChangeType}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select type of a car</option>
                {uniqueTypes.map((typeId) => (
                  <option key={typeId} value={typeId}>
                    {typeId}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="w-1/4 mx-auto">
            <select
              id="vehicleYear"
              value={selectedYear}
              onChange={handleChangeYear}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleClick}
            disabled={!isButtonEnabled}
            className={`font-bold rounded w-1/4 mx-auto h-10 ${
              isButtonEnabled
                ? 'bg-blue-500 hover:bg-blue-700 text-white cursor-pointer'
                : 'bg-red-500 text-white cursor-not-allowed opacity-75'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
