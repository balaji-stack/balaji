"use client"
import Card from '@/app/components/shared/Card';
import Title from '@/app/components/shared/Title';
import Link from 'next/link';
import Image from 'next/image';
import ArrowDown from '@/img/arrow-down.png';

//const UserDetails = () => {
interface properties {
  register: any;
  errors: any;
  userId?: any;
  getValues: any;
  setValue: any;
  handleduplicateuser?: any;
  trigger: any;
  clearErrors: any;
}


const UserDetails = (props: properties) => {

  return (

    // <Card bgColor="#ffffff" padding={30} borderRadius={15} marginBottom={30}>
    <>
          <div className="row">
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <Title
                heading="Dettaglio utente"
                textColor="#3e3c4f"
                fontSize={18}
                fontWeight={600}

              />
            </div>
          </div>
          <div className="form_block">
            <div className="content_form">
              <div className="row">
                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="row">
                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="form-group grp_cntrls">
                        <label htmlFor='userName'>Nome</label>
                        <div className="cntrl_grp">
                          <input
                            {...props.register("userName")}
                            type="text"
                            className="form-control"
                            placeholder="Inserisci qui il nome"
                            autoComplete="off"
                          />
                          <p className="error_msg">{props.errors.userName?.message}</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="form-group grp_cntrls">
                        <label id="surname" htmlFor='userSurname'>Cognome</label>
                        <div className="cntrl_grp">
                          <input
                            {...props.register("userSurname")}
                            type="text"
                            className="form-control"
                            placeholder="Inserisci qui il cognome"
                          />
                          <p className="error_msg">{props.errors.userSurname?.message}</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="form-group grp_cntrls">
                        <label htmlFor='userEmail'>E-Mail</label>
                        <div className="cntrl_grp">

                          <input
                            {...props.register("userEmail")}
                            type="text"
                            className="form-control"
                            placeholder="Inserisci l'e-mail qui"
                          />
                          <p className="error_msg">{props.errors.userEmail?.message}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="row">
                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="form-group grp_cntrls">
                        <label htmlFor='userLogin'>Nome utente</label>
                        <div className="cntrl_grp">
                          <input
                            {...props.register("userLogin")}
                            type="text"
                            className="form-control"
                            placeholder="Inserisci qui il nome utente"
                          />
                          <p className="error_msg">{props.errors.userLogin?.message}</p>
                        </div>
                      </div>
                    </div>


                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="form-group grp_cntrls">
                        <label htmlFor='password'>Parola d'ordine</label>
                        <div className="cntrl_grp">
                          <input
                            {...props.register("password")}
                            type="password"
                            className="form-control"
                            placeholder="Inserisci la password qui"
                            autoComplete="new-password"
                          />
                          <p id="dynamicTextpassword" className="error_msg">{props.errors.password?.message}</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                      <div className="form-group grp_cntrls">
                        <label htmlFor='retypepassword'>Ri-digitare password</label>
                        <div className="cntrl_grp">
                          <input
                            {...props.register("retypepassword")}
                            type="password"
                            className="form-control"
                            placeholder="Reinserisci la password qui"
                          />
                          <p className="error_msg">{props.errors.retypepassword?.message}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </>
    // </Card>
  )
}

export default UserDetails