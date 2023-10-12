package com.example.reserveit.api

import com.example.reserveit.models.reservation.Reservation
import com.example.reserveit.models.train_schedule.TrainSchedule
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Path
import retrofit2.http.Query

interface TrainScheduleApi {
    @GET("/reservation")
    fun getTrainSchedule(@Query("Page") page: Int = 1,
                        @Query("PageSize") pageSize: Int = 10,
                        @Query("SortBy") sortBy: String? = null,
                        @Query("Order") order: String = "asc",
                        @Query("Search") search: String? = null
    ): Response<List<TrainSchedule>>
    @GET("/train/{id}")
    fun getOneTrainSchedule(
        @Path("id") id: String
    ): String

}