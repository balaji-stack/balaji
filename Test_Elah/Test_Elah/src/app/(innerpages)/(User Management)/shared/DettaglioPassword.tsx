import Card from "@/app/components/shared/Card"
import Title from "@/app/components/shared/Title"

type Props = {
    register :any,
    errors :any,
    getValues :any,
}

const DettaglioPassword = (props: Props) => {
    return (
        <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12">
            {/* <Card bgColor="#ffffff" padding={30} borderRadius={15} marginBottom={30} minimumHeight={390}> */}
                <div className="title_block">
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <Title
                            heading="Dettaglio password"
                            textColor="#3e3c4f"
                            fontSize={20}
                            fontWeight={600}
                            bottomSpace={15}
                        />
                    </div>
                </div>
                <div className="form_block content_form">
                    <div className="row ">
                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="form-group grp_cntrls">
                                <label>Giorni di validità</label>
                                <div className="cntrl_grp">
                                    <input
                                        type="number" min={0}
                                        name="passwordvalidity"
                                        style={{ paddingRight: "12px" }}
                                        className="form-control"
                                        placeholder="Giorni di validità"
                                        {...props.register("passwordvalidity",{valueAsNumber: true})}
                                        onChange={(e)=>{
                                            let value = e.target.value;
                                            let regValid = new RegExp(/^(?!0$)[1-9][0-9]*$/);                                         
                                            let isValid = regValid.test(value);
                                          e.target.value = value;
                                            const pElement = document.getElementById('dynamicText');
                                            if (pElement) {
                                                pElement.textContent = isValid ? '' : 'Inserisci un numero intero valido.';
                                            }
                                            
                                        }}
                                    />
                                </div>
                                <p id= "dynamicText" className='error_msg' >{props.errors.passwordvalidity?.message}</p>                        
                            </div>
                        </div>
                    </div>


                    <div className="row mt-xxl-2 mb-xxl-3 mt-xl-2 mb-xl-3 mt-lg-2 mb-lg-3 mt-md-2 mb-md-3 mt-sm-2 mb-sm-3 p-3 ">
                        <div className=" col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="each_content">
                                <label>
                                    Ultimo cambiamento <i>:</i>
                                </label>
                                <span>{props.getValues("last_password_change")}</span>
                            </div>
                        </div>

                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="each_content">
                                <label>
                                    Prossimo cambiamento <i>:</i>
                                </label>
                                <span>{props.getValues("next_password_change")}</span>
                            </div>
                        </div>
                    </div>
                </div>
            {/* </Card> */}
        </div>
    )
}

export default DettaglioPassword