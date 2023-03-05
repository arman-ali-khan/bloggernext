import React from 'react';

const Sidebar = () => {
    return (
        <div className=' hidden fixed left-0 top-16'>
            <div className="drawer ">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content"></div>
  <div className="drawer-side">
    <label htmlFor="my-drawer" className="drawer-overlay"></label>
    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
      {/* <!-- Sidebar content here --> */}
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
      
    </ul>
  </div>
</div>
        </div>
    );
};

export default Sidebar;