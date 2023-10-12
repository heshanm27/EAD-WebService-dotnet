package com.example.reserveit.di

import com.example.reserveit.api.AuthApi
import com.example.reserveit.api.ReservationApi
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory


@Module
@InstallIn(SingletonComponent::class)
object NetworkModule {
    @Provides
    fun provideRetrofit(): Retrofit {
        return Retrofit.Builder()
            .baseUrl("https://api.github.com/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }

    @Provides
    fun provideAuthApi(retrofit: Retrofit): AuthApi {
        return retrofit.create(AuthApi::class.java)
    }

    @Provides
    fun provideReservationApi(retrofit: Retrofit): ReservationApi {
        return retrofit.create(ReservationApi::class.java)
    }

    @Provides
    fun provideTrainScheduleApi(retrofit: Retrofit): ReservationApi {
        return retrofit.create(ReservationApi::class.java)
    }
}