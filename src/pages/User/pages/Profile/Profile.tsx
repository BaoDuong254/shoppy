import type { ErrorResponse } from "@/types/utils.type";
import userApi from "@apis/user.api";
import Button from "@components/Button";
import Input from "@components/Input";
import InputFile from "@components/InputFile";
import InputNumber from "@components/InputNumber";
import { AppContext } from "@contexts/app.context";
import { yupResolver } from "@hookform/resolvers/yup";
import DateSelect from "@pages/User/components/DateSelect";
import { useMutation, useQuery } from "@tanstack/react-query";
import { setProfileToLS } from "@utils/auth";
import { userSchema, type UserSchema } from "@utils/rule";
import { getAvatarUrl, isAxiosUnprocessableEntityError } from "@utils/utils";
import { Fragment, useContext, useEffect, useMemo, useState } from "react";
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

function Info() {
  const { t } = useTranslation("profile");

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<FormData>();

  return (
    <Fragment>
      <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
        <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>{t("accountSettings.name")}</div>
        <div className='sm:w-[80%] sm:pl-5'>
          <Input
            classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
            register={register}
            name='name'
            placeholder={t("accountSettings.name")}
            errorMessage={errors.name?.message}
          />
        </div>
      </div>
      <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
        <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>{t("accountSettings.phoneNumber")}</div>
        <div className='sm:w-[80%] sm:pl-5'>
          <Controller
            control={control}
            name='phone'
            render={({ field }) => (
              <InputNumber
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                placeholder={t("accountSettings.phoneNumber")}
                errorMessage={errors.phone?.message}
                {...field}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>
    </Fragment>
  );
}

type FormData = Pick<UserSchema, "name" | "address" | "phone" | "date_of_birth" | "avatar">;

type FormDataError = Omit<FormData, "date_of_birth"> & {
  date_of_birth?: string;
};

const profileSchema = userSchema.pick(["name", "address", "phone", "date_of_birth", "avatar"]);

export default function Profile() {
  const { t } = useTranslation("profile");
  const { setProfile } = useContext(AppContext);

  const [file, setFile] = useState<File>();

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : "";
  }, [file]);

  const { data: profileData, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: userApi.getProfile,
  });
  const profile = profileData?.data.data;
  const updateProfileMutation = useMutation({
    mutationFn: userApi.updateProfile,
    onSuccess: (data) => {
      console.log("Profile updated successfully", data);
    },
    onError: (error) => {
      console.error("Error updating profile", error);
    },
  });
  const uploadAvatarMutation = useMutation({
    mutationFn: userApi.uploadAvatar,
  });
  const methods = useForm<FormData>({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      avatar: "",
      date_of_birth: new Date(1990, 0, 1),
    },
    // @ts-expect-error: do not type check resolver as it is a custom schema
    resolver: yupResolver(profileSchema),
  });

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    setError,
  } = methods;

  const avatar = watch("avatar");

  useEffect(() => {
    if (profile) {
      setValue("name", profile.name);
      setValue("phone", profile.phone);
      setValue("address", profile.address);
      setValue("avatar", profile.avatar);
      setValue("date_of_birth", profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1));
    }
  }, [profile, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = avatar;
      if (file) {
        const form = new FormData();
        form.append("image", file);
        const uploadRes = await uploadAvatarMutation.mutateAsync(form);
        avatarName = uploadRes.data.data;
        setValue("avatar", avatarName);
      }
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName,
      });
      setProfile(res.data.data);
      setProfileToLS(res.data.data);
      refetch();
      toast.success(res.data.message);
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormDataError>>(error)) {
        const formError = error.response?.data.data;
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
              type: "Server",
            });
          });
        }
      }
    }
  });

  const handleChangeFile = (file?: File) => {
    setFile(file);
  };

  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>{t("MyProfile")}</h1>
        <div className='mt-1 text-sm text-gray-700'>{t("keepProfilePrivate")}</div>
      </div>
      <FormProvider {...methods}>
        <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={onSubmit}>
          <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
            <div className='flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Email</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <div className='pt-3 text-gray-700'>{profile?.email}</div>
              </div>
            </div>
            <Info />
            <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>{t("accountSettings.address")}</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input
                  classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                  register={register}
                  name='address'
                  placeholder={t("accountSettings.address")}
                  errorMessage={errors.address?.message}
                />
              </div>
            </div>
            <Controller
              control={control}
              name='date_of_birth'
              render={({ field }) => (
                <DateSelect
                  errorMessage={errors.date_of_birth?.message}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right' />
              <div className='sm:w-[80%] sm:pl-5'>
                <Button
                  className='flex h-9 items-center rounded-sm bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
                  type='submit'
                >
                  {t("save")}
                </Button>
              </div>
            </div>
          </div>
          <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
            <div className='flex flex-col items-center'>
              <div className='my-5 h-24 w-24'>
                <img
                  src={previewImage || getAvatarUrl(avatar)}
                  alt=''
                  className='h-full w-full rounded-full object-cover'
                />
              </div>
              <InputFile onChange={handleChangeFile} />
              <div className='mt-3 text-gray-400'>
                <div>{t("accountSettings.avatarSize")}</div>
                <div>{t("accountSettings.avatarFormat")}</div>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
