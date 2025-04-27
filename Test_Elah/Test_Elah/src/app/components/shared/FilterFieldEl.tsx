import React, { forwardRef } from 'react';
import Image from "next/image";
import calenderimg from "@/img/calender.png";
import textBoxSearch from "@/img/txt_box_search.png";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { it } from "date-fns/locale";
import Select from 'react-dropdown-select';
import CreatableSelect from 'react-select/creatable';
import { calenderimgStr } from '@/helpers/images';
registerLocale("it", it);
type Props = {
  fieldType: string;
  colArr: number[];//for bootstrap column grid
  label: string;
  field: string;
  value: any |null ;
  placeholder: string | null;
  onchangeHandler: Function;
  clickHandler: any | null;
  options: any | null;
}

const FilterFieldEl = (props: Props) => {
  const fieldType = props.fieldType;
  const colArr = props.colArr;
  const field = props.field;
  const label = props.label;
  const value = props.value;
  const placeholder = props.placeholder;
  const onchangeHandler = props.onchangeHandler;
  const clickHandler = props.clickHandler;
  const options = props.options;
  const colGrid = `col-xxl-${colArr[0]} col-xl-${colArr[1]} col-lg-${colArr[2]} col-md-${colArr[3]} col-sm-${colArr[4]} col-${colArr[5]}`;


  // const DateInput = forwardRef((props: any, ref: any) => (
  //   <div className="date_input form-control" onClick={props.onClick} ref={ref}>
  //     <input value={props.value} />

  //     <span className="icon_txtbox">
  //       <Image src={calenderimg} alt="Image"></Image>
  //     </span>
  //   </div>
  // ));

  // DateInput.displayName = "DateInput";

  let FieldTag: any = null;
  switch (fieldType) {
    case ('input'):
      FieldTag = <div className="cntrl_grp"><input
        type="text"
        value={value}
        className="form-control"
        placeholder={placeholder != null ? placeholder : ''}
        onChange={(e) =>
          onchangeHandler(field, e.target.value)
        }
      />
      </div>
      break;
    case ('inputSearch'):
      FieldTag = <div className="cntrl_grp">
        <input
          type="text"
          value={value}
          className="form-control"
          placeholder={placeholder != null ? placeholder : ''}
          onChange={(e) => onchangeHandler(field, e.target.value)}
        />
        <button
          type="button"
          className="icon_txtbox"
          onClick={clickHandler}
        >
          <Image src={textBoxSearch} alt="Image" />
        </button>
      </div>
      break;
    case ('select'):
      FieldTag = <div className="cntrl_grp">
        <CreatableSelect isClearable className='custom-select-picker'
          classNamePrefix="nw"
          options={options}
          value={value} onChange={(value: any) => {
            if(value == null){
              onchangeHandler(field,{label: "",value: ""})
            }else{
              onchangeHandler(field, value);
            };
          }} />
      </div>
      break;
    case ('multi-select'):
      FieldTag = <div className="cntrl_grp">
        <CreatableSelect isClearable className='custom-select-picker'
          isMulti
          classNamePrefix="nw"
          options={options}
          value={value} onChange={(value: any) => {
            onchangeHandler(field, value)
          }} />
      </div>
      break;
    case ('date'):
      FieldTag = <div className="cntrl_grp" style={{ marginTop: label == null ? '27px' : '0px' }}>
        <DatePicker
          showIcon
          toggleCalendarOnIconClick
          locale="it"
          className="form-control"
          dateFormat="dd-MM-yyyy"
          selected={value}
          scrollableYearDropdown
          icon={<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="1794" height="1794" viewBox="0 0 1794 1794">
            <image id="calendar" width="1794" height="1794" xlinkHref={calenderimgStr} />
          </svg>}
          calendarIconClassname='calender-icon-datepicker'
          onChange={(date: any) => {
            onchangeHandler(field, date);
          }}
        />
      </div>
      break;
    default:
      FieldTag = <div className="cntrl_grp">
        Invalid type
      </div>

  }
  return (
    <div className={colGrid}>
      <div className="form-group">
        <label>{label}</label>
        {FieldTag}
      </div>
    </div>
  )
}

export default FilterFieldEl