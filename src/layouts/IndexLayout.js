import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

const IndexLayout = () => {

	const appName = process.env.REACT_APP_NAME;
	return (
		<div>
			{/* <div className="layout-topbar  bg-white shadow-3  ">
				<Link to="/" className="layout-topbar-logo">
					<img src="/images/logo.png" alt="logo" className="my-1" />

				</Link>
			</div> */}
			<div className="layout-main-container  ">
				<div className="layout-main ">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
export default IndexLayout;
