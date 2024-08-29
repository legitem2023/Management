import React from 'react'
import DataManager from 'utils/DataManager';

const TotalViews = () => {
    const Manager = new DataManager();
    const { NumberOFViews, LoadingNumberOFViews } = Manager.NumberOfViews();
    const { NumberOFVisits, LoadingNumberOFVisits } = Manager.WebsiteVisit();
    if(LoadingNumberOFViews) return 
    const totalsViews = NumberOFViews.getNumberOfViews.length;
  return (
    <div>{totalsViews}</div>
  )
}

export default TotalViews