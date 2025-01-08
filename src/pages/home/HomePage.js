import { useState } from 'react';
import { Chart } from 'primereact/chart';
import { DataSource } from 'components/DataSource';
import { RecordCount } from 'components/RecordCount';
import { Title } from 'components/Title';

export default function HomePage() {

    const [pageReady, setPageReady] = useState(true);
    return (
        <main id="HomePage" className="main-page">
            <section className="page-section q-pa-md" >
                <div className="container-fluid">
                    <div className="grid ">
                        <div className="col comp-grid" >
                            <Title title="Tableau de bord" titleClass="text-lg font-bold text-primary" subTitleClass="text-500" separator={false} />
                        </div>
                    </div>
                </div>
            </section>
            <section className="page-section mb-3" >
                <div className="container-fluid">
                    <div className="grid ">
                        <div className="col-6  comp-grid" >
                            <RecordCount title="Participants" description="Total des utilisateurs" icon="pi pi-th-large" apiPath="/backuser" link={`/users`} cardClass="my-2 bg-blue-100 text-blue-800" avatarClass="bg-blue-600 text-blue-100" />
                            <RecordCount title="Articles" description="Total des articles" icon="pi pi-th-large" apiPath="/post" link={`/posts`} cardClass="my-2 bg-blue-100 text-blue-800" avatarClass="bg-blue-600 text-blue-100" />
                            <RecordCount title="Super Score" description="Total des pas" icon="pi pi-th-large" apiPath="/backuser" link={`/steps`} cardClass="mx-2 bg-blue-100 text-blue-800" avatarClass="bg-blue-600 text-blue-100"   />
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
                                                            <Chart data={response} type="line" options={
                                                                {
                                                                    scales: {
                                                                        y: {
                                                                            title: {
                                                                                display: true,
                                                                                text: "Jour"
                                                                            }
                                                                        },
                                                                        x: {
                                                                            title: {
                                                                                display: true,
                                                                                text: "Pas"
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
                    </div>
                </div>
            </section>
        </main>
    );
}
