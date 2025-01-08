/**
 * @Category React Hook function
 * Provide single source to manage application static menus items
 * 
**/


export default function useMenus() {
    
    
    return {
	navbarTopRight: [],
	navbarTopLeft: [],
	navbarSideLeft: [
  {
    "to": "/accueil",
    "label": "Tableau de bord",
    "icon": "pi pi-th-large",
    "iconcolor": "",
    "target": "",
  },
  {
    "to": "/users",
    "label": "Utilisateurs",
    "icon": "pi pi-users",
    "iconcolor": "",
    "target": "_self",
  },
  {
    "to": "/categories",
    "label": "Catégories",
    "icon": "pi pi-list",
    "iconcolor": "",
    "target": "",
  },
  {
    "to": "/posts",
    "label": "Articles",
    "icon": "pi pi-book",
    "iconcolor": "",
    "target": "",
  },
  {
    "to": "/steps",
    "label": "Statistiques",
    "icon": "pi pi-chart-line",
    "iconcolor": "",
    "target": "",
  },
  {
    "to": "/roles",
    "label": "Roles",
    "icon": "pi pi-verified",
    "iconcolor": "",
    "target": "",
  },
  {
    "to": "/permissions",
    "label": "Peremessions",
    "icon": "pi pi-unlock",
    "iconcolor": "",
    "target": "",
  }
],
	stepsListsort: [{"label":"Id","value":"id"},{"label":"Numbre de pas","value":"count_steps"},{"label":"Participant","value":"employee_id"},{"label":"Date d'enregistrement","value":"createdat"}],
        exportFormats: {
            print: {
                label: 'Print',
                icon: 'pi pi-print',
                type: 'print',
                ext: '',
            },
            pdf: {
                label: 'Pdf',
                icon: 'pi pi-file-pdf',
                type: 'pdf',
                ext: 'pdf',
            },
            excel: {
                label: 'Excel',
                icon: 'pi pi-file-excel',
                type: 'excel',
                ext: 'xlsx',
            },
            csv: {
                label: 'Csv',
                icon: 'pi pi-table',
                type: 'csv',
                ext: 'csv',
            },
        },
    }
}