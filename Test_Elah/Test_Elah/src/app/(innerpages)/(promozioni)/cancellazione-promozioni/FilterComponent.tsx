import React from 'react'
import { filterType } from './page';
import FilterFieldEl from '@/app/components/shared/FilterFieldEl';
type Props = {

    filter: filterType;
    onChangeHandler: any;
    resetHandler: any;
    searchHandler: any;
    showCampagnaHandler: any;
    promozoniCapoArealist : any;
}

const FilterComponent = (props: Props) => {
    const onchangeHandler = props.onChangeHandler;
    const filter = props.filter;
    const resetHandler = props.resetHandler;
    const searchHandler = props.searchHandler;
    const showCampagnaHandler = props.showCampagnaHandler;
    


 //Options used in filter fields
 const AttivazioneOptions = [{ label: 'Tutti', value: '' }, { label: 'Draft', value: '0' }, { label: 'Attivata', value: '1' }];

 const AutorizzazioneOptions = [{ label: 'Tutti', value: '' }, { label: 'Pronto per attivazione', value: '0' }, { label: 'Autorizzato', value: '1' },
 { label: 'Da autorizzare', value: '2' }, { label: 'Non autorizzato', value: '3' }, { label: 'Dati incompleti', value: '4' }];

 const Status_cancellazioneOptions= [{ label: 'Tutti', value: '' } , { label: 'Si', value: '0' } ,  { label: 'No', value: '1' }] ;
 const AreaOptions= props.promozoniCapoArealist;


 const filterFields = [
    {
        fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'Codice', field: 'code', value: filter.code,
        placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
    },
    {
        fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'Descrizione', field: 'description', value: filter.description,
        placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
    },
    {
        fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Attivazione', field: 'sStatus', value: filter.sStatus,
        placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: AttivazioneOptions
    },
    {
        fieldType: 'inputSearch', colArr: [4, 4, 6, 12, 12, 12], label: 'Campagna', field: 'sCampagna', value: filter.sCampagna,
        placeholder: null, onchangeHandler: onchangeHandler, clickHandler: ()=>{showCampagnaHandler()}, options: null
    },

    {
        fieldType: 'date', colArr: [2, 2, 3, 6, 6, 6], label: '	Dalla data rev.', field: 'txtpromoCreatedFromDate', value: filter.txtpromoCreatedFromDate,
        placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
    },
    {
        fieldType: 'date', colArr: [2, 2, 3, 6, 6, 6], label: 'Alla data rev.', field: 'txtPromoCreatedToDate', value: filter.txtPromoCreatedToDate,
        placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
    },

    {
        fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Autorizzazione', field: 'sautorizza', value: filter.sautorizza,
        placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: AutorizzazioneOptions
    },
   
    {
        fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Status cancellazione', field: 'sStatusCancella', value: filter.sStatusCancella,
        placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: Status_cancellazioneOptions
    },
   
    {
        fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Area', field: 'sArea', value: filter.sArea,
        placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: AreaOptions
    },
   
   ]

  return (
    <section>
    <div className="row">
        {filterFields?.map((it: any,i: number) => {
            let keyIndex = i;
                return (
                    <FilterFieldEl key={keyIndex} fieldType={it.fieldType} colArr={it.colArr} label={it.label}
                        field={it.field} value={it.value} placeholder={it.placeholder} onchangeHandler={it.onchangeHandler}
                        clickHandler={it.clickHandler} options={it.options} />                               
                )
            })}
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

export default FilterComponent