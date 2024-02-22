import React, {useEffect} from "react";

import { useDispatch, useSelector } from "react-redux";
import {RESET} from '../redux/actions/actionTypes';

export function Message() {
  const dispatch = useDispatch();

  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch({ type: RESET });
    }, 5000);

    return () => clearTimeout(timeout);
  }, [dispatch]);


  return (
    <div className={`${notification.message.length === 0 ? 'no-display' : 'message-container'} mg-bot-1 ${notification.error ? 'red' : 'green'}`} data-testid="notifications-container">
      <p>{notification.message}</p>
    </div>
  );
}
