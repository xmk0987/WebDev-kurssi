/** @format
 * Copy paste your code from the RequestStatus.jsx file here from the previous exercise
 *
 * BEWARE: No props are passed to this component from now on. Instead, all the data is fetched and updated in the redux store.
 */
import { useSelector } from "react-redux";

export const RequestStatus = () => {
	const status = useSelector(state => state.status)
  
  
	return (
		<div>
			<h3>Request Status</h3>
			<p id="request-status">{status}</p>
		</div>
	);

  };
  