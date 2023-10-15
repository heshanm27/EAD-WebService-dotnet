package com.example.reserveit.api

import com.example.reserveit.dto.auth.LoginRequestBody
import com.example.reserveit.dto.auth.SignUpRequestBody
import com.example.reserveit.models.login.LoginModel
import okhttp3.RequestBody
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST

/*
* File: AuthAPI.kt
* Author:
* Description: This class is used to call APIs for authorization.
* */

interface AuthApi {

    @POST("auth/login")
    suspend  fun login(@Body loginRequestBody: LoginRequestBody): Response<LoginModel>
    @POST("auth/register")
    suspend fun register(@Body registerBody: SignUpRequestBody): Response<LoginModel>


}