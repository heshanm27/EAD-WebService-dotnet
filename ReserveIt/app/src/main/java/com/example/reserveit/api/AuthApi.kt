package com.example.reserveit.api

import com.example.reserveit.dto.auth.LoginRequestBody
import com.example.reserveit.models.login.LoginModel
import okhttp3.RequestBody
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST

interface AuthApi {

    @POST("auth/login")
    suspend  fun login(@Body loginRequestBody: LoginRequestBody): Response<LoginModel>
    @POST("auth/register")
    suspend fun register(@Body registerBody: RequestBody): Response<LoginModel>


}