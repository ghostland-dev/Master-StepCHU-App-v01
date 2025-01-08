import { Routes, Route, Navigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';

import IndexLayout from 'layouts/IndexLayout';
import MainLayout from 'layouts/MainLayout';
import AuthRoutes from 'components/AuthRoutes';
import IndexPage from 'pages/index/IndexPage';
import CategoriesList from 'pages/categories/List';
import CategoriesView from 'pages/categories/View';
import CategoriesAdd from 'pages/categories/Add';
import CategoriesEdit from 'pages/categories/Edit';
import PermissionsList from 'pages/permissions/List';
import PermissionsView from 'pages/permissions/View';
import PermissionsAdd from 'pages/permissions/Add';
import PermissionsEdit from 'pages/permissions/Edit';
import PostsList from 'pages/posts/List';
import PostsView from 'pages/posts/View';
import PostsAdd from 'pages/posts/Add';
import PostsEdit from 'pages/posts/Edit';
import RolesList from 'pages/roles/List';
import RolesView from 'pages/roles/View';
import RolesAdd from 'pages/roles/Add';
import RolesEdit from 'pages/roles/Edit';
import StepsList from 'pages/steps/List';
import StepsView from 'pages/steps/View';
import StepsAdd from 'pages/steps/Add';
import StepsEdit from 'pages/steps/Edit';
import UsersList from 'pages/users/List';
import UsersView from 'pages/users/View';
import UsersAdd from 'pages/users/Add';
import UsersEdit from 'pages/users/Edit';
import AccountPages from 'pages/account';
import HomePage from './pages/home/HomePage';
import IndexPages from './pages/index';
import ErrorPages from './pages/errors';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'assets/styles/layout.scss';
const App = () => {
	const auth = useAuth();
	function DefaultPage() {
		if (!auth.isLoggedIn) {
			return <IndexPage />
		}
		return <Navigate to="/accueil" replace />;
	}
	return (
		<Routes>
			<Route exact element={<AuthRoutes />}>
				<Route element={<MainLayout />}>
					<Route path="/accueil" element={<HomePage />} />


					{/* categories pages routes */}
					<Route path="/categories" element={<CategoriesList />} />
					<Route path="/categories/:fieldName/:fieldValue" element={<CategoriesList />} />
					<Route path="/categories/index/:fieldName/:fieldValue" element={<CategoriesList />} />
					<Route path="/categories/view/:pageid" element={<CategoriesView />} />
					<Route path="/categories/add" element={<CategoriesAdd />} />
					<Route path="/categories/edit/:pageid" element={<CategoriesEdit />} />

					{/* permissions pages routes */}
					<Route path="/permissions" element={<PermissionsList />} />
					<Route path="/permissions/:fieldName/:fieldValue" element={<PermissionsList />} />
					<Route path="/permissions/index/:fieldName/:fieldValue" element={<PermissionsList />} />
					<Route path="/permissions/view/:pageid" element={<PermissionsView />} />
					<Route path="/permissions/add" element={<PermissionsAdd />} />
					<Route path="/permissions/edit/:pageid" element={<PermissionsEdit />} />

					{/* posts pages routes */}
					<Route path="/posts" element={<PostsList />} />
					<Route path="/posts/:fieldName/:fieldValue" element={<PostsList />} />
					<Route path="/posts/index/:fieldName/:fieldValue" element={<PostsList />} />
					<Route path="/posts/view/:pageid" element={<PostsView />} />
					<Route path="/posts/add" element={<PostsAdd />} />
					<Route path="/posts/edit/:pageid" element={<PostsEdit />} />

					{/* roles pages routes */}
					<Route path="/roles" element={<RolesList />} />
					<Route path="/roles/:fieldName/:fieldValue" element={<RolesList />} />
					<Route path="/roles/index/:fieldName/:fieldValue" element={<RolesList />} />
					<Route path="/roles/view/:pageid" element={<RolesView />} />
					<Route path="/roles/add" element={<RolesAdd />} />
					<Route path="/roles/edit/:pageid" element={<RolesEdit />} />

					{/* steps pages routes */}
					<Route path="/steps" element={<StepsList />} />
					<Route path="/steps/:fieldName/:fieldValue" element={<StepsList />} />
					<Route path="/steps/index/:fieldName/:fieldValue" element={<StepsList />} />
					<Route path="/steps/view/:pageid" element={<StepsView />} />
					<Route path="/steps/add" element={<StepsAdd />} />
					<Route path="/steps/edit/:pageid" element={<StepsEdit />} />

					{/* users pages routes */}
					<Route path="/users" element={<UsersList />} />
					<Route path="/users/:fieldName/:fieldValue" element={<UsersList />} />
					<Route path="/users/index/:fieldName/:fieldValue" element={<UsersList />} />
					<Route path="/users/view/:pageid" element={<UsersView />} />
					<Route path="/users/add" element={<UsersAdd />} />
					<Route path="/users/edit/:pageid" element={<UsersEdit />} />
					<Route path="/account/*" element={<AccountPages />} />
				</Route>
			</Route>
			<Route exact element={<IndexLayout />}>
				<Route path="/" element={<DefaultPage />} />
				<Route path="/*" element={<IndexPages />} />
				<Route path="/error/*" element={<ErrorPages />} />
			</Route>
		</Routes>
	);
}
export default App;
