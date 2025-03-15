import toast from "react-hot-toast";
import { errorTypes } from "@/common/lib/error-types"
import { createUser } from "@/common/services/create-user"
import { ICreateUser } from "@/@types/@user";

export function useUserCreation() {
    const execUserCreation = ({ name, email, password, username }: ICreateUser) => {
        const promise = createUser({
            name,
            email,
            password,
            username
        });

        return promise
            .then(result => {
                if (
                    result.status &&
                    result.status === 201
                ) {
                    toast.success('Your account has been created successfully.');
                    return result.data;
                }

                switch (result) {
                    case errorTypes._400.user_alr_exe:
                        toast.error('A user with this email already exists.');
                        break;
                    case errorTypes._400.user_alr_exu:
                        toast.error('A user with this username already exists.');
                        break;
                    default:
                        toast.error('It was not possible to create your account, please try again or contact support.');
                }
            })
            .catch((result) => {
                toast.error('An error occurred while creating the user. Please contact support if the problem persists.');
            })
    }

    return { execUserCreation }
}