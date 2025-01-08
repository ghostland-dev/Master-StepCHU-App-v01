import * as yup from 'yup';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';

import usePostForm from 'hooks/usePostForm';
import { Link } from 'react-router-dom';
export default function ForgotPassword() {

	const formUrl = "auth/forgotpassword";
	const formData = {
		email: '',
	}
	const validationSchema = yup.object().shape({
		email: yup.string().required().label(`Email`),
	});
	const form = {
		formUrl, formData, validationSchema
	}
	const { data, loading, errorMsg, formik } = usePostForm(form);
	return (
		<div className="grid justify-content-center align-items-center screen-h">
			<div className="col md:col-5">
				<div className="card">
					<div className="my-3">
						<div className="text-2xl font-bold text-emerald-400">Gestionnaire de réinitialisation de mot de passe</div>
						<small className="text-500">
							S'il vous plaît fournir l'adresse email valide que vous avez utilisé pour vous inscrire
						</small>
					</div>
					{data && <Message severity="success" text={data} className="w-full mb-3" />}
					<form onSubmit={formik.handleSubmit}>
						{errorMsg && <Message severity="error" text={errorMsg} />}
						<div className="grid align-items-center justify-content-between">
							<div className="col">
								<InputText id="email" name="email" className="w-full" value={formik.values.email} onChange={formik.handleChange} placeholder="Email" required type="email" />
							</div>
							<div className="col-auto">
								<Button loading={loading} type="submit" label="Envoyer" icon="pi pi-envelope" />
							</div>
						</div>
					</form>
					<hr />
					<div className="text-primary">
						Un lien sera envoyé à votre email contenant les informations dont vous avez besoin pour votre mot de passe
					</div>

					<Link to="/" className="p-button p"> retour </Link>


				</div>	
				 


			</div>
		</div>
	);
}