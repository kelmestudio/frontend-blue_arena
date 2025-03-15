export const errorTypes = {
    _400: {
        user_alr_exe: '400:USER_EMAIL_ALREADY_EXISTS',
        user_alr_exu: '400:USER_USERNAME_ALREADY_EXISTS',
    },
    _403: {
    },
    _404: {
        user_nf: '404:USER_NOT_FOUND',
    },
    _401: {
        user_email_nf: '401:USER_EMAIL_NOT_FOUND',
        user_email_in: '401:USER_EMAIL_IS_INVALID',
        user_password_in: '401:USER_PASSWORD_IS_INVALID',
        user_token_in: '401:USER_TOKEN_IS_INVALID',
        wh_token_in: '401:WEBHOOK_TOKEN_IS_INVALID',
        user_username_nf: '401:USER_USERNAME_NOT_FOUND',
    },
    _500: {
        listing_match: '500:UNABLE_TO_LIST_MATCHES',
        user_nc: '500:USER_NOT_CREATED',
        match_nc: '500:MATCH_NOT_CREATED',
        user_una: '500:UNAUTHENTICATED_USER',
        unable_vausertoken: '500:UNABLE_TO_VALIDATE_USER_TOKEN',
        listing_user_data: '500:UNABLE_TO_LIST_USER_DATA',
        complete_pay: '500:UNABLE_TO_COMPLETE_PAYMENT',
        accept_match: '500:UNABLE_TO_ACCEPT_MATCH',
        chat_ns: '500:CHAT_NOT_LISTING'
    }
}