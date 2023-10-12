package com.example.reserveit.di

import android.app.Application
import com.example.reserveit.ReserveitApplication
import com.example.reserveit.api.AuthApi
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn( SingletonComponent::class)
object AppModule {
    @Singleton
    @Provides
    fun provideApplication(@ApplicationContext app: Application): ReserveitApplication {
        return app as ReserveitApplication
    }

}