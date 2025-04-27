
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


  const SuperOptions = [{ label: 'Tutti', value: '' }];
  const GruppoOptions = [{ label: 'Tutti', value: '' }];
  const SottoOptions = [{ label: 'Tutti', value: '' }, { label: 'getFromApi', value: '0' }];



  const filterFields = [


    {
      fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'Codice cliente', field: 'tcodice', value: filter.tcodice,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
    },

    {
      fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'Rag. sociale', field: 'tsocialerep', value: filter.tsocialerep,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
    },

    {
      fieldType: 'inputSearch', colArr: [4, 4, 6, 12, 12, 12], label: 'Agente', field: 'tagentname', value: filter.tagentname,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
    },


    {
      fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'Città', field: 'tcity', value: filter.tcity,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
    },

    {
      fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'PV', field: 'tpv', value: filter.tpv,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
    },

    {
      fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Super Gruppo', field: 'ssupergruppo', value: filter.ssupergruppo,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: SuperOptions
    },

    {
      fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Gruppo', field: 'sgruppo', value: filter.sgruppo,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: GruppoOptions
    },

    {
      fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Sotto Gruppo', field: 'ssottogruppo', value: filter.ssottogruppo,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: SottoOptions
    },


  ]


  return (
    <section>
      <div className="row">

        {
          filterFields?.map((it: any, i: number) => {
            let keyIndex = i;
            return (
              <FilterFieldEl key={keyIndex} fieldType={it.fieldType} colArr={it.colArr} label={it.label}
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
