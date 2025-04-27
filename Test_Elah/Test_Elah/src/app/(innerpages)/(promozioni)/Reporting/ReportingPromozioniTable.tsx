
import React from 'react'
import { filterType } from './page';
import Link from 'next/link';
import SectionLoader from '@/app/components/shared/SectionLoader';

type Props = {
    reportingListLoading: boolean;
    filter: filterType;
    reportingList: any;
    loadmoreHandler: any;
    isLastPage: boolean;
    isSectionLoading: boolean;
    nrPrLinkFn: any;
}

const ReportingPromozioniTable = (props: Props) => {
    const reportingListLoading = props.reportingListLoading;
    const reportingList = props.reportingList;
    let loadmoreHandler = props.loadmoreHandler;
    let isLastPage = props.isLastPage;
    let isSectionLoading = props.isSectionLoading;
    const filter = props.filter;
    const nrPrLinkFn = props.nrPrLinkFn;
    return (
        <section>
            <div className="table_section">
                <div className="inner-content">
                    <div className="inner-table-content">
                        <div className="table-responsive">
                            <table className="table-main table table-striped table-borderless">
                                <thead className="sticky-thead">

                                    <tr>
                                        <th colSpan={2}>Campagna</th>
                                        <th colSpan={2}>Periodo campagna</th>
                                        <th>---</th>
                                        <th colSpan={2}>Nr.promo regolari</th>
                                        <th colSpan={2}>Nr.promo autorizzate per sconti</th>
                                        <th colSpan={2}>Nr.promo fuori per ambedue le date di sell-in ordini,sell-in consegna</th>
                                        <th colSpan={2}>Nr.promo fuori per una sola data di sell-out</th>
                                        <th colSpan={2}>Nr.promo con sell-out dentro a promo ma con date sell-in errate</th>

                                    </tr>
                                    <tr>
                                        <th>Codice</th>
                                        <th>Descrizione</th>
                                        <th>Periodo</th>
                                        <th>gg</th>
                                        <th>Nr.pr.</th>
                                        <th>Nr.pr.</th>
                                        <th>%su totale</th>
                                        <th>Nr.pr</th>
                                        <th>%su totale</th>
                                        <th>Nr.pr.</th>
                                        <th>%su totale</th>
                                        <th>Nr.pr.</th>
                                        <th>%su totale</th>
                                        <th>Nr.pr.</th>
                                        <th>%su totale</th>
                                    </tr>
                                </thead>
                                    <tbody>
                                        {reportingList?.map((obj: any, i: number) => {

                                            return (
                                                <tr key={i}>

                                                    <td>{obj.Codice}</td>
                                                    <td>{obj.Descrizione}</td>
                                                    <td>{obj.Periodo}</td>
                                                    <td>{obj.gg}</td>
                                                    <td>
                                                        <Link href={'#'} onClick={() => {

                                                            nrPrLinkFn(obj.Codice);

                                                        }}
                                                        >{obj.Nr_promo_generate}</Link>
                                                    </td>
                                                    <td>{obj.Nr_promo1}</td>
                                                    <td>{obj['%_su_totale1']}</td>
                                                    <td>{obj.Nr_promo2}</td>
                                                    <td>{obj['%_su_totale2']}</td>
                                                    <td>{obj.Nr_promo3}</td>
                                                    <td>{obj['%_su_totale3']}</td>
                                                    <td>{obj.Nr_promo4}</td>
                                                    <td>{obj['%_su_totale4']}</td>
                                                    <td>{obj.Nr_promo5}</td>
                                                    <td>{obj['%_su_totale5']}</td>
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default ReportingPromozioniTable 