import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { BsExclamation } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";

const ErrorPage = () => {
     const error = useRouteError();

     let message = "Something went wrong";
     if (isRouteErrorResponse(error)) {
          if (error.status === 404) {
               message = "This page doesn't exist!";
          }

          if (error.status === 401) {
               message = "You aren't authorized to see this";
          }

          if (error.status === 503) {
               message = "Looks like our API is down";
               return <div></div>;
          }

          if (error.status === 418) {
               message = "🫖";
          }
     }


     return (
          <div className="auth-layout-container">
               <div className="card">

                    <div className="close-icon">
                         <MdOutlineClose />
                    </div>
                    <div className="success-container">
                         <div className="success-header-wrapper">
                              {/*<img src={FrimiLogo} alt="" />*/}
                         </div>

                         <div className="success-body-wrapper">
                              <div className="success-right-icon">
                                   <BsExclamation />
                              </div>

                              <div className="success-main-title">Oops!</div>

                              <div className="success-sub-title">
                                   <p>{message}</p>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );

};
export default ErrorPage;
