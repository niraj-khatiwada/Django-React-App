REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ]
}
JWT_AUTH = {'JWT_ENCODE_HANDLER':
            'rest_framework_jwt.utils.jwt_encode_handler',

            'JWT_DECODE_HANDLER':
            'rest_framework_jwt.utils.jwt_decode_handler',

            'JWT_PAYLOAD_HANDLER':
            'rest_framework_jwt.utils.jwt_payload_handler',

            'JWT_PAYLOAD_GET_USER_ID_HANDLER':
            'rest_framework_jwt.utils.jwt_get_user_id_from_payload_handler',

            'JWT_RESPONSE_PAYLOAD_HANDLER':
            'accounts.rest_api.utils.jwt_response_payload_handler'}
