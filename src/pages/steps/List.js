import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { CanView } from 'components/Can';
import { Chart } from 'primereact/chart';
import { Column } from 'primereact/column';
import { DataSource } from 'components/DataSource';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { ExportPageData } from 'components/ExportPageData';
import { FilterTags } from 'components/FilterTags';
import { ImportPageData } from 'components/ImportPageData';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import { PageRequestError } from 'components/PageRequestError';
import { Paginator } from 'primereact/paginator';
import { ProgressSpinner } from 'primereact/progressspinner';
import { RecordCount } from 'components/RecordCount';
import { SplitButton } from 'primereact/splitbutton';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';
import useAuth from 'hooks/useAuth';
import useUtils from 'hooks/useUtils';

import useListPage from 'hooks/useListPage';
const StepsListPage = (props) => {
		const auth = useAuth();
	const app = useApp();
	const utils = useUtils();
	const filterSchema = {
		search: {
			tagTitle: "Search",
			value: '',
			valueType: 'single',
			options: [],
		}
	}
	const pageController = useListPage(props, filterSchema);
	const filterController = pageController.filterController;
	const { records, pageReady, loading, selectedItems, apiUrl, sortBy, sortOrder, apiRequestError, setSelectedItems, getPageBreadCrumbs, onSort, setSortBy, toggleSortType, deleteItem, pagination } = pageController;
	const { filters, setFilterValue } = filterController;
	const { totalRecords, totalPages, recordsPosition, firstRow, limit, onPageChange } =  pagination;
	function ActionButton(data){
		const items = [
		{
			label: "View",
			command: (event) => { app.navigate(`/steps/view/${data.id}`) },
			icon: "pi pi-eye",
			visible: () => auth.canView('steps/view')
		},
		{
			label: "Edit",
			command: (event) => { app.navigate(`/steps/edit/${data.id}`) },
			icon: "pi pi-pencil",
			visible: () => auth.canView('steps/edit')
		},
		{
			label: "Delete",
			command: (event) => { deleteItem(data.id) },
			icon: "pi pi-trash",
			visible: () => auth.canView('steps/delete')
		}
	]
	.filter((item) => {
		if(item.visible){
			return item.visible()
		}
		return true;
	});
		return (<SplitButton dropdownIcon="pi pi-bars" className="dropdown-only p-button-text p-button-plain" model={items} />);
	}
	function IdTemplate(data){
		if(data){
			return (
				<Link to={`/steps/view/${data.id}`}> { data.id }</Link>
			);
		}
	}
	function PageLoading(){
		if(loading){
			return (
				<>
					<div className="flex align-items-center justify-content-center text-gray-500 p-3">
						<div><ProgressSpinner style={{width:'30px', height:'30px'}} /> </div>
						<div  className="font-bold text-lg">Chargement...</div>
					</div>
				</>
			);
		}
	}
	function EmptyRecordMessage(){
		if(pageReady && !records.length){
			return (
				<div className="text-lg mt-3 p-3 text-center text-400 font-bold">
					Aucun Enregistrement Trouvé
				</div>
			);
		}
	}
	function MultiDelete() {
		if (selectedItems.length) {
			return (
				<div className="m-2 flex-grow-0">
					<Button onClick={() => deleteItem(selectedItems)} icon="pi pi-trash" className="p-button-danger" title="Supprimer sélectionnée"/>
				</div>
			)
		}
	}
	function ExportData() {
		if (props.exportData && records.length) {
			const downloadFileName = `${utils.dateNow()}-steps`;
			return (
				<div className="m-2">
					<ExportPageData  pageUrl={apiUrl} downloadFileName={downloadFileName} butonLabel="Exportation" tooltip="Exportation" buttonIcon="pi pi-print" />
				</div>
			);
		}
	}
	function ImportData() {
		if (props.importData) {
			return (
				<div className="m-2">
					<ImportPageData label="Sélectionnez le fichier à importer" uploadPath="steps/importdata" buttonIcon="pi pi-folder" buttonLabel="Importer des données" onImportCompleted={(response) => {app.flashMsg('Import Data', response, 'success')}} />
				</div>
			);
		}
	}
	function PagerControl() {
		if (props.paginate && totalPages > 1) {
		const pagerReportTemplate = {
			layout: pagination.layout,
			CurrentPageReport: (options) => {
				return (
					<>
						<span className="text-sm text-gray-500 px-2">Records <b>{ recordsPosition } sur { options.totalRecords }</b></span>
					</>
				);
			}
		}
		return (
			<div className="flex-grow-1">
				<Paginator first={firstRow} rows={limit} totalRecords={totalRecords}  onPageChange={onPageChange} template={pagerReportTemplate} />
			</div>
		)
		}
	}
	function PageActionButtons() {
		return (
			<div className="flex flex-wrap">
	<CanView pagePath="steps/delete">
		<MultiDelete />
	</CanView>
				<ExportData />
	<CanView pagePath="steps/importdata">
		<ImportData />
	</CanView>
			</div>
		);
	}
	function PageFooter() {
		if (pageReady && props.showFooter) {
			return (
				<div className="flex flex-wrap">
					<PageActionButtons />
					<PagerControl />
				</div>
			);
		}
	}
	function PageBreadcrumbs(){
		if(props.showBreadcrumbs) {
			const items = getPageBreadCrumbs();
			return (items.length > 0 && <BreadCrumb className="mb-3" model={items} />);
		}
	}
	if(apiRequestError){
		return (
			<PageRequestError error={apiRequestError} />
		);
	}
	return (
<main id="StepsListPage" className="main-page">
    { (props.showHeader) && 
    <section className="page-section mb-3" >
        <div className="container-fluid">
            <div className="grid justify-content-between align-items-center">
                <div className="col-sm-4 col-md-4 col-12 " >
                    <Title title="Actualité des changements"   titleClass="text-2xl text-primary font-bold text-emerald-400" subTitleClass="text-500"      separator={false} />
                </div>
                <div className="col-6  comp-grid" >
                    <RecordCount title="Participants" description="Total des utilisateurs" icon="pi pi-th-large" apiPath="backuser" link={`/users`} cardClass="my-2 bg-blue-100 text-blue-800" avatarClass="bg-blue-600 text-blue-100"   />
                    <RecordCount title="Articles" description="Total des articles" icon="pi pi-th-large" apiPath="post" link={`/posts`} cardClass="my-2 bg-blue-100 text-blue-800" avatarClass="bg-blue-600 text-blue-100"   />
                    <RecordCount title="Super Score" description="Total des pas" icon="pi pi-th-large" apiPath="backuser" link={`/steps`} cardClass="my-2 bg-blue-100 text-blue-800" avatarClass="bg-blue-600 text-blue-100"   />
                </div>
				<div className="sm:col-6 comp-grid" >
                            <div className="card  s">
                                <div className="q-pa-md">
                                    <div className="font-bold text-lg">Graphiques de (pas/jour)</div>
                                    <div className="text-500">un graphique qui expliques l'avancement</div>
                                    <hr />
                                    <div className="row q-col-gutter-sm">
                                        <div className="col">
                                            <DataSource apiPath="post"  >
                                                {
                                                    ({ response }) =>
                                                        <>
                                                            <Chart data={response.data} type="line" options={
                                                                {
                                                                    scales: {
                                                                        y: {
                                                                            title: {
                                                                                display: true,
                                                                                text: "Pas"
                                                                            }
                                                                        },
                                                                        x: {
                                                                            title: {
                                                                                display: true,
                                                                                text: "Date"
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            } />
                                                        </>
                                                }
                                            </DataSource>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                <div className="col-sm-4 col-md-4 col-12 " >
                    <Title title="Statistiques (number pas / utilisateur )"   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
                </div>
                <div className="col-sm-4 col-md-4 col-6 " >
                    <span className="p-input-icon-left w-full">
                    <i className="pi pi-search" />
                    <InputText placeholder="Chercher" className="w-full" value={filters.search.value}  onChange={(e) => setFilterValue('search', e.target.value)} />
                    </span>
                </div>
                <div className="col-sm-4 col-md-4 col-3 " >
                    <CanView pagePath="">
                        <Link to={`/steps/add`}>
                            <Button label="Ajouter une valeur manuellement" icon="pi pi-plus" type="button" className="p-button w-full bg-primary "  />
                            </Link>
                        </CanView>
                    </div>
                    <div className="col-sm-4 col-md-4 col-2 comp-grid" >
                        <div className="">
                            <div className="">
                                <div className="flex justify-content-center align-items-center">
                                    <div>
                                        <Dropdown value={sortBy} onChange={(e) => setSortBy(e.value)} optionLabel="label" optionValue="value" icon="pi pi-sort" options={app.menus.stepsListsort} placeholder="Trier par"  />
                                    </div>
                                    {/* icon={'pi pi-arrow-up': 
                                    pagination.descending, 'pi pi-arrow-down': 
                                    !pagination.descending}
                                    */ }
                                    { sortBy && <Button icon="pi pi-arrow-up" className="p-button-text" onClick={()=>toggleSortType()}>
                                    </Button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        }
        <section className="page-section " >
            <div className="container-fluid">
                <div className="grid ">
                    <div className="col comp-grid" >
                        <FilterTags filterController={filterController} />
                        <div >
                            <PageBreadcrumbs />
                            <div className="page-records">
                                <DataTable 
                                    lazy={true} 
                                    loading={loading} 
                                    selectionMode="checkbox" selection={selectedItems} onSelectionChange={e => setSelectedItems(e.value)}
                                    value={records} 
                                    dataKey="id" 
                                    sortField={sortBy} 
                                    sortOrder={sortOrder} 
                                    onSort={onSort}
                                    className=" p-datatable-sm" 
                                    stripedRows={true}
                                    showGridlines={false} 
                                    rowHover={true} 
                                    responsiveLayout="stack" 
                                    emptyMessage={<EmptyRecordMessage />} 
                                    >
                                    {/*PageComponentStart*/}
                                    <Column selectionMode="multiple" headerStyle={{width: '2rem'}}></Column>
                                    <Column  field="id" header="Id" body={IdTemplate} sortable={true} ></Column>
                                    <Column  field="count_steps" header="Count Steps"  sortable={true} ></Column>
                                    <Column  field="employee_id" header="Employee Id"  sortable={true} ></Column>
                                    <Column  field="createdat" header="Createdat"  sortable={true} ></Column>
                                    <Column headerStyle={{width: '2rem'}} headerClass="text-center" body={ActionButton}></Column>
                                    {/*PageComponentEnd*/}
                                </DataTable>
                            </div>
                            <PageFooter />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
	);
}
StepsListPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'steps',
	apiPath: 'post',
	routeName: 'stepslist',
	msgBeforeDelete: "Êtes-vous sûr de vouloir supprimer cet enregistrement?",
	msgTitle: "Supprimer l'enregistrement",
	msgAfterDelete: "Enregistrement supprimé avec succès",
	showHeader: true,
	showFooter: true,
	paginate: true,
	isSubPage: false,
	showBreadcrumbs: true,
	exportData: true,
	importData: true,
	keepRecords: false,
	multiCheckbox: true,
	search: '',
	fieldName: null,
	fieldValue: null,
	sortField: '',
	sortDir: '',
	pageNo: 1,
	limit: 10,
}
export default StepsListPage;
