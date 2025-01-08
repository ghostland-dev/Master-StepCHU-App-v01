import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import * as yup from 'yup';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import { Message } from 'primereact/message';
import { Password } from 'primereact/password';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';
import useAuth from 'hooks/useAuth';
import usePostForm from 'hooks/usePostForm';

export default function IndexPage() {
    const auth = useAuth();
    const app = useApp();
    const [searchParams] = useSearchParams();
    const [pageReady, setPageReady] = useState(true);
    const [rememberUser, setRememberUser] = useState(false);
    const formUrl = "/login";
    const formData = {
        username: '',
        password: '',
    }
    const validationSchema = yup.object().shape({
        username: yup.string().required().label(`Email`),
        password: yup.string().required().label(`Mot de passe`),
    });
    function afterSubmit(loginData) {
        if (loginData.token) {
            auth.login(loginData.token);
            const returnUrl = searchParams.get('redirect') || '/accueil';
            app.navigate(returnUrl);
        }
        else if (loginData.nextpage) {
            app.navigate(loginData.nextpage);
        }
    }

    const form = {
        formUrl, formData, validationSchema, afterSubmit
    }
    const { loading, errorMsg, setErrorMsg, formik } = usePostForm(form);
    return (
        <main id="IndexPage" className="main-page">
            <section className="page-section mb-3 screen-h" >
                <div className="container-fluid justify-content-center align-items-center ">
                    <div className="grid flex flex-column justify-content-center align-items-center screen-h overflow-hidden">
                        <div className="mt-20 col-4 sm:col-3 lg:col-3 md:col-5 comp-grid" >
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
                                <div className="p-2 ">
                                    <div className="grid gap-3 align-items-center justify-content-center">
                                    {errorMsg && <Message text={errorMsg} severity="error" />}
                                    </div>
                                </div>
                                <Title title="Utilisateur en ligne" headerClass="p-3 card " titleClass="font-bold text-center text-primary" subTitleClass="text-500" separator={false} />
                                <div className="card my-3 shadow-none " >
                                    <div >
                                        <form onSubmit={formik.handleSubmit}>
                                            <div className="mb-2 p-input-icon-left w-full">
                                                <i className="pi pi-user"></i>
                                                <InputText name="username" id="username" label="Nom d'utilisateur ou email" placeholder="Nom d'utilisateur ou email" className="w-full" value={formik.values.username} onChange={formik.handleChange} required="required" type="text" />
                                            </div>
                                            <div className="mb-2 p-input-icon-left w-full">
                                                <i className="pi pi-lock"></i>
                                                <Password name="password" id="password" value={formik.values.password} onChange={formik.handleChange} label="Mot de passe" inputClassName="w-full" feedback={false} toggleMask className="w-full" placeholder="Mot de passe" required="required" />
                                            </div>
                                            <div className="flex justify-content-between align-items-center my-2">
                                                <div className="field-checkbox">
                                                    <Checkbox inputId="rememberme" checked={rememberUser} onChange={e => setRememberUser(e.checked)} />
                                                    <label className="text-sm text-500" htmlFor="rememberme">Souviens-toi de moi</label>
                                                </div>
                                                <div>
                                                    <Link to="/forgotpassword" className="p-button p-button-danger p-button-text">Réinitialiser le mot de passe</Link>
                                                </div>
                                            </div>
                                   
                                            <div className="text-center">
                                                <Button label="Se conencter" loading={loading} icon="pi pi-lock-open" className="p-button-lg p-button-raised w-full" type="submit">
                                                </Button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="">
                                </div>
                                <div className="">
                                </div>
                            </div>
                        </div>
                        <div className="col-4 sm:col-3 lg:col-3 md:col-5 comp-grid" >
                            <section className="page-section mb-3" >
                                <div className="container-fluid">
                                    <div className="grid ">
                                        <div className="sm:col-12  comp-grid" >
                                            <div className="flex justify-content-center align-items-center">
                                                <div className="flex justify-content-center align-items-center">
                                                    <img src="/images/logo-CHU.png" alt="CHU logo" style={{ maxWidth: '100%', width: '150px', height: '150px' }} />
                                                </div>
                                                <div className="flex justify-content-center align-items-center">
                                                    <img src="/images/logo-DEPS.png" alt="logo DPES" style={{ maxWidth: '100%', width: '150px', height: '150px' }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
