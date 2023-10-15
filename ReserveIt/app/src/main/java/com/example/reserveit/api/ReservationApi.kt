package com.example.reserveit.api

import com.example.reserveit.models.booked.Booked
import com.example.reserveit.models.booked.BookedData
import com.example.reserveit.models.reservation.Reservation
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.PATCH
import retrofit2.http.POST
import retrofit2.http.Path
import retrofit2.http.Query


/*
* File: ReservationAPI.kt
* Author:
* Description: This class is used to call APIs for Reservations.
* */

interface ReservationApi {

    @GET("reservation/upcoming/{id}")
    suspend fun getUpcomingReservations(
        @Path("id") id: String,
        @Query("Page") page: Int = 1,
                        @Query("PageSize") pageSize: Int = 10,
                        @Query("SortBy") sortBy: String? = null,
                        @Query("Order") order: String = "asc",

    ): Response<Booked>

    @GET("reservation/past/{id}")
    suspend fun getPastReservations(
        @Path("id") id: String,
        @Query("Page") page: Int = 1,
                        @Query("PageSize") pageSize: Int = 10,
                        @Query("SortBy") sortBy: String? = null,
                        @Query("Order") order: String = "asc",

    ): Response<Booked>

    @POST("/reservation")
    suspend fun addReservation(
        @Body reservation: Reservation
    ): Reservation

    @PATCH("/reservation/{id}")
    suspend fun updateReservation(
        @Path("id") id: String,
        @Body reservation: Reservation
    ): Reservation

    @DELETE("/reservation/{id}")
    suspend fun deleteReservation(
        @Path("id") id: String
    ): Reservation

}