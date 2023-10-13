package com.example.reserveit.utill

import okhttp3.Interceptor
import retrofit2.Response

class RetrofitAuthInterceptor {
//    override fun intercept(chain: Interceptor.Chain): okhttp3.Response {
//        val request = chain.request()
//
//        if (request.method() == "DELETE" || request.method() == "PUT") {
//            val requestWithToken = request.newBuilder()
//                .addHeader("Authorization", "Bearer ")
//                .build()
//
//            return chain.proceed(requestWithToken)
//        } else {
//            return chain.proceed(request)
//        }
//    }
}