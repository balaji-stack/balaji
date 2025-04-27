
import React from 'react'
import { filterType } from './page';
import SectionLoader from '../SectionLoader';

type Props = {
    filter: filterType;
    chooseCampagnaHandler: any;
    campagnaList: any;
    //loadmoreHandler: any;
    isLastPage: boolean;
    isSectionLoading: boolean;
}
const UtenteTable = (props: Props) => {
    const filter = props.filter;

    const chooseCampagnaHandler = props.chooseCampagnaHandler;
    //const campagnaList = props.campagnaList;
    //let loadmoreHandler = props.loadmoreHandler;
    let isLastPage = props.isLastPage;
    let isSectionLoading = props.isSectionLoading;
    return (
        <section>
            <div className="table_section">
                <div className="inner-content">
                    <div className="inner-table-content">
                        <div className="table-responsive">
                            <table className="table-main table table-striped table-borderless">
                                <thead className="sticky-thead">
                                    <tr>

                                        <th>-</th>
                                        <th>Cognome Nome utente</th>
                                        <th>Codice</th>
                                        <th>Tipo utente</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        <tr>
                                           have to Take data from api
                                        </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UtenteTable