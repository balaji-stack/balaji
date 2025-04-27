import React, { useEffect } from 'react'
import { filterType } from './page';
import FilterFieldEl from '@/app/components/shared/FilterFieldEl';

type Props = {

filter : filterType;
onChangeHandler : any;
resetHandler : any;
searchHandler : any;
showCampagnaHandler : any;
showClienteHandler : any;
showAgenteHandler : any;
showUtenteHandler : any;
promozoniCapoArealist: any;
promozoniAssotiDropDown :any;
//showGruppoOptions:any;
promozoniGruppodropDown:any;
promozoniSottoGruppodropDown:any;



}
const FilterComponent = (props: Props) => {

    const onchangeHandler = props.onChangeHandler;
    const filter = props.filter;
    const resetHandler = props.resetHandler;
    const searchHandler = props.searchHandler;
    const showCampagnaHandler = props.showCampagnaHandler;
    const showClienteHandler = props.showClienteHandler;
    const showAgenteHandler = props.showAgenteHandler;
    const showUtenteHandler = props.showUtenteHandler;

    const AreaOptions = props.promozoniCapoArealist;
    //const SupergruppiOptions = [{ label: 'Tutti', value: '' }, { label: 'getFromApi', value: 'api' }];
    //const GruppoOptions             = [{ label: 'Tutti', value: '' }];
    const SottoGruppoOption             = [{ label: 'Tutti', value: '' }];
    const AttivazioneOptions            = [{ label: 'Tutti', value: '' }, { label: 'Draft', value: '0' }, { label: 'Attivata', value: '1' }];
    const SupergruppiOptions            = props.promozoniAssotiDropDown;
    const GruppoOptions                 = props.promozoniGruppodropDown;
    const promozoniSottoGruppodropDown  =props.promozoniSottoGruppodropDown;
    
  const filterFields = [
    {
        fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'Codice-promozione', field: 'code', value: filter.code,
        placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
    },
   
  
    {
      fieldType: 'inputSearch', colArr: [4, 4, 6, 12, 12, 12], label: 'Campagna', field: 'campagnaCode', value: filter.campagnaCode,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: ()=>showCampagnaHandler(true), options: null
    },

    {
      fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Area', field: 'reportArea', value: filter.reportArea,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: AreaOptions
    },

    {
      fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Supergruppi', field: 'supergruppo', value: filter.supergruppo,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler : null, options: SupergruppiOptions
    },

    {
      fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Gruppo', field: 'gruppo', value: filter.gruppo,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: GruppoOptions
    },

    {
      fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Sotto Gruppo', field: 'sottogruppo', value: filter.sottogruppo,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: promozoniSottoGruppodropDown
    },

    {
      fieldType: 'inputSearch', colArr: [4, 4, 6, 12, 12, 12], label: 'Codice cliente', field: 'Codicerep', value: filter.Codicerep,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler:  ()=>showClienteHandler(true), options: null
    },

    {
      fieldType: 'inputSearch', colArr: [4, 4, 6, 12, 12, 12], label: 'Agente', field: 'Agentname', value: filter.Agentname,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler:  ()=>showAgenteHandler(true), options: null
    },

    {
      fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Attivazione', field: 'status', value: filter.status,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: AttivazioneOptions
    },

    {
      fieldType: 'inputSearch', colArr: [4, 4, 6, 12, 12, 12], label: 'Utente creatore', field: 'strCode', value: filter.strCode,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler:  ()=>showUtenteHandler(true), options: null
    },

    {
      fieldType: 'date', colArr: [2, 2, 3, 6, 6, 6], label: 'Periodo creazione', field: 'promoCreatedFromDate', value: filter.promoCreatedFromDate,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
  },
  {
      fieldType: 'date', colArr: [2, 2, 3, 6, 6, 6], label: null, field: 'promoCreatedToDate', value: filter.promoCreatedToDate,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
  }

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

export default FilterComponent