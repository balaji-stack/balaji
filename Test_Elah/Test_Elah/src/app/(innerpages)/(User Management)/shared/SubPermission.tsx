import { handlePermissions } from "../helper/UserUtils";

type Props = {
    index?: number;
    child: string;
    id: string;
    name: string;
    register: any;
    value?: string;
    setValue :any;
    control: any;
    label: string;
}

const SubPermission = (props: Props) => {
    let label = props.label.split('^');//it is to display red text on some permissions under report

    return (
        <div className="mt-2 ps-4">
            <input id={props.id} className={`form-check-input ${props.child}`} type="checkbox"
                {...props.register(props.name,{})} value={props.value} 
                onChange={(e) => handlePermissions(e,props.setValue)} />
          {label.length > 1 ?
                <label htmlFor={props.id} className="form-check-label " >{label[0]}<span style={{ color: "#FF0000" }}>{label[1]}</span>{label[2]}</label>
                :
                <label htmlFor={props.id} className="form-check-label " >{label[0]}</label>

            }
        </div>
    )
}

export default SubPermission