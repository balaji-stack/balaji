import React from 'react'
import { filterType } from './page';
import Select from 'react-dropdown-select';

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
  return (
    <section>
    <div className="row">
      <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
        <div className="form-group">
          <label>Anno</label>
          <div className="cntrl_grp">
            <input
              type="text"
              value={filter.budgetyear}
              className="form-control"
              onChange={(e) => onchangeHandler("budgetyear", e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
          <div className="form-group">
            <label>Autorizzazione</label>
            <div className="cntrl_grp">
              <Select
                values={filter.budgetareaArr}
                options={budgetareaList}
                onChange={(val: any) => {
                  let value = val.length > 0 ? val[0].value : '';
                  filter.budgetareaArr[0] = val[0];
                  onchangeHandler('budgetarea', value);
                }
                } />
            </div>
          </div>
        </div>
    </div>
    <div className="btn_grp">
      <div className="btn_grp_inner">
        <button
          type="button"
          className="site_btn primary_btn"
          onClick={resetHandler}>
          Resettare
        </button>
        <button type="button" className="site_btn brdr_btn" onClick={searchHandler}>
          Cerca
        </button>

      </div>
    </div>
  </section>
  )
}

export default FilterComponent;

const budgetareaList =[{label:'Tutti',value:'Tutti'},{label:'getFromApi',value:'getFromApi'}]