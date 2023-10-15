package com.example.reserveit.repo

import com.example.reserveit.api.ReservationApi
import com.example.reserveit.api.RetrofitInstance
import com.example.reserveit.models.booked.Booked
import com.example.reserveit.models.booked.BookedData
import com.example.reserveit.models.reservation.Reservation
import retrofit2.Response


class ReservationRepo{

    suspend fun getUpcomingReservations(
        id:String,
        page: Int = 1,
        pageSize: Int = 10,
        sortBy: String? = null,
        order: String = "asc",
    ): Response<Booked> {
        return RetrofitInstance.reservationApi.getUpcomingReservations(id,page, pageSize, sortBy, order,)
    }

    suspend fun getPastReservations(
        page: Int = 1,
        pageSize: Int = 10,
        sortBy: String? = null,
        order: String = "asc",
        id:String
    ): Response<Booked> {
        return RetrofitInstance.reservationApi.getPastReservations(id,page, pageSize, sortBy, order,)
    }


    suspend fun addReservation(reservation: Reservation): Reservation {
        return RetrofitInstance.reservationApi.addReservation(reservation)
    }

    suspend fun updateReservation(id: String, reservation: Reservation): Reservation {
        return RetrofitInstance.reservationApi.updateReservation(id, reservation)
    }

    suspend fun deleteReservation(id: String): Reservation {
        return RetrofitInstance.reservationApi.deleteReservation(id)
    }
}