package com.example.reserveit.api

import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory


object RetrofitInstance {
        private val retrofit by lazy {
            val logging = HttpLoggingInterceptor()
            logging.setLevel(HttpLoggingInterceptor.Level.BASIC);
            logging.setLevel(HttpLoggingInterceptor.Level.BODY);
            logging.setLevel(HttpLoggingInterceptor.Level.HEADERS);

            Retrofit.Builder()
                .baseUrl("http://10.0.2.2:5238/api/v1/")
                .addConverterFactory(GsonConverterFactory.create())
                .client(OkHttpClient.Builder().addInterceptor(logging).build())
                .build()
        }

        val authApi: AuthApi by lazy {
            retrofit.create(AuthApi::class.java)
        }

        val trainScheduleApi: TrainScheduleApi by lazy {
            retrofit.create(TrainScheduleApi::class.java)
        }

     val reservationApi: ReservationApi by lazy {
        retrofit.create(ReservationApi::class.java)
    }

}