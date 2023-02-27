import React, { useContext } from 'react';
import { contextProvider } from '../../context/AuthContext';

const Logout = () => {
    const {logOut,user} = useContext(contextProvider)
    const handleLogout = ()=>{
        logOut().catch(result=>{
          console.log(result)
        })
      }
    return (
        <div>


{/* Put this part before </body> tag */}
<input type="checkbox" id="logoutModal" className="modal-toggle" />
<label htmlFor="logoutModal" className="modal cursor-pointer">
  <label className="modal-box relative" htmlFor="">
    <h3 className="text-lg font-bold">Congratulations random Internet user!</h3>
    
    <div className='flex justify-end gap-4'>
    <label htmlFor="logoutModal" className='btn w-1/4'>Cancel</label>
    <label htmlFor="logoutModal" className='btn w-1/4 btn-error '  onClick={()=>handleLogout()}>Confirm</label>
    </div>
  </label>
</label>
        </div>
    );
};

export default Logout;