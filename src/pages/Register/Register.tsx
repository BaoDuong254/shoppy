import Input from "@/components/Input";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema, type Schema } from "@/utils/rule";

type FormData = Schema;

export default function Register() {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

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
                            />
                            <Input
                                name='password'
                                register={register}
                                type='password'
                                className='mt-2'
                                errorMessage={errors.password?.message}
                                placeholder='Nhập mật khẩu'
                                autoComplete='on'
                            />
                            <Input
                                name='confirm_password'
                                register={register}
                                type='password'
                                className='mt-2'
                                errorMessage={errors.confirm_password?.message}
                                placeholder='Confirm Password'
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
