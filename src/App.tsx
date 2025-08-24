import React from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import FlightResults from './components/FlightResults';

const App = () => {
  return (
   <div className='main-h-screen bg-gray-100'>
       <Header />
       <main className='p-4'>
         <h2 className='text-xl font-semibold'>Welcome! Start searching for flights</h2>
         <SearchForm />
         <FlightResults />
       </main>
   </div>
  );
};

export default App;
