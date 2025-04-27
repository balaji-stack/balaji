
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


  const SuperOptions = [{ label: 'Tutti', value: '' }, { label: 'getFromApi', value: '0' }];
  const GruppoOptions = [{ label: 'Tutti', value: '' }, { label: 'getFromApi', value: '0' }];
  const SottoOptions = [{ label: 'Tutti', value: '' }, { label: 'getFromApi', value: '0' }];
  const StatusOptions = [{ label: 'Tutti', value: '' }, { label: 'getFromApi', value: '0' }];


  const filterFields = [
    {
      fieldType: 'date', colArr: [2, 2, 3, 6, 6, 6], label: 'Dalla data reso', field: 'tdalladata', value: filter.tdalladata,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
    },


    {
      fieldType: 'date', colArr: [2, 2, 3, 6, 6, 6], label: 'alla data', field: 'talladata', value: filter.talladata,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
    },


    {
      fieldType: 'inputSearch', colArr: [4, 4, 6, 12, 12, 12], label: 'Agente', field: 'tagentname', value: filter.tagentname,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
    },

    {
      fieldType: 'inputSearch', colArr: [4, 4, 6, 12, 12, 12], label: 'Codice cliente', field: 'tcodice', value: filter.tcodice,
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
      fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Sotto Gruppo', field: 'sfilter', value: filter.ssottogruppo,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: SottoOptions
    },

    {
      fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Status Reso', field: 'tstatus', value: filter.tstatus,
      placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: StatusOptions
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
