package com.example.reserveit.repo

import com.example.reserveit.api.AuthApi
import com.example.reserveit.api.RetrofitInstance
import com.example.reserveit.dto.auth.LoginRequestBody
import com.example.reserveit.models.login.LoginModel
import okhttp3.RequestBody
import retrofit2.Response


class AuthRepo{

    suspend  fun login(loginRequestBody: LoginRequestBody): Response<LoginModel> {
        return RetrofitInstance.authApi.login(loginRequestBody);
    }

    suspend fun register(registerBody: RequestBody): Response<LoginModel> {
        return RetrofitInstance.authApi.register(registerBody);
    }
}