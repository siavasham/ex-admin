import React, { useState, useEffect } from "react";
import { t } from "locales";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

export default function ({ tabs, selected = '' }) {
  const [wizard, setWizard] = useState(selected);
  
  return (
    <div className="p-2">
      <Tabs
        className="admin-tabs"
        activeKey={wizard}
        onSelect={(e) => setWizard(e)}
      >
        {Object.keys(tabs).map(tab=>
        <Tab eventKey={tab} title={t(tab)} >
          <div className="p-4 mt-2">
            {tabs[tab]}
          </div>
        </Tab>
        )}
      </Tabs>
    </div>
  );
}
