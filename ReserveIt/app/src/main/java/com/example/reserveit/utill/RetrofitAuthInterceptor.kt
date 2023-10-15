package com.example.reserveit.utill

import okhttp3.Interceptor
import retrofit2.Response

class RetrofitAuthInterceptor(
    private val token: String
) : Interceptor {
    override fun intercept(chain: Interceptor.Chain): okhttp3.Response {
        val request = chain.request().newBuilder()
            .addHeader("Authorization", "Bearer $token")
            .build()
        return chain.proceed(request)
    }
}