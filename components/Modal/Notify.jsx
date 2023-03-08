import React from 'react';

const Notify = () => {
    return (
        <div>
            {/* The button to open modal */}


{/* Put this part before </body> tag */}


<div className='mt-4'>




<input type="checkbox" id="notify" className="modal-toggle" />

<label htmlFor="notify" className="modal cursor-pointer flex-col bg-base-100">
<div>
<h3 className="text-lg font-bold">Notifications</h3>
<label htmlFor="notify" className="btn btn-sm  absolute right-4 bottom-2">Close</label>
</div>
  <label className="modal-box relative mb-9" htmlFor="">
   
    <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
    <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
    <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
    <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
    <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
    <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
    <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
    <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
    <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
  </label>
</label>
</div>
        </div>
    );
};

export default Notify;