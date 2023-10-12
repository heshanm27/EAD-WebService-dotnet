package com.example.reserveit.repo

import com.example.reserveit.api.AuthApi
import com.example.reserveit.dto.auth.LoginRequestBody
import com.example.reserveit.models.login.LoginModel
import okhttp3.RequestBody
import retrofit2.Response
import javax.inject.Inject

class AuthRepo @Inject constructor(
    private val authApi: AuthApi
) {

    suspend  fun login(loginRequestBody: LoginRequestBody): Response<LoginModel> {
        return authApi.login(loginRequestBody);
    }

    suspend fun register(registerBody: RequestBody): Response<LoginModel> {
        return authApi.register(registerBody);
    }
}