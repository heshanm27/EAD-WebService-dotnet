package com.example.reserveit.api

import com.example.reserveit.utill.RetrofitAuthInterceptor
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
                .client(OkHttpClient.Builder().addInterceptor(logging).addInterceptor(
                    RetrofitAuthInterceptor(
                        token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJ0ZXN0QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6InVzZXIiLCJleHAiOjE2OTc0NTE2MzF9.JYO8W3wBP3czMQAwn0mesj75A5F2KJ4rDVkp0BbPAIcrDZYjuKlQntKNab4TJWT6c7SEbWTbGfQ9sYP-028okA"
                    )
                ).build())
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