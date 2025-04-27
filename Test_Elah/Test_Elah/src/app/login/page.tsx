"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "./auth.scss";
import Logo from "../../img/logo.png";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import SERVER_URL, { saveUserInfo } from "@/helpers/common";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import FullPageLoader from "../components/shared/FullPageLoader";
import { popupMsg } from "@/helpers/messages";
import { useDispatch } from "react-redux";
import { updateLoginInfo, updateMenuObj } from "@/redux/slices/auth-slice";

type FormValues = {
  userLogin: string;
  password: string;
}

const Page = () => {
  useEffect(() => {//invalidate session 
    axios.get(`${SERVER_URL}/Common/invalidate-session`, {
      withCredentials: true,
    }).then((res) => {
    }).catch((err) => {
    });
  }, []);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const schema: any = yup.object().shape({
    userLogin: yup.string().required("Inserisci il nome"),
    password: yup.string().required('Inserisci la password'),
  });
  const form = useForm<FormValues>({
    defaultValues: {
      userLogin: "",
      password: "",
    },
    resolver: yupResolver(schema), mode: "onTouched"
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onsubmitFn = async (data: FormValues) => {
    setIsLoading(true);
    const url = `${SERVER_URL}/user/login`;
    await axios
      .post(url, data, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then((response) => {
        const { menuObj, logininfo } = saveUserInfo(response.data);
        dispatch(updateMenuObj(menuObj));
        dispatch(updateLoginInfo(logininfo));
        router.push('/dashboard');
      })
      .catch((e: AxiosError) => {
        let status = e.status;
        if (status === 401) {
          popupMsg("utente non autorizzato", "error");
        } else {
          popupMsg("qualcosa è andato storto", "error");
        }
      }).finally(() => {
        setIsLoading(false);
      });

  }

  const onerrorFn = (error: any) => {
    console.log(error)
  }


  return (
    <>
      {isLoading ? <FullPageLoader /> :
        <section className="auth_wrapper">
          <div className="container">
            <div className="auth_box">
              <div className="title_grp">
                <span className="logo_s">
                  <Image src={Logo} alt="Logo" priority={true}></Image>
                </span>
                <h3>Utilizza il tuo Account Elah</h3>
              </div>
              <div className="auth_form_block">
                <form onSubmit={handleSubmit(onsubmitFn, onerrorFn)}>
                  <div className="form-group">
                    <label htmlFor="userLogin">Username</label>
                    <div className="cntrl_grp">
                      <input
                        {...register("userLogin")}
                        type="text"
                        className="form-control"
                        placeholder="Inserisci la tua username"
                        autoComplete="false"
                      />
                      <p style={{ color: 'red' }}>{errors.userLogin?.message}</p>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="cntrl_grp">
                      <input
                        {...register("password")}
                        type="password"
                        className="form-control"
                        placeholder="Inserisci la tua password"
                        autoComplete="false"
                      />
                      <p style={{ color: 'red' }}>{errors.password?.message}</p>
                    </div>
                  </div>
                  <div className="btn_grp">
                    <button type="submit" className="site_btn primary_btn shadow">
                      Accedi
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      }
    </>
  );
};

export default Page;
