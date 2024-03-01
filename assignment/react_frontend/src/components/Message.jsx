import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RESET } from '../redux/actions/actionTypes';
import { dataTestIds } from '../tests/constants/components';

export function Message() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        dispatch({ type: RESET });
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [notification.message]);

  return (
    (notification.message ?
      <div className={`message-container mg-bot-1 ${notification.error ? 'red' : 'green'}`} data-testid="notifications-container">
        <p data-testid={`${notification.error === true
          ? dataTestIds.notificationId.error(notification.stateType)
          : notification.error === false ? dataTestIds.notificationId.success(notification.stateType)
            : dataTestIds.notificationId.loading(notification.stateType)}`}>{notification.message}</p>
      </div> : <div data-testid="empty-container"></div>)
  );
}