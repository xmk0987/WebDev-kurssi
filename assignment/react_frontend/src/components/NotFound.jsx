import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export const NotFound = () => {

  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();

  console.log("tullaan tänne");
  useEffect(() => {
    if (user.role === 'admin' || user.role === 'customer') {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [user.role]);

  return (
    <div>Page not found</div>
  );
};
