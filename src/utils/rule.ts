import type { RegisterOptions } from "react-hook-form";

interface FormData {
    email: string;
    password: string;
    confirm_password: string;
}

type Rules = {
    [key in "email" | "password" | "confirm_password"]?: RegisterOptions<
        FormData,
        key
    >;
};

export const rules: Rules = {
    email: {
        required: {
            value: true,
            message: "Email là bắt buộc",
        },
        pattern: {
            value: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim,
            message: "Email không hợp lệ",
        },
        maxLength: {
            value: 160,
            message: "Email không được quá 160 ký tự",
        },
        minLength: {
            value: 5,
            message: "Email không được ít hơn 5 ký tự",
        },
    },
    password: {
        required: {
            value: true,
            message: "Password là bắt buộc",
        },
        minLength: {
            value: 6,
            message: "Password không được ít hơn 6 ký tự",
        },
        maxLength: {
            value: 160,
            message: "Password không được quá 160 ký tự",
        },
    },
    confirm_password: {
        required: {
            value: true,
            message: "Nhập lại password là bắt buộc",
        },
        minLength: {
            value: 6,
            message: "Nhập lại password không được ít hơn 6 ký tự",
        },
        maxLength: {
            value: 160,
            message: "Nhập lại password không được quá 160 ký tự",
        },
    },
};
