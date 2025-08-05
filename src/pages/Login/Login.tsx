import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema, type Schema } from "@utils/rule";
import { useMutation } from "@tanstack/react-query";
import authApi from "@apis/auth.api";
import { isAxiosUnprocessableEntityError } from "@utils/utils";
import Input from "@components/Input";
import { useContext } from "react";
import { AppContext } from "@contexts/app.context";
import Button from "@components/Button";
import type { ErrorResponse } from "@/types/utils.type";
import { useTranslation } from "react-i18next";

type FormData = Pick<Schema, "email" | "password">;
const loginSchema = schema.pick(["email", "password"]);

export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext);
  const navigate = useNavigate();
  const { t } = useTranslation("login-register");

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: (body: Omit<FormData, "confirm_password">) => authApi.login(body),
  });

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        setIsAuthenticated(true);
        setProfile(response.data.data.user);
        navigate("/");
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data;

          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: "Server",
              });
            });
          }
        }
      },
    });
  });

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>{t("login")}</div>
              <Input
                name='email'
                register={register}
                type='email'
                className='mt-8'
                errorMessage={errors.email?.message}
                placeholder={t("email")}
              />

              <Input
                name='password'
                register={register}
                type='password'
                className='mt-2'
                classNameEye='absolute right-[5px] h-5 w-5 cursor-pointer top-[12px]'
                errorMessage={errors.password?.message}
                placeholder={t("password")}
                autoComplete='on'
              />

              <div className='mt-3'>
                <Button
                  type='submit'
                  className='flex w-full justify-center bg-red-500 px-2 py-4 text-sm uppercase text-white hover:bg-red-600'
                  isLoading={loginMutation.isPending}
                  disabled={loginMutation.isPending}
                >
                  {t("login")}
                </Button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>{t("dontHaveAccount")}</span>
                <Link className='ml-1 text-red-400' to='/register'>
                  {t("register")}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
