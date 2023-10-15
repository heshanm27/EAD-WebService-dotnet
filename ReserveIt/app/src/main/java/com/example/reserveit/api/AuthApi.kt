package com.example.reserveit.api

import com.example.reserveit.dto.auth.LoginRequestBody
import com.example.reserveit.dto.auth.SignUpRequestBody
import com.example.reserveit.models.login.LoginModel
import okhttp3.RequestBody
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.Field
import retrofit2.http.FormUrlEncoded
import retrofit2.http.POST

/*
* File: AuthAPI.kt
* Author:
* Description: This class is used to call APIs for authorization.
* */

interface AuthApi {

    @POST("auth/login")
    suspend  fun login(@Body loginRequestBody: LoginRequestBody): Response<LoginModel>
    @FormUrlEncoded
    @POST("auth/register")
    suspend fun register(@Field("firstName") firstName: String,
                         @Field("lastName") lastName: String,
                         @Field("email") email: String,
                         @Field("password") password: String,
                         @Field("confirmPassword") confirmPassword: String,
                         @Field("nic") nic: String): Response<LoginModel>


}