import React from 'react'
import { filterType } from './page';
import FilterFieldEl from '@/app/components/shared/FilterFieldEl';

type Props = {
  filter: filterType;
  onChangeHandler: any;
  resetHandler: any;
  searchHandler: any;

}

const FilterComponent = (props: Props) => {
  const onchangeHandler = props.onChangeHandler;
  const filter = props.filter;
  const resetHandler = props.resetHandler;
  const searchHandler = props.searchHandler;

  const CausaleOptions = [{ label: 'Tutti', value: '' }, { label: 'getfromApi', value: '0' }];
  const AreaOptions = [{ label: 'Tutti', value: '' }, { label: 'getfromApi', value: '0' }];
  const SuperGruppoOptions = [{ label: 'Tutti', value: '' }, { label: 'getfromApi', value: '0' }];
  const GruppoOptions = [{ label: 'Tutti', value: '' }];
  const SottoGruppoOptions = [{ label: 'Tutti', value: '' }];

  const filterFields = [

  
    {
      fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'Codice Cliente', field: 'tcodice', value: filter.tcodice,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
    },


    {
      fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'Rag Sociale', field: 'tsocialerep', value: filter.tsocialerep,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
    },


    {
      fieldType: 'inputSearch', colArr: [4, 4, 6, 12, 12, 12], label: 'Agente', field: 'tagentname', value: filter.tagentname,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
    },


    {
      fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'Anno', field: 'budgetyear', value: filter.budgetyear,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
    },


    {
      fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Causale', field: 'causaleFilter', value: filter.causaleFilter,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: CausaleOptions
    },


    {
      fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Area', field: 'area', value: filter.area,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: AreaOptions
    },

    {
      fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Super Gruppo', field: 'supergrupo', value: filter.supergrupo,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: SuperGruppoOptions
    },

    {
      fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Gruppo', field: 'gruppo', value: filter.gruppo,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: GruppoOptions
    },

    {
      fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Sotto Gruppo', field: 'sottogruppo', value: filter.sottogruppo,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: SottoGruppoOptions
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

export default FilterComponent;
