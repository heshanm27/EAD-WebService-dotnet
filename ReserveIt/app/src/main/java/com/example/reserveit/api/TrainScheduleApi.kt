package com.example.reserveit.api

import com.example.reserveit.models.train_schedule.TrainScheduleModel
import com.example.reserveit.models.train_schedule.TrainScheduleModelOne
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Path
import retrofit2.http.Query

/*
* File: TrainScheduleAPI.kt
* Author:
* Description: This class is used to call APIs for Reservations.
* */

interface TrainScheduleApi {
    @GET("train")
    suspend  fun getTrainSchedule(@Query("Page") page: Int = 1,
                        @Query("PageSize") pageSize: Int = 10,
                        @Query("Order") order: String = "asc",
                        @Query("start") start: String = "",
                        @Query("end") end: String = "",
                        @Query("date") date: String = ""
    ): Response<TrainScheduleModel>



    @GET("train/{id}")
    suspend  fun getOneTrainSchedule(
        @Path("id") id: String
    ): Response<TrainScheduleModelOne>

}