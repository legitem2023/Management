import { useState } from 'react';
import FAQ from '../ManagmentSettings/FAQ';
import Privacy from '../ManagmentSettings/Privacy';
import About from '../ManagmentSettings/About';
import Disclaimer from '../ManagmentSettings/Disclaimer';
import CPBSettings from '../ManagmentSettings/CPBSettings';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('About');

  // Define the content for each tab
  const tabContent = {
    About: (<About/>),
    Disclaimer: (<Disclaimer/>),
    Privacy: (<Privacy/>),
    FAQ: (<FAQ/>),
    Category:(<CPBSettings/>)
  };

  // Handle tab switching
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      {/* Tab navigation */}
      <div className="tabs">
        {Object.keys(tabContent).map((tab) => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="tab-content">
        <div>{tabContent[activeTab]}</div>
      </div>

      {/* <style jsx>{`
        .tabs {
          display: flex;
          margin-bottom: 20px;
        }
        .tab {
          flex:1;
          padding: 10px 20px;
          margin-right: 10px;
          cursor: pointer;
          background-color: #f0f0f0;
          border: none;
          border-bottom: 2px solid transparent;
        }
        .tab.active {
          border-bottom: 2px solid #0070f3;
          font-weight: bold;
        }
        .tab-content {
          padding: 10px;
          background-color: #f9f9f9;
          border: 1px solid #eaeaea;
        }
      `}</style> */}
    </div>
  );
};

export default Tabs;
