import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button } from 'primereact/button';
import { CheckDuplicate } from 'components/CheckDuplicate';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import { Password } from 'primereact/password';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';
import useAuth from 'hooks/useAuth';

import useAddPage from 'hooks/useAddPage';
const RegisterPage = (props) => {
    const auth = useAuth();
    const app = useApp();

    //form validation rules
    const validationSchema = yup.object().shape({
        username: yup.string().required().label("Username"),
        email: yup.string().email().required().label("Email"),
        password: yup.string().required().label("Password"),
        confirm_password: yup.string().required().label("Confirm Password").oneOf([yup.ref('password')], "le mot de password n'est pas identique")
    });

    //form default values
    const formDefaultValues = {
        username: '',
        email: '',
        password: '',
        confirm_password: '',
    }

    //page hook where logics resides
    const pageController = useAddPage({ props, formDefaultValues, afterSubmit });

    // destructure and grab what the page needs
    const { formData, resetForm, handleSubmit, submitForm, pageReady, loading, saving, inputClassName } = pageController;

    //event raised after form submit
    function afterSubmit(response) {
        app.flashMsg(props.msgTitle, props.msgAfterSave);
        resetForm();
        console.log("voici les next pages " + response.nextpage);
        const nextPage = response.nextpage || '/accueil';
        if (response.token) {
            auth.login(response.token, false);
            app.navigate(nextPage);
        }
        else {
            app.navigate(nextPage);
        }
    }

    // page loading form data from api
    if (loading) {
        return (
            <div className="p-3 text-center">
                <ProgressSpinner style={{ width: '50px', height: '50px' }} />
            </div>
        );
    }

    //page has loaded any required data and ready to render
    if (pageReady) {
        return (
            <main id="UsersUserregisterPage" className="main-page screen-h flex justify-content-center align-items-center">
               <div>
               {(props.showHeader) &&
                    <section className="page-section mb-3 mb-3" >
                        <div className="container-fluid">
                            <div className="grid d-flex justify-content-center align-items-center">
                                <div className="col-6 " >
                                    <div className="card text-center flex justify-content-between align-items-center">
                                        <Title title="Portail d'inscription" titleClass="text-2xl text-primary font-bold text-center" subTitleClass="text-500" iconClass="pi pi-user-edit" avatarSize="large" avatarClass="text-lg text-2xl" separator={false} />
                                        <Link to="/">
                                            <Button icon="pi pi-user" label="Connexion" className="p-button-success" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                }
                <section className="page-section " >
                    <div className="container-fluid">
                        <div className="grid d-flex justify-content-center align-items-center">
                            <div className="col-6 comp-grid" >
                                <div className="card ">
                                    <section className="page-section mb-3" >
                                        <div className="container-fluid">
                                            <div className="grid d-flex justify-content-center align-items-center">
                                                <div className="sm:col-12 comp-grid" >
                                                    <div className="d-flex justify-content-center align-items-center">
                                                        <div className="flex justify-content-center align-items-center">
                                                            <img src="/images/stepchu.svg" style={{ maxWidth: '100%' }} />
                                                        </div>
                                                        <div className="flex justify-content-center align-items-center">
                                                            <img src="/images/locker.svg" style={{ maxWidth: '100%' }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <div >
                                        <Formik initialValues={formData} validationSchema={validationSchema} onSubmit={(values, actions) => submitForm(values)}>
                                            {(formik) =>
                                                <>
                                                    <Form >
                                                        <div className="grid">
                                                            <div className="col-12">
                                                                <div className="formgrid grid">
                                                                    {/* <div className="col-12 md:col-3">
                                                                        Nom d'utilisateur *
                                                                    </div> */}
                                                                    <div className="col-12 ">
                                                                        <CheckDuplicate value={formik.values.username} apiPath="components_data/users_username_exist">
                                                                            {(checker) =>
                                                                                <>
                                                                                    <InputText name="username" onBlur={checker.check} onChange={formik.handleChange} value={formik.values.username} label="Username" type="text" placeholder="Nom d'utilisateur" className={inputClassName(formik?.errors?.username)} />
                                                                                    <ErrorMessage name="username" component="span" className="p-error" />
                                                                                    {(!checker.loading && checker.exist) && <small className="p-error">Indisponible</small>}
                                                                                    {checker.loading && <small className="text-500">Checking...</small>}
                                                                                </>
                                                                            }
                                                                        </CheckDuplicate>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="formgrid grid">
                                                                    {/* <div className="col-12 md:col-3">
                                                                        E-mail *
                                                                    </div> */}
                                                                    <div className="col-12 ">
                                                                        <CheckDuplicate value={formik.values.email} apiPath="components_data/users_email_exist">
                                                                            {(checker) =>
                                                                                <>
                                                                                    <InputText name="email" onBlur={checker.check} onChange={formik.handleChange} value={formik.values.email} label="Email" type="email" placeholder="exemple@domain.xyz" className={inputClassName(formik?.errors?.email)} />
                                                                                    <ErrorMessage name="email" component="span" className="p-error" />
                                                                                    {(!checker.loading && checker.exist) && <small className="p-error">Indisponible</small>}
                                                                                    {checker.loading && <small className="text-500">Checking...</small>}
                                                                                </>
                                                                            }
                                                                        </CheckDuplicate>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="formgrid grid">
                                                                    {/* <div className="col-12 md:col-3">
                                                                        Mot de passe *
                                                                    </div> */}
                                                                    <div className="col-12 ">
                                                                        <Password name="password" value={formik.values.password} onChange={formik.handleChange} label="Password" placeholder="DExLwe5xe6wx9" inputClassName="w-full" toggleMask feedback className={inputClassName(formik?.errors?.password)} />
                                                                        <ErrorMessage name="password" component="span" className="p-error" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="formgrid grid">
                                                                    {/* <div className="col-12 md:col-3">
                                                                        Confirmer le mot de passe *
                                                                    </div> */}
                                                                    <div className="col-12 ">
                                                                        <Password name="confirm_password" id="confirm_password" className={inputClassName(formik?.errors?.comfirm_password)} inputClassName="w-full" feedback={false} toggleMask value={formik.values.confirm_password} onChange={formik.handleChange} label="Confirmez le mot de passe" placeholder="Confirmez le mot de passe" />
                                                                        <ErrorMessage name="confirm_password" component="span" className="p-error" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {props.showFooter &&
                                                            <div className="text-center my-3">
                                                                <Button onClick={(e) => handleSubmit(e, formik)} className="p-button-primary" type="submit" label="Soumettre" icon="pi pi-send" loading={saving} />
                                                            </div>
                                                        }
                                                    </Form>
                                                </>
                                            }
                                        </Formik>
                                    </div>
                                    <Button onClick={() => app.navigate(-1)} label="" className="p-button p-button-text " icon="pi pi-arrow-left" />

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
               </div>
            </main>
        );
    }
}

//page props and default values
RegisterPage.defaultProps = {
    primaryKey: 'id',
    pageName: 'users',
    apiPath: 'backuser',
    routeName: 'usersuserregister',
    submitButtonLabel: "S'inscrire",
    formValidationError: "Le formulaire est invalide",
    formValidationMsg: "Veuillez remplir le formulaire",
    msgTitle: "Créer un enregistrement",
    msgAfterSave: "Enregistrement ajouté avec succès",
    msgBeforeSave: "",
    showHeader: true,
    showFooter: true,
    redirect: true,
    isSubPage: false
}
export default RegisterPage;
