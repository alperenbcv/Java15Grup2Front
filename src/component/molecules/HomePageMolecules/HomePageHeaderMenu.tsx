import React, { useState } from 'react';
import { RootState} from '../../../store';
import { setActivePage } from '../../../store/feature/pageSlice';
import { useDispatch, useSelector } from 'react-redux';
import './HomePageHeaderMenu.css'

function HomePageHeaderMenu() {
const activePage = useSelector((state: RootState)=>state.page.activePage);
 
  const getActive = (route: number|null) => {
    switch(route){
        case 1 : return  activePage === 'SUBSCRIPTION' ? { color: '#6a11cb', cursor: 'pointer' } : { color: 'white', cursor: 'pointer' } 
        case 2 : return activePage === 'PRODUCTS' ? { color: '#6a11cb', cursor: 'pointer' } : { color: 'white', cursor: 'pointer' }
        case 3 : return activePage === 'DEMO' ? { color: '#6a11cb', cursor: 'pointer' } : { color: 'white', cursor: 'pointer' }
        case 4 : return activePage === 'COMMENTS' ? { color: '#6a11cb', cursor: 'pointer' } : { color: 'white', cursor: 'pointer' }
    }
}
  return (
    <div className="col-8 d-flex justify-content-center">     
                  <a className="nav-link active menu-text" href="#" style={getActive(3)}>Demo</a>
                  <a className="nav-link active menu-text" href="/manager-dashboard" style={getActive(2)}>Products</a>
                  <a className="nav-link active menu-text" href="/subscription" style={getActive(1)}>Subscription</a>
                  <a className="nav-link active menu-text" href="#" style={getActive(4)}>Comments</a>                     
    </div>
  );
}

export default HomePageHeaderMenu;
