import { useState } from 'react';
import FAQ from '../ManagmentSettings/FAQ';
import Privacy from '../ManagmentSettings/Privacy';
import About from '../ManagmentSettings/About';
import Disclaimer from '../ManagmentSettings/Disclaimer';
import CPBSettings from '../ManagmentSettings/CPBSettings/CPBSettings';

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
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
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
      <div className="tab-content">
        <div>{tabContent[activeTab]}</div>
      </div>
    </div>
  );
};

export default Tabs;
