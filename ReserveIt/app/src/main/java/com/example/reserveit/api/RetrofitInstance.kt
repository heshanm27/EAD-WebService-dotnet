package com.example.reserveit.api

import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory


object RetrofitInstance {
        private val retrofit by lazy {
            val logging = HttpLoggingInterceptor()
            logging.setLevel(HttpLoggingInterceptor.Level.BASIC);
            Retrofit.Builder()
                .baseUrl("http://10.0.2.2:5238/api/v1/")
                .addConverterFactory(GsonConverterFactory.create())
                .client(OkHttpClient.Builder().addInterceptor(logging).build())
                .build()
        }

        val authApi: AuthApi by lazy {
            retrofit.create(AuthApi::class.java)
        }

}