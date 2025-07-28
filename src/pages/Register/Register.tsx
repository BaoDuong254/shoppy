import { getRules } from "@/utils/rule";
import { useForm } from "react-hook-form";
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

    const rules = getRules();

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
                            <div className='mt-8'>
                                <input
                                    type='email'
                                    className='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                                    placeholder='Email'
                                    {...register("email", rules.email)}
                                />
                                <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>
                                    {errors.email?.message}
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div className='mt-3'>
                                        <input
                                            type='password'
                                            className='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                                            placeholder='Password'
                                            autoComplete='on'
                                            {...register(
                                                "password",
                                                rules.password
                                            )}
                                        />
                                        <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>
                                            {errors.password?.message}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div className='mt-3'>
                                        <input
                                            type='password'
                                            className='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                                            placeholder='Confirm Password'
                                            autoComplete='on'
                                            {...register("confirm_password", {
                                                ...rules.confirm_password,
                                            })}
                                        />
                                        <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>
                                            {errors.confirm_password?.message}
                                        </div>
                                    </div>
                                </div>
                            </div>
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
