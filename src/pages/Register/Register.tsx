import Input from "@/components/Input";
import { getRules } from "@/utils/rule";
import { useForm, type RegisterOptions } from "react-hook-form";
import { Link } from "react-router-dom";

interface FormData {
    email: string;
    password: string;
    confirm_password: string;
}

export default function Register() {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<FormData>();

    const rules = getRules(getValues);

    const onSubmit = handleSubmit(
        (data) => {
            console.log(data);
        },
        () => {
            const password = getValues("password");
            console.log(password);
        }
    );

    return (
        <div className='bg-orange'>
            <div className='container'>
                <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
                    <div className='lg:col-span-2 lg:col-start-4'>
                        <form
                            onSubmit={onSubmit}
                            className='rounded bg-white p-10 shadow-sm'
                        >
                            <div className='text-2xl'>Đăng ký</div>
                            <Input
                                name='email'
                                register={register}
                                type='email'
                                className='mt-8'
                                errorMessage={errors.email?.message}
                                placeholder='Nhập email'
                                rules={rules.email as RegisterOptions}
                            />
                            <Input
                                name='password'
                                register={register}
                                type='password'
                                className='mt-2'
                                errorMessage={errors.password?.message}
                                placeholder='Nhập mật khẩu'
                                rules={rules.password as RegisterOptions}
                                autoComplete='on'
                            />
                            <Input
                                name='confirm_password'
                                register={register}
                                type='password'
                                className='mt-2'
                                errorMessage={errors.confirm_password?.message}
                                placeholder='Confirm Password'
                                rules={
                                    rules.confirm_password as RegisterOptions
                                }
                                autoComplete='on'
                            />
                            <div className='mt-3'>
                                <button
                                    type='submit'
                                    className='w-full bg-red-500 px-2 py-4 text-center text-sm uppercase text-white hover:bg-red-600'
                                >
                                    Đăng ký
                                </button>
                            </div>
                            <div className='mt-8 flex items-center justify-center'>
                                <span className='text-gray-300'>
                                    Bạn đã có tài khoản?
                                </span>
                                <Link to='/login' className='ml-1 text-red-400'>
                                    Đăng nhập
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
