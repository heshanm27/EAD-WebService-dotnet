package com.example.reserveit.utill

import com.example.reserveit.api.AuthApi
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory


object RetrofitService {
    private val retrofit by lazy {
        Retrofit.Builder()
            .baseUrl("http://localhost:5238/api/v1/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }


    val authApi: AuthApi by lazy {
        retrofit.create(AuthApi::class.java)
    }

}