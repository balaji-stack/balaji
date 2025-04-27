import React from 'react'
import { filterType, selectField } from './page';
import FilterFieldEl from '@/app/components/shared/FilterFieldEl';


type Props = {

    filter: filterType;
    onChangeHandler: any;
    resetHandler: any;
    searchHandler: any;
    showCampagnaHandler: any;
    showClienteHandler : any;
    promozoniCapoArealist : selectField[];
}

const FilterComponent = (props: Props) => {
    const onchangeHandler = props.onChangeHandler;
    const filter = props.filter;
    const resetHandler = props.resetHandler;
    const searchHandler = props.searchHandler;
    const showCampagnaHandler = props.showCampagnaHandler;
    const showClienteHandler =props.showClienteHandler;
    const promozoniCapoArealist =props.promozoniCapoArealist;  
    //Options used in filter fields
    const AreaOptions = [{ label: 'Tutti', value: '' }, { label: 'getFromApi', value: 'api' }];

    const filterFields = [
        {
            fieldType: 'inputSearch', colArr: [4, 4, 6, 12, 12, 12], label: 'Campagna', field: 'campagna', value: filter.campagna,
            placeholder: null, onchangeHandler: onchangeHandler, clickHandler: ()=>{showCampagnaHandler()}, options: null
        },
        {
            fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'Descrizione', field: 'description', value: filter.description,
            placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
        },
        {
            fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Area', field: 'areaCode', value: filter.areaCode,
            placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: promozoniCapoArealist
        },
        {
            fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'Codice', field: 'codice', value: filter.codice,
            placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, 
        },
        {
            fieldType: 'date', colArr: [2, 2, 3, 6, 6, 6], label: 'Dalla data rev.', field: 'promoCreatedFromDate', value: filter.promoCreatedFromDate,
            placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
        },
        {
            fieldType: 'date', colArr: [2, 2, 3, 6, 6, 6], label: 'Alla data  rev.', field: 'promoCreatedToDate', value: filter.promoCreatedToDate,
            placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
        },
        {
            fieldType: 'inputSearch', colArr: [4, 4, 6, 12, 12, 12], label: 'Cliente', field: 'customerCodice', value: filter.customerCodice,
            placeholder: null, onchangeHandler: onchangeHandler, clickHandler:  ()=>{showClienteHandler()},  options: null
        },
    ]
    return (
        <section>
            <div className="row">

                {
                    filterFields?.map((it: any,i: number) => {
                        return (
                            <FilterFieldEl key={i} fieldType={it.fieldType} colArr={it.colArr} label={it.label}
                                field={it.field} value={it.value} placeholder={it.placeholder} onchangeHandler={it.onchangeHandler}
                                clickHandler={it.clickHandler} options={it.options} />
                        )
                    })
                }
              
            </div>
            <div className="btn_grp">
                <div className="btn_grp_inner">
                    <button
                        type="button"
                        className="site_btn primary_btn"
                        onClick={resetHandler}
                    >
                        Resettare
                    </button>
                    <button
                        type="button"
                        className="site_btn brdr_btn"
                        onClick={searchHandler}
                    >
                        Cerca
                    </button>
                </div>
            </div>
        </section>
    )
}
export default FilterComponent;

