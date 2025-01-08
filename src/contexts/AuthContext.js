import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStore from 'hooks/useLocalStore';
import useApi from 'hooks/useApi';
import useUtils from 'hooks/useUtils';
import { constants } from "constants/utils";
import { jwtDecode } from "jwt-decode";


const publicPages = ['/', 'index', 'error']; //public pages which do not need authentication

const roleAbilities = {
	"admin": [],
	"user": []
};
const AuthContext = createContext();

export function AuthProvider({ children }) {
	const api = useApi();
	const utils = useUtils();
	const localStore = useLocalStore();
	const navigate = useNavigate();

	const [user, setUser] = useState(null);
	const [userName, setUserName] = useState('');
	const [userId, setUserId] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [userPhoto, setUserPhoto] = useState('');
	const [userPhone, setUserPhone] = useState('');
	const [userRole, setUserRole] = useState('');
	const [userPages, setUserPages] = useState([]);

	const accessToken = localStore.getToken();
	const [isLoggedIn, setIsLoggedIn] = useState(accessToken ? true : false);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getUserData();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [accessToken]);

	async function getUserData() {
		try {
			if (accessToken) {
				const response = await api.get(`${process.env.REACT_APP_API_PATH}backuser/1`);
				const apiData = response?.data;
				const userData = jwtDecode(accessToken);
				const userRoleName = userData.roles.includes('ROLE_ADMIN') ? 'admin' : 'user';

				setIsLoggedIn(true);
				setLoading(true);
				setUser(userData);
				setUserPages(apiData.pages);
				setUserName(userData.username);
				setUserId(userData.id);
				setUserEmail(userData.email);
				setUserPhoto(null);
				setUserPhone(null);
				setUserRole(userRoleName);
			} else {
				setIsLoggedIn(false);
			}
		}
		catch (e) {
			console.error("Error fetching user data:", e);
			setError("Unable to get user data");
			setIsLoggedIn(false); // Set isLoggedIn to false on error
			logout(); // Call logout to clear any potentially corrupted state
		}
		finally {
			setLoading(false);
		}
	}


	async function login(token) {
		localStore.saveLoginData({ token });
		setIsLoggedIn(true);
	}

	async function logout(returnUrl = null) {
		localStore.removeLoginData();
		setUser(null);
		setIsLoggedIn(false);
		setLoading(true);
		if (returnUrl) {
			navigate(`/?redirect=${returnUrl}`);
		} else {
			navigate('/');
		}
	}

	async function pageRequiredAuth(path) {
		const { pageName, routePath } = utils.parseRoutePath(path);
		return !publicPages.includes(pageName) && !publicPages.includes(routePath);
	}

	async function canView(path) {
		const { routePath } = utils.parseRoutePath(path);

		return constants.includes(routePath);
	}

	async function canManage(page, userRecId) {
		if (userRole) {
			let userRoleAbilities = roleAbilities[userRole.toLowerCase()] || [];
			if (userRoleAbilities.includes(page)) {
				return true;
			}
		}
		return userRecId === 1; // Fix comparison operator
	}

	async function isOwner(userRecId) {
		if (user) {
			return userRecId === 1; // Fix comparison operator
		}
		return false;
	}


	const isAdmin = userRole.toLowerCase() === 'admin';

	const isUser = userRole.toLowerCase() === 'user';


	const providerValue = {
		user,
		userName,
		userId,
		userEmail,
		userPhone,
		userPhoto,
		userRole,
		loading,
		isLoggedIn,
		accessToken,
		error,
		getUserData,
		pageRequiredAuth,
		login,
		logout,
		canView,
		canManage,
		isOwner,
		isAdmin,
		isUser
	};

 

	return (
		<AuthContext.Provider value={providerValue}>
			{children}
		</AuthContext.Provider>
	);
}

export { AuthContext };
