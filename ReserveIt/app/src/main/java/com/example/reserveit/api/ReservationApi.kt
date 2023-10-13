package com.example.reserveit.api

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

    @GET("/reservation")
    fun getReservations(@Query("Page") page: Int = 1,
                        @Query("PageSize") pageSize: Int = 10,
                        @Query("SortBy") sortBy: String? = null,
                        @Query("Order") order: String = "asc",
                        @Query("Search") search: String? = null
    ): Response<List<Reservation>>

    @GET("/reservation/{id}")
    suspend fun getReservationById(
        @Path("id") id: Long
    ): Reservation

    @POST("/reservation")
    suspend fun addReservation(
        @Body reservation: Reservation
    ): Reservation

    @PATCH("/reservation/{id}")
    suspend fun updateReservation(
        @Path("id") id: Long,
        @Body reservation: Reservation
    ): Reservation

    @DELETE("/reservation/{id}")
    suspend fun deleteReservation(
        @Path("id") id: Long
    ): Reservation

}