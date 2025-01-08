import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { PageRequestError } from 'components/PageRequestError';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import CategoriesEditPage from 'pages/categories/Edit';
import useApp from 'hooks/useApp';
import useAuth from 'hooks/useAuth';

import useViewPage from 'hooks/useViewPage';
const CategoriesViewPage = (props) => {
	const auth = useAuth();
	const app = useApp();
	const pageController = useViewPage(props);
	const { item, pageReady, loading, apiRequestError, deleteItem } = pageController;
	function ActionButton(data) {
		const items = [
			{
				label: "Edit",
				command: (event) => { app.openPageDialog(<CategoriesEditPage isSubPage apiPath={`/category/${data.id}`} />, { closeBtn: true }) },
				icon: "pi pi-pencil",
				visible: () => auth.canView('category')
			},
			{
				label: "Delete",
				command: (event) => { deleteItem(data.id) },
				icon: "pi pi-trash",
				visible: () => auth.canView('category')
			}
		]
			.filter((item) => {
				if (item.visible) {
					return item.visible()
				}
				return true;
			});
		return (<Menubar className="p-0 " model={items} />);
	}
	function PageFooter() {
		if (props.showFooter) {
			return (
				<div className="flex justify-content-between">
					<div className="flex justify-content-start">
						{ActionButton(item)}
					</div>
				</div>
			);
		}
	}
	if (loading) {
		return (
			<div className="p-3 text-center">
				<ProgressSpinner style={{ width: '50px', height: '50px' }} />
			</div>
		);
	}
	if (apiRequestError) {
		return (
			<PageRequestError error={apiRequestError} />
		);
	}
	if (pageReady) {
		return (
			<div>
				<main id="CategoriesViewPage" className="main-page">
					{(props.showHeader) &&
						<section className="page-section mb-3" >
							<div className="container">
								<div className="grid justify-content-between align-items-center">
									{!props.isSubPage &&
										<div className="col-fixed " >
											<Button onClick={() => app.navigate(-1)} label="" className="p-button p-button-text " icon="pi pi-arrow-left" />
										</div>
									}
									<div className="col " >
										<Title title="Détails de categorie" titleClass="text-2xl text-primary font-bold" subTitleClass="text-500" separator={false} />
									</div>
								</div>
							</div>
						</section>
					}
					<section className="page-section " >
						<div className="container">
							<div className="grid ">
								<div className="col comp-grid" >
									<div >
										{/*PageComponentStart*/}
										<div className="mb-3 grid ">
											<div className="col-12 md:col-4">
												<div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
													<div className="">
														<div className="text-400 font-medium mb-1">ID</div>
														<div className="font-bold">{item.data?.id}</div>
													</div>
												</div>
											</div>
											<div className="col-12 md:col-4">
												<div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
													<div className="">
														<div className="text-400 font-medium mb-1">Nom de catégorie</div>
														<div className="font-bold">{item.data?.name}</div>
													</div>
												</div>
											</div>
										</div>
										{/*PageComponentEnd*/}
									</div>
								</div>
							</div>
						</div>
					</section>
				</main>
				<PageFooter />
			</div>
		);
	}
}
CategoriesViewPage.defaultProps = {
	id: null,
	primaryKey: 'id',
	pageName: 'categories',
	apiPath: 'category',
	routeName: 'categoriesview',
	msgBeforeDelete: "Êtes-vous sûr de vouloir supprimer cet enregistrement?",
	msgTitle: "Supprimer l'enregistrement",
	msgAfterDelete: "Enregistrement supprimé avec succès",
	showHeader: true,
	showFooter: true,
	exportButton: true,
	isSubPage: false,
}
export default CategoriesViewPage;
