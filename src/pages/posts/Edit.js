import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { PageRequestError } from 'components/PageRequestError';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import { Uploader } from 'components/Uploader';
import useApp from 'hooks/useApp';

import useEditPage from 'hooks/useEditPage';
const PostsEditPage = (props) => {
		const app = useApp();
	// form validation schema
	const validationSchema = yup.object().shape({
		imageurl: yup.string().nullable().label("Imageurl"),
		title: yup.string().nullable().label("Title"),
		content: yup.string().nullable().label("Content"),
		posturl: yup.string().nullable().label("Posturl"),
		backuser: yup.number().nullable().label("Backuser")
	});
	// form default values
	const formDefaultValues = {
		imageurl: '', 
		title: '', 
		content: '', 
		posturl: '', 
		backuser: '', 
	}
	//where page logics resides
	const pageController = useEditPage({ props, formDefaultValues, afterSubmit });
	//destructure and grab what we need
	const { formData, handleSubmit, submitForm, pageReady, loading, saving, apiRequestError, inputClassName } = pageController
	//Event raised on form submit success
	function afterSubmit(response){
		app.flashMsg(props.msgTitle, props.msgAfterSave);
		if(app.isDialogOpen()){
			app.closeDialogs(); // if page is open as dialog, close dialog
		}
		else if(props.redirect) {
			app.navigate(`/posts`);
		}
	}
	// loading form data from api
	if(loading){
		return (
			<div className="p-3 text-center">
				<ProgressSpinner style={{width:'50px', height:'50px'}} />
			</div>
		);
	}
	//display error page 
	if(apiRequestError){
		return (
			<PageRequestError error={apiRequestError} />
		);
	}
	//page is ready when formdata loaded successfully
	if(pageReady){
		return (
<main id="PostsEditPage" className="main-page">
    { (props.showHeader) && 
    <section className="page-section mb-3" >
        <div className="container">
            <div className="grid justify-content-between align-items-center">
                { !props.isSubPage && 
                <div className="col-fixed " >
                    <Button onClick={() => app.navigate(-1)} label=""  className="p-button p-button-text " icon="pi pi-arrow-left"  />
                </div>
                }
                <div className="col " >
                    <Title title="modifier"   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
                </div>
            </div>
        </div>
    </section>
    }
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
                            { (formik) => {
                            return (
                            <Form className={`${!props.isSubPage ? 'card  ' : ''}`}>
                                <div className="grid">
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                URL image 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <div className={inputClassName(formik?.errors?.imageurl)}>
                                                    <Uploader name="imageurl" showUploadedFiles value={formik.values.imageurl} uploadPath="fileuploader/upload/imageurl" onChange={(paths) => formik.setFieldValue('imageurl', paths)} fileLimit={1} maxFileSize={3} accept=".jpg,.png,.gif,.jpeg" multiple={false} label="Choisissez des fichiers ou déposez des fichiers ici" onUploadError={(errMsg) => app.flashMsg('Upload error', errMsg, 'error')} />
                                                </div>
                                                <ErrorMessage name="imageurl" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Titre 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="title"  onChange={formik.handleChange}  value={formik.values.data.title}   label="Title" type="text" placeholder="Entrer Title"        className={inputClassName(formik?.errors?.title)} />
                                                <ErrorMessage name="title" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Contenu
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputTextarea name="content"  className={inputClassName(formik?.errors?.content)}   value={formik.values.data.content} placeholder="Entrer Content" onChange={formik.handleChange}   >
                                                </InputTextarea>
                                                <ErrorMessage name="content" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                URL de l'article 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="posturl"  onChange={formik.handleChange}  value={formik.values.data.postUrl}   label="Posturl" type="text" placeholder="Entrer Posturl"        className={inputClassName(formik?.errors?.posturl)} />
                                                <ErrorMessage name="posturl" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Auteur 
                                            </div>
                                            <div className="col-12 md:col-9">
                                               
                                                <InputText name="backuser"  onChange={formik.handleChange}  value={formik.values.data.backuser}   label="Backuser" type="number" placeholder="Entrer Backuser"  min={0}  step="any"    className={inputClassName(formik?.errors?.backuser)} />
                                                <ErrorMessage name="backuser" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                { props.showFooter && 
                                <div className="text-center my-3">
                                    <Button onClick={(e) => handleSubmit(e, formik)}  type="submit" label="Mettre à jour" icon="pi pi-send" loading={saving} />
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
PostsEditPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'posts',
	apiPath: 'post',
	routeName: 'postsedit',
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
export default PostsEditPage;
