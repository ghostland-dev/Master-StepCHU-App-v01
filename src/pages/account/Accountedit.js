import { Formik, Form, ErrorMessage } from 'formik';
import { useLocation } from 'react-router-dom';
import * as yup from 'yup';
import { Button } from 'primereact/button';
import { DataSource } from 'components/DataSource';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { PageRequestError } from 'components/PageRequestError';
import { ProgressSpinner } from 'primereact/progressspinner';
import useApp from 'hooks/useApp';

import useEditPage from 'hooks/useEditPage';
const UsersAccounteditPage = (props) => {
    const app = useApp();
    const location = useLocation();
    // form validation schema
    const validationSchema = yup.object().shape({
        username: yup.string().nullable().label("Username"),
        user_role_id: yup.string().nullable().label("User Role Id")
    });
    // form default values
    const formDefaultValues = {
        username: '',
        user_role_id: '',
    }
    //where page logics resides
    const pageController = useEditPage({ props, formDefaultValues, afterSubmit });
    //destructure and grab what we need
    const { formData, handleSubmit, submitForm, pageReady, loading, saving, apiRequestError, inputClassName } = pageController
    //Event raised on form submit success
    function afterSubmit(response) {
        app.flashMsg(props.msgTitle, props.msgAfterSave);
        window.location.reload();
    }
    // loading form data from api
    if (loading) {
        return (
            <div className="p-3 text-center">
                <ProgressSpinner style={{ width: '50px', height: '50px' }} />
            </div>
        );
    }
    //display error page 
    if (apiRequestError) {
        return (
            <PageRequestError error={apiRequestError} />
        );
    }
    //page is ready when formdata loaded successfully
    if (pageReady) {
        return (
            <main id="UsersAccounteditPage" className="main-page">
                <section className="page-section " >
                    <div className="container">
                        <div className="grid ">
                            <div className="md:col-9 sm:col-12 comp-grid" >
                                <div >
                                    <Formik
                                        initialValues={formData}
                                        validationSchema={validationSchema}
                                        onSubmit={(values, actions) => {
                                            submitForm(values);
                                        }
                                        }
                                    >
                                        {(formik) => {
                                            return (
                                                <Form className={`${!props.isSubPage ? 'card  ' : ''}`}>
                                                    <div className="grid">
                                                        <div className="col-12">
                                                            <div className="formgrid grid">
                                                                <div className="col-12 md:col-3">
                                                                    Nom d'utilisateur
                                                                </div>
                                                                <div className="col-12 md:col-9">
                                                                    <InputText name="username" onChange={formik.handleChange} value={formik.values.username} label="Username" type="text" placeholder="Entrer Username" className={inputClassName(formik?.errors?.username)} />
                                                                    <ErrorMessage name="username" component="span" className="p-error" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="formgrid grid">
                                                                <div className="col-12 md:col-3">
                                                                    Role
                                                                </div>
                                                                <div className="col-12 md:col-9">
                                                                    <DataSource apiPath="backuser"  >
                                                                        {

                                                                            ({ response }) =>
                                                                                <>
                                                                                    <Dropdown name="user_role_id" optionLabel="label" optionValue="value" value={formik.values.user_role_id} onChange={formik.handleChange} options={response} label="User Role Id" placeholder="Sélectionnez une valeur" className={inputClassName(formik?.errors?.user_role_id)} />
                                                                                    <ErrorMessage name="user_role_id" component="span" className="p-error" />
                                                                                </>
                                                                        }
                                                                    </DataSource>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {props.showFooter &&
                                                        <div className="text-center my-3">
                                                            <Button onClick={(e) => handleSubmit(e, formik)} type="submit" label="Mettre à jour" icon="pi pi-send" loading={saving} />
                                                        </div>
                                                    }
                                                </Form>
                                            );
                                        }
                                        }
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        );
    }
}
UsersAccounteditPage.defaultProps = {
    primaryKey: 'id',
    pageName: 'backuser',
    apiPath: 'backuser',
    routeName: 'usersaccountedit',
    submitButtonLabel: "Mettre à jour",
    formValidationError: "Le formulaire est invalide",
    formValidationMsg: "Veuillez remplir le formulaire",
    msgTitle: "Mettre à jour l'enregistrement",
    msgAfterSave: "Enregistrement mis à jour avec succès",
    msgBeforeSave: "",
    showHeader: true,
    showFooter: true,
    redirect: true,
    isSubPage: false
}
export default UsersAccounteditPage;
